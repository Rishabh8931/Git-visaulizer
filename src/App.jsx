import { useEffect, useReducer, useState, useRef, useCallback } from "react";
import { gitReducer } from "./state/gitReducer";
import { initialState } from "./state/initialState";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import Terminal from "./components/Terminal/Terminal";
import WorkingDirectory from "./components/WorkingDirectory/WorkingDirectory";
import RemoteRepository from "./components/RemoteRepository/RemoteRepository";
import { getItem, setItem } from "./utils/localStorage";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow: hidden;
  }

  h1, h2, h3, h4 {
    font-weight: 600;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.border};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.textSecondary};
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${(props) => props.theme.surface};
  border-bottom: 1px solid ${(props) => props.theme.border};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  z-index: 10;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.primary};

  svg {
    width: 32px;
    height: 32px;
  }
`;

const ThemeToggle = styled.button`
  background: ${(props) => props.theme.border};
  border: none;
  color: ${(props) => props.theme.text};
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.textSecondary};
    color: white;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
  padding: 1rem;
  position: relative;
`;

const Pane = styled.section`
  flex: ${(props) => props.width};
  min-width: 200px;
  background: ${(props) => props.theme.surface};
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  transition: transform 0.2s;

  &:hover {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  }
`;

const Resizer = styled.div`
  width: 12px;
  cursor: col-resize;
  margin: 0 -6px;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;

  &::after {
    content: "";
    width: 4px;
    height: 40px;
    background: ${(props) => props.theme.border};
    border-radius: 2px;
    transition: background 0.2s;
  }

  &:hover::after {
    background: ${(props) => props.theme.primary};
  }

  &:active::after {
    background: ${(props) => props.theme.primary};
    height: 100%;
    border-radius: 0;
  }
`;

function App() {
  const savedState = getItem("git-state");
  const [state, dispatch] = useReducer(
    gitReducer,
    savedState ? savedState : initialState
  );

  const [themeMode, setThemeMode] = useState(getItem("theme-mode") || "dark");
  const [widths, setWidths] = useState(getItem("pane-widths") || [1, 1, 1]);
  const containerRef = useRef(null);
  const isResizing = useRef(null);

  useEffect(() => {
    setItem("git-state", state);
  }, [state]);

  useEffect(() => {
    setItem("theme-mode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    setItem("pane-widths", widths);
  }, [widths]);

  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const startResizing = (index) => (e) => {
    isResizing.current = index;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const stopResizing = () => {
    isResizing.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  };

  const handleMouseMove = useCallback((e) => {
    if (isResizing.current === null || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - containerRect.left;
    const totalWidth = containerRect.width;
    const mousePercentage = (relativeX / totalWidth) * 3; // normalized to 3 units

    setWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      const index = isResizing.current;
      
      // Calculate how much to shift from one pane to another
      // For index 0: affects Pane 1 and Pane 2
      // For index 1: affects Pane 2 and Pane 3
      
      const currentPos = newWidths.slice(0, index + 1).reduce((a, b) => a + b, 0);
      const diff = mousePercentage - currentPos;

      // Apply constraints (min-width logic via flex)
      if (newWidths[index] + diff > 0.5 && newWidths[index + 1] - diff > 0.5) {
        newWidths[index] += diff;
        newWidths[index + 1] -= diff;
      }

      return newWidths;
    });
  }, []);

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Logo>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            Git Visualizer
          </Logo>
          <ThemeToggle onClick={toggleTheme}>
            {themeMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </ThemeToggle>
        </Header>

        <MainContent ref={containerRef}>
          <Pane width={widths[0]}>
            <Terminal dispatch={dispatch} state={state} />
          </Pane>

          <Resizer onMouseDown={startResizing(0)} />

          <Pane width={widths[1]}>
            <WorkingDirectory state={state} />
          </Pane>

          <Resizer onMouseDown={startResizing(1)} />

          <Pane width={widths[2]}>
            <RemoteRepository state={state} />
          </Pane>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;