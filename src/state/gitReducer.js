export function gitReducer(state, action) {
  switch (action.type) {

    case "INIT":
      return {
        ...state,
        initialized: true,
      };

    case "ADD": {
      const fileName = action.payload;

      const updatedFiles = state.workingDirectory.map((file) =>
        file.name === fileName
          ? { ...file, status: "staged" }
          : file
      );

      const stagedFile = updatedFiles.find(f => f.name === fileName);

      return {
        ...state,
        workingDirectory: updatedFiles,
        stagingArea: [...state.stagingArea, stagedFile],
      };
    }

    case "COMMIT": {
      if (state.stagingArea.length === 0) return state;

      const newCommitId = Date.now().toString();

      const newCommit = {
        id: newCommitId,
        message: action.payload,
        parent: state.HEAD,
        branch: state.currentBranch,
        files: state.stagingArea,
      };

      return {
        ...state,
        commits: {
          ...state.commits,
          [newCommitId]: newCommit,
        },
        HEAD: newCommitId,
        branches: {
          ...state.branches,
          [state.currentBranch]: newCommitId,
        },
        stagingArea: [],
        workingDirectory: state.workingDirectory.map(file => ({
          ...file,
          status: "tracked",
        })),
      };
    }

    case "BRANCH": {
      const branchName = action.payload;

      return {
        ...state,
        branches: {
          ...state.branches,
          [branchName]: state.HEAD,
        },
      };
    }

    case "CHECKOUT": {
      const branch = action.payload;

      if (!state.branches[branch]) return state;

      return {
        ...state,
        currentBranch: branch,
        HEAD: state.branches[branch],
      };
    }

    case "PUSH": {
      return {
        ...state,
        remote: {
          commits: { ...state.commits },
          branches: { ...state.branches },
        },
      };
    }

    default:
      return state;
  }
}