import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { parseCommand } from "../../utils/commandParser.js";
import { getItem, setItem } from "../../utils/localStorage.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(props) => props.theme.terminalBg};
  color: ${(props) => props.theme.terminalText};
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow: hidden;
`;

const TerminalHeader = styled.div`
  padding: 0.5rem 1rem;
  background: #1e293b;
  border-bottom: 1px solid #334155;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  cursor: text;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #334155;
  }
`;

const HistoryLine = styled.div`
  margin-bottom: 0.25rem;
  white-space: pre-wrap;
  word-break: break-all;
  opacity: ${(props) => (props.isCommand ? 1 : 0.8)};
  color: ${(props) => (props.isError ? props.theme.accent : props.isSuccess ? props.theme.success : "inherit")};
`;

const PromptWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PromptPrefix = styled.span`
  color: ${(props) => props.theme.primary};
  font-weight: bold;
`;

const Input = styled.input`
  background: transparent;
  color: inherit;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  flex: 1;
`;

function Terminal({ dispatch, state }) {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [cmdHstryIdx, setCmdHstryIdx] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = getItem("terminal-history");
    return saved ? saved : [];
  });

  useEffect(() => {
    setItem("terminal-history", history);
  }, [history]);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd) => {
    if (!cmd.trim()) return;

    setCommandHistory((prev) => [...prev, cmd]);
    const action = parseCommand(cmd);

    const newEntries = [{ text: `> ${cmd}`, isCommand: true }];

    if (action.error) {
      newEntries.push({ text: action.error, isError: true });
      setHistory((prev) => [...prev, ...newEntries]);
      return;
    }

    if (action.type === "CLEAR_HISTORY") {
      setHistory([]);
      return;
    }

    dispatch(action);

    let branchList = [];
    if (action.type === "SHOW_BRANCHES") {
      branchList = Object.keys(state.branches).map((branch) => {
        return branch === state.currentBranch ? `* ${branch}` : `  ${branch}`;
      });
    }

    if (branchList.length > 0) {
      branchList.forEach(b => newEntries.push({ text: b }));
    }
    
    newEntries.push({ text: "✔ Command executed", isSuccess: true });
    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setCmdHstryIdx(null);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = cmdHstryIdx === null ? commandHistory.length - 1 : Math.max(cmdHstryIdx - 1, 0);
      setCmdHstryIdx(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHstryIdx === null) return;
      const newIndex = cmdHstryIdx + 1 >= commandHistory.length ? null : cmdHstryIdx + 1;
      setCmdHstryIdx(newIndex);
      setInput(newIndex === null ? "" : commandHistory[newIndex]);
    }
  };

  return (
    <Container>
      <TerminalHeader>
        <Dot color="#ff5f56" />
        <Dot color="#ffbd2e" />
        <Dot color="#27c93f" />
        <span style={{ marginLeft: "1rem" }}>Git Terminal</span>
      </TerminalHeader>
      <ScrollArea ref={terminalRef} onClick={focusInput}>
        {history.map((line, index) => (
          <HistoryLine 
            key={index} 
            isCommand={line.isCommand} 
            isError={line.isError}
            isSuccess={line.isSuccess}
          >
            {line.text}
          </HistoryLine>
        ))}
        <PromptWrapper>
          <PromptPrefix>git-viz λ</PromptPrefix>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </PromptWrapper>
      </ScrollArea>
    </Container>
  );
}

export default Terminal;