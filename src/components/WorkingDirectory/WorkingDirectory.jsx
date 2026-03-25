import CommitGraph from "../CommitGraph/CommitGraph";

function WorkingDirectory({ state }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <h3>Local Repository</h3>

      {/* Branch Label */}
      <div
        style={{
          background: "#2b4c7e",
          color: "white",
          padding: "5px 10px",
          width: "fit-content",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        {state.currentBranch}
      </div>

      {/* Graph Section */}
      <div
        style={{
          flex: 7,        // 70% space
          overflow: "hidden"
        }}
      >
        <CommitGraph
          commits={state.commits}
          branches={state.branches}
          HEAD={state.HEAD}
        />
      </div>

      {/* Staging Area */}
      <div
        style={{
          flex: 3,        // 30% space
          border: "1px dashed green",
          padding: "10px",
          overflow: "auto"
        }}
      >
        <h4>Staging Area</h4>

        {state.stagingArea.length === 0 ? (
          <div style={{ color: "#777" }}>No files staged</div>
        ) : (
          state.stagingArea.map((file, i) => (
            <div key={i}>
              📄 {file.name}{" "}
              <span style={{ color: "green" }}>Staged</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkingDirectory;