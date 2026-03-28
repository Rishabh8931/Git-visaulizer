import { useRef, useEffect, useState } from "react";
import { styled } from "styled-components";
import { parseCommand } from "../../utils/commandParser.js";
import { getItem, setItem } from "../../utils/localStorage.js";

function Terminal({ dispatch }) {

  /** input state */
  const [input, setInput] = useState("");

  /** command history for arrow navigation */
  const [commandHistory, setCommandHistory] = useState([]);
  const [cmdHstryIdx, setCmdHstryIdx] = useState(null);

  /** terminal output history */
  const [history, setHistory] = useState(() => {
    const saved = getItem("terminal-history");
    return saved ? saved : [];
  });

  /** save history to localStorage */
  useEffect(() => {
    setItem("terminal-history", history);
  }, [history]);

  /** terminal scroll reference */
  const terminalRef = useRef(null);

  /** auto scroll when history updates */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [history]);

  /** input reference */
  const inputRef = useRef(null);

  /** focus terminal input */
  const focusInput = () => {
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(input.length, input.length);
  };

  /** -------------------------
   *  Terminal Logic Unit
   *  -------------------------
   */
  const handleCommand = (cmd) => {

    if (!cmd.trim()) return;

    /** store command for arrow history */
    setCommandHistory((prev) => [...prev, cmd]);

    const action = parseCommand(cmd);

    if (action.error) {
      setHistory((prev) => [
        ...prev,
        `> ${cmd}`,
        `${action.error}`,
      ]);
      return;
    }

    /** clear terminal */
    if (action.type === "CLEAR_HISTORY") {
      setHistory([]);
      return;
    }

    /** dispatch action */
    dispatch(action);

    setHistory((prev) => [
      ...prev,
      `> ${cmd}`,
      "✔ Command executed",
    ]);
  };

  /** -------------------------
   *  Keyboard Control Unit
   *  -------------------------
   */
  const handleKeyDown = (e) => {

    /** ENTER */
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setCmdHstryIdx(null);
    }

    /** ARROW UP */
    if (e.key === "ArrowUp") {
      e.preventDefault();

      setCmdHstryIdx((prev) => {

        if (commandHistory.length === 0) return null;

        const newIndex =
          prev === null
            ? commandHistory.length - 1
            : Math.max(prev - 1, 0);

        setInput(commandHistory[newIndex]);

        return newIndex;
      });
    }

    /** ARROW DOWN */
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setCmdHstryIdx((prev) => {

        if (prev === null) return null;

        const newIndex =
          prev + 1 >= commandHistory.length
            ? null
            : prev + 1;

        setInput(newIndex === null ? "" : commandHistory[newIndex]);

        return newIndex;
      });
    }
  };

  return (
    <TerminalInsides ref={terminalRef} onClick={focusInput}>

      {/* terminal history output */}
      <div>
        {history.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      {/* command input */}
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />

    </TerminalInsides>
  );
}

/** Terminal container */

const TerminalInsides = styled.div`
  background: black;
  color: #0f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: medium;
  overflow: auto;
  cursor: pointer;
  padding: 10px;
  font-family: monospace;
`;

/** Terminal input */

const Input = styled.input`
  background: transparent;
  color: #0f0;
  border: none;
  outline: none;
  font-size: medium;
  font-family: monospace;
`;

export default Terminal;