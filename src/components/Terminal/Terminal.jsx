import { useRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { parseCommand } from "../../utils/commandParser.js"



function Terminal({ dispatch }) {

  //  terminal action passing ro dispather
  const [input, setInput] = useState("");


  // save the terminal history in localStorage
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("terminal-history");
    return saved ? JSON.parse(saved) : [];
  });

  // saving every history
  useEffect(() => {
    localStorage.setItem("terminal-history", JSON.stringify(history));
  }, [history]);

  // scrolling effect
  const terminalRef = useRef(null);
  useEffect(() => {
    if (terminalRef.current) {

      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behaviour: "smooth"
      })
    }
  }, [history])

  // focusing the cursour for typing on click in the terminal anywhere
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current?.focus();
  }



  function handleEnter() {
    if (!input.trim()) return;

    //  displaying the terminal history
    setHistory((history) => [...history, `>${input}`]);

    /* converting terminal inputs to the action and passing to the dispatcher */
    const result = parseCommand(input);

    if (result.error) {
      setHistory((prev) => [...prev, result.error]);
    } else {
      dispatch(result);
      setHistory((prev) => [...prev, "✔ Command executed"]);
    }
    /** setting input field empty */
    setInput("");

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
      <InputWrapper>
        <InputContainer>
          <HiddenText> {input || " "} </HiddenText>
          <Cursor/>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
          />
        </InputContainer>

      </InputWrapper>
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
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  color: #0f0;
  border: none;
  outline: none;
  font-size: medium;
  font-family: monospace;
  caret-color: transparent;
`

//  blinking cursor
const Cursor = styled.span`
  position: absolute;
  top: 2px;
  left: 0;

  width: 8px;
  height: 18px;
  background: #0f0;

  animation: blink 1s step-start infinite;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;
  

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`
const InputContainer = styled.div`
  position: relative;
  display: inline-block;
`

const HiddenText = styled.span`
  visibility: hidden;
  white-space: pre;
  font-size: medium;
  font-family: monospace;
`;




export default Terminal;