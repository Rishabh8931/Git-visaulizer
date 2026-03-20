 import { useCallback, useEffect, useState } from 'react';
import {styled} from 'styled-components';
import {parseCommand} from "../../utils/commandParser.js"



function Terminal({ dispatch }) {
    
  //  terminal action passing ro dispather
  const [input , setInput] = useState("");

 

// save the terminal history in localhistroy
  const [history, setHistory] = useState(() => {
       const saved  = localStorage.getItem("terminal-history");
      return saved ? JSON.parse(saved) : [];
});

// saving every history
useEffect(()=>{
  localStorage.setItem("terminal-history", JSON.stringify(history));
},[history]);



 function handleEnter(){
   if(!input.trim()) return;
  
    //  displaying the terminal history
    setHistory((history) => [...history,`>${input}`]);
      
    /* converting terminal inputs to the action and passing to the dispatcher */
    const result = parseCommand(input);
   
    if(result.error){
      setHistory((prev) => [...prev, result.error]);
    } else {
      dispatch(result);
      setHistory((prev) => [...prev, "✔ Command executed"]);
    }
    /** setting input field empty */
    setInput("");
  
 }
  
  return (
    <TerminalInsides>
      {/*  displaying all terminail history */}
      <div>
      {history.map((line,index) => {
         return <div key={index}>{`>>%>${line}`}</div>
      })}
      </div>

       {/** taking input and passing to dispatcher */}
      <Input 
      value={input}
       onChange={(e) =>setInput(e.target.value)}
        onKeyDown= {
          (e) => {
            if(e.key === "Enter") handleEnter();
          }
        }
         placeholder='type your git commands' />
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
  
`
const Input = styled.input`
          width : 100%;
          background : black;
          color : #0f0;
          border : none;
          outline : none;
          font-size: medium;
          

        
`



export default Terminal;