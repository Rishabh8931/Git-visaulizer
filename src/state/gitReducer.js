export function gitReducer(state, action) {
  switch (action.type) {

    // 🔹 INIT
    case "INIT":
      if (state.initialized) return state;

      return {
        ...state,
        initialized: true,
      };

    // 🔹 ADD
    case "ADD": {
      const fileName = action.payload;

      if (!fileName) return state;

      const fileExists = state.workingDirectory.find(
        (f) => f.name === fileName
      );

      if (!fileExists) return state; // file not found

      const updatedFiles = state.workingDirectory.map((file) =>
        file.name === fileName
          ? { ...file, status: "staged" }
          : file
      );

      // prevent duplicate staging
      const alreadyStaged = state.stagingArea.some(
        (f) => f.name === fileName
      );

      return {
        ...state,
        workingDirectory: updatedFiles,
        stagingArea: alreadyStaged
          ? state.stagingArea
          : [...state.stagingArea, { ...fileExists }],
      };
    }

    // 🔹 COMMIT
    case "COMMIT": {
      // safety check
      if (!state.stagingArea || state.stagingArea.length === 0) {
        return state;
      }

      const newCommitId = Date.now().toString();

      const newCommit = {
        id: newCommitId,
        message: action.payload,
        parent: state.HEAD,
        branch: state.currentBranch,
        files: [...state.stagingArea], // ✅ clone (important)
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
        workingDirectory: state.workingDirectory.map((file) => ({
          ...file,
          status: "tracked",
        })),
      };
    }

    // 🔹 BRANCH
    case "BRANCH": {
      const branchName = action.payload;

      if (!branchName || state.branches[branchName]) return state;

      return {
        ...state,
        branches: {
          ...state.branches,
          [branchName]: state.HEAD,
        },
      };
    }

    // 🔹 CHECKOUT
    case "CHECKOUT": {
      const branch = action.payload;

      if (!state.branches[branch]) return state;

      const commitId = state.branches[branch];
      const commit = state.commits[commitId];

      return {
        ...state,
        currentBranch: branch,
        HEAD: commitId,
        workingDirectory: commit ? [...commit.files] : [],
        stagingArea: [],
      };
    }

    // 🔹 PUSH
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