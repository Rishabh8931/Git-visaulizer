import { useRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { parseCommand } from "../../utils/commandParser.js"
import { getItem, setItem } from '../../utils/localStorage.js';




function Terminal({ dispatch }) {

  //  terminal action passing ro dispather
  const [input, setInput] = useState("");
  //  up and down key history navigation
  const [commandHistory, setCommandHistory] = useState([]);
  const [cmdHstryIdx, setCmdHstryIdx] = useState(null);
  


  // save the terminal history in localStorage
  const [history, setHistory] = useState(() => {
    const saved = getItem("terminal-history")
    return saved ? saved : [];
  });

  // saving every history

  useEffect(() => {
    setItem("terminal-history", history)
  }, [history]);

  // scrolling effect
  const terminalRef = useRef(null);
  useEffect(() => {
    if (terminalRef.current) {

      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [history])

  // focusing the cursour for typing on click in the terminal anywhere
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current?.focus();
  }

  /** logic unit of the terminal */
   const handleCommand = (cmd) => {
     if (!cmd.trim()) return;
      setCommandHistory((prev) => [...prev, input]);
     
     
       const action = parseCommand(cmd);
  
        if (action.error) {
      setHistory((prev) => [...prev, `> ${cmd}`, `${action.error}`]);
      return;
    }
     /** clearing terminal  */
     if(action.type === "CLEAR_HISTORY") {
       setHistory([]);
       return;
     }

    dispatch(action);
    setHistory((prev) => [
      ...prev,
      `> ${cmd}`,
      "✔ Command executed",
    ]);
   };



 /** control unit of the terminal*/
 
 const handleKeyDown = (e) => {

    if(e.key == "Enter") {
      handleCommand(input);
      setInput("");
    }

  // Arrow Up
    if(e.key == "ArrowUp") {
      e.preventDefault();
      setCmdHstryIdx((prev) => {
        if(commandHistory.length == 0) return null;
        const newIndex = prev === null ? commandHistory.length-1 : Math.max(prev-1, 0);
        setInput(commandHistory[newIndex]);
        return newIndex;
      })

    }

    // Arrow down

    if(e.key === "ArrowDown") {
      e.preventDefault();
       setCmdHstryIdx((prev) => {
           if(prev === null) return null;

           const newIndex = prev +1 > commandHistory.length? null : prev+1;

           setInput(newIndex === null ? "" : commandHistory[newIndex]);
           return newIndex;
       })
    }
    
 }


  return (
    <TerminalInsides ref={terminalRef} onClick={focusInput}>
      
      {/*  displaying all terminail history */}
      <div>
        {history.map((line, index) => {
          return <div key={index}>{`>>%>${line}`}</div>
        })}
      </div>

      {/** taking input and passing to dispatcher */}
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
     
    </TerminalInsides>
  );
}


const TerminalInsides = styled.div`
  
    background: black;
    color: #0f0;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: medium;
    overflow: auto;
    cursor: pointer;
  
`

// input field of terminal 

const Input = styled.input`
 
  background: transparent;
  color: #0f0;
  border: none;
  outline: none;
  font-size: medium;
  font-family: monospace;

`


export default Terminal;