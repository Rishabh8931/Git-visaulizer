import CommitGraph from "../CommitGraph/CommitGraph";

function RemoteRepository({ state }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3>Remote Repository</h3>

      {/* Branch label */}
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
        origin/{state.currentBranch}
      </div>

      {/* Graph Section */}
      <div
        style={{
          flex: 7,   // takes 70% space
          overflow: "hidden",
        }}
      >
        <CommitGraph
          commits={state.remote.commits}
          branches={state.remote.branches}
        />
      </div>

      {/* Commit List */}
      <div
        style={{
          flex: 3,  // takes 30% space
          overflow: "auto",
          border: "2px solid black",
          padding: "5px",
        }}
      >
        <h4>Pushed Commits</h4>

        {Object.values(state.remote.commits || {}).map((c, i) => (
          <div key={i}>
            C{i + 1} "{c.message}"
          </div>
        ))}
      </div>
    </div>
  );
}

export default RemoteRepository;