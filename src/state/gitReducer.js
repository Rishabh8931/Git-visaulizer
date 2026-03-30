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

      //searching for file
      let file = state.workingDirectory.find((f) => f.name === fileName)
      let updatedWorkingDir = [...state.workingDirectory];

      // if file not found
      if (!file) {
        file = {
          name: fileName,
          status: "staged"
        }

        updatedWorkingDir.push(file);
      } else {
        // update status to staged
        updatedWorkingDir = state.workingDirectory.map((f) => {
          return f.name === fileName ? { ...f, status: "staged" } : f
        })

      }



      // prevent duplicate staging
      const alreadyStaged = state.stagingArea.some(
        (f) => f.name === fileName
      );

      return {
        ...state,
        workingDirectory: updatedWorkingDir,
        stagingArea: alreadyStaged
          ? state.stagingArea
          : [...state.stagingArea, { ...file }],
      };
    }

    // 🔹 COMMIT
    case "COMMIT": {
      if (!state.stagingArea || state.stagingArea.length === 0) {
        return state;
      }

      const newCommitId = Date.now().toString();

      const newCommit = {
        id: newCommitId,
        message: action.payload,
        parent: [state.HEAD], // 👈 key for graph
        branch: state.currentBranch, // 👈 key for branching
        files: state.stagingArea.map((f) => ({ ...f })), // deep copy
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
          [state.currentBranch]: newCommitId, // 👈 move branch pointer
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
          [branchName]: state.HEAD, // 👈 correct
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
        workingDirectory: commit ? commit.files.map((f) => ({
          ...f,
          status: "tracked",
        })) : state.workingDirectory,

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

    // 🔹 MERGE
    case "MERGE": {
      const sourceBranch = action.payload;
      const targetBranch = state.currentBranch;
      if (!sourceBranch || !state.branches[sourceBranch]) return state;
      if (sourceBranch === targetBranch) return state;

      const sourceCommitId = state.branches[sourceBranch];
      const targetCommitId = state.HEAD;

      const newCommitId = Date.now().toString();

      const sourceCommit = state.commits[sourceCommitId];
      const targeCommit = state.commits[targetCommitId];

      const mergedFiles = [
        ...(sourceCommit?.files || []),
        ...(targeCommit?.files || [])
      ];


      const mergeCommit = {
        id: newCommitId,
        message: `Merge branch ${sourceBranch}`,
        parent: [targetCommitId, sourceCommitId],
        branch: targetBranch,
        files: mergedFiles,
      }

      return {
        ...state,
        commits: {
          ...state.commits,
          [newCommitId]: mergeCommit,
        },
        HEAD: newCommitId,
        branches: {
          ...state.branches,
          [targetBranch]: newCommitId,
        },
        stagingArea: [],
        workingDirectory: state.workingDirectory.map((file) => {
          return {
            ...file,
            status: "tracked",
          }
        })

      }

    }

    default:
      return state;
  }
}