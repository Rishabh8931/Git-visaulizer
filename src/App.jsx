import { useReducer } from "react";
import { gitReducer } from "./state/gitReducer";
import { initialState } from "./state/initialState";

import styled from "styled-components";
import Terminal from "./components/Terminal/Terminal";
import WorkingDirectory from "./components/WorkingDirectory/WorkingDirectory";
import RemoteRepository from "./components/RemoteRepository/RemoteRepository";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Section = styled.div`
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 10px;

  &:last-child {
    border-right: none;
  }
`;

function App() {
 const [state , dispatch] = useReducer(gitReducer, initialState)
 

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