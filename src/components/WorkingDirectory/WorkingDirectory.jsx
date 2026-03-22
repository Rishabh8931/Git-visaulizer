import CommitGraph from "../CommitGraph/CommitGraph";

function WorkingDirectory({ state }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <h3>Local Repository</h3>

      {/* Branch Label */}
      <div style={{
        background: "#2b4c7e",
        color: "white",
        padding: "5px 10px",
        width: "fit-content",
        borderRadius: "5px",
        marginBottom: "10px"
      }}>
        {state.currentBranch}
      </div>

      {/* Graph */}
      <div style={{ flex: 1 }}>
        <CommitGraph
          commits={state.commits}
          branches={state.branches}
          HEAD = {state.HEAD}
        />
      </div>

      {/* Staging Area */}
      <div style={{
        border: "1px dashed green",
        padding: "10px",
        marginTop: "10px"
      }}>
        <h4>Staging Area</h4>

        {state.stagingArea.map((file, i) => (
          <div key={i}>
            📄 {file.name} <span style={{ color: "green" }}>Staged</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkingDirectory;