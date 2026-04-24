import styled from "styled-components";
import CommitGraph from "../CommitGraph/CommitGraph";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(props) => props.theme.surface};
`;

const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Badge = styled.span`
  background: ${(props) => props.theme.secondary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
`;

const GraphWrapper = styled.div`
  flex: 7;
  overflow: hidden;
  position: relative;
  background-image: radial-gradient(${(props) => props.theme.border} 1px, transparent 1px);
  background-size: 20px 20px;
`;

const PushedSection = styled.div`
  flex: 3;
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.background};
  overflow-y: auto;
`;

const PushedTitle = styled.h4`
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommitItem = styled.div`
  background: ${(props) => props.theme.surface};
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const CommitHash = styled.span`
  font-family: 'Fira Code', monospace;
  color: ${(props) => props.theme.secondary};
  font-weight: 600;
  font-size: 0.75rem;
  background: ${(props) => props.theme.background};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: copy;
  transition: all 0.2s;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &:hover {
    background: ${(props) => props.theme.secondary};
    color: white;
  }

  &:active {
    transform: scale(0.95);
  }

  span.label {
    opacity: 0.6;
    font-size: 0.65rem;
  }
`;

const CommitMessage = styled.span`
  color: ${(props) => props.theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function RemoteRepository({ state }) {
  const commits = Object.values(state.remote.commits || {});

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied hash: ${text}`);
  };

  return (
    <Container>
      <Header>
        <Title>Remote Repository</Title>
        <Badge>origin/{state.currentBranch}</Badge>
      </Header>

      <GraphWrapper>
        <CommitGraph
          commits={state.remote.commits}
          branches={state.remote.branches}
        />
      </GraphWrapper>

      <PushedSection>
        <PushedTitle>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Pushed Commits
        </PushedTitle>

        {commits.length === 0 ? (
          <div style={{ color: "#777", textAlign: "center", fontSize: "0.875rem", marginTop: "1rem" }}>
            No commits pushed yet
          </div>
        ) : (
          <CommitList>
            {commits.map((c, i) => (
              <CommitItem key={i}>
                <CommitHash 
                  title="Click to copy full hash" 
                  onClick={() => copyToClipboard(c.id)}
                >
                  <span className="label">C{i + 1}</span>
                  {c.id.substring(c.id.length - 6)}
                </CommitHash>
                <CommitMessage>{c.message}</CommitMessage>
              </CommitItem>
            ))}
          </CommitList>
        )}
      </PushedSection>
    </Container>
  );
}

export default RemoteRepository;