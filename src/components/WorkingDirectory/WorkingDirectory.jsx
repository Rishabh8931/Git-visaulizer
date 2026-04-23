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
  background: ${(props) => props.theme.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.4);
`;

const GraphWrapper = styled.div`
  flex: 7;
  overflow: hidden;
  position: relative;
  background-image: radial-gradient(${(props) => props.theme.border} 1px, transparent 1px);
  background-size: 20px 20px;
`;

const StagingArea = styled.div`
  flex: 3;
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.background};
  overflow-y: auto;
`;

const StagingTitle = styled.h4`
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FileItem = styled.div`
  background: ${(props) => props.theme.surface};
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const FileStatus = styled.span`
  color: ${(props) => props.theme.success};
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
`;

const EmptyState = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-style: italic;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
`;

function WorkingDirectory({ state }) {
  return (
    <Container>
      <Header>
        <Title>Local Repository</Title>
        <Badge>{state.currentBranch}</Badge>
      </Header>

      <GraphWrapper>
        <CommitGraph
          commits={state.commits}
          branches={state.branches}
          HEAD={state.HEAD}
        />
      </GraphWrapper>

      <StagingArea>
        <StagingTitle>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          Staging Area
        </StagingTitle>

        {state.stagingArea.length === 0 ? (
          <EmptyState>No files staged</EmptyState>
        ) : (
          <FileList>
            {state.stagingArea.map((file, i) => (
              <FileItem key={i}>
                <span>📄 {file.name}</span>
                <FileStatus>Staged</FileStatus>
              </FileItem>
            ))}
          </FileList>
        )}
      </StagingArea>
    </Container>
  );
}

export default WorkingDirectory;