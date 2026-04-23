import styled from 'styled-components';
import { resetCommits } from '../../utils/localStorage';

const StyledButton = styled.button`
  background: ${(props) => props.theme.accent};
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${(props) => props.theme.accent}44;
  }

  &:active {
    transform: translateY(0);
  }
`;

function Reset() {
  return (
    <StyledButton onClick={resetCommits}>
      Reset All
    </StyledButton>
  );
}

export default Reset;