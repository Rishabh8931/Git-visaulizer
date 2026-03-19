function Terminal({ dispatch }) {
  return (
    <div>
      <button onClick={() => dispatch({ type: "INIT" })}>
        git init
      </button>

      <button onClick={() => dispatch({ type: "ADD", payload: "file1.txt" })}>
        git add file1.txt
      </button>

      <button onClick={() => dispatch({ type: "COMMIT", payload: "first commit" })}>
        git commit
      </button>

      <button onClick={() => dispatch({ type: "BRANCH", payload: "feature" })}>
        git branch feature
      </button>

      <button onClick={() => dispatch({ type: "CHECKOUT", payload: "feature" })}>
        git checkout feature
      </button>

      <button onClick={() => dispatch({ type: "PUSH" })}>
        git push
      </button>
    </div>
  );
}

export default Terminal;