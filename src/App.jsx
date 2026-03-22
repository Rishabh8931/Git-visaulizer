import { useEffect, useReducer } from "react";
import { gitReducer } from "./state/gitReducer";
import { initialState } from "./state/initialState";

import styled from "styled-components";
import Terminal from "./components/Terminal/Terminal";
import WorkingDirectory from "./components/WorkingDirectory/WorkingDirectory";
import RemoteRepository from "./components/RemoteRepository/RemoteRepository";
import { getItem, setItem } from "./utils/localStorage";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Section = styled.div`
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 5px;

  &:last-child {
    border-right: none;
  }
`;

function App() {
   // getting the states
 const savedState = getItem("git-state");

 const [state , dispatch] = useReducer(
        gitReducer,
        savedState ? savedState: initialState
 );

//  console.log("staging area:" , state.stagingArea)


//  saving the states in local storage
useEffect(() => {
  setItem("git-state" , state)
},[state])
 

  return (
    <Container>
      <Section>
        <Terminal  dispatch = {dispatch} />
      </Section>

      <Section>
        <WorkingDirectory  state = {state}/>
      </Section>

      <Section>
        <RemoteRepository state = {state} />
      </Section>
    </Container>
  );
}

export default App;