export const initialState = {
  initialized: false,

  workingDirectory: [
    {
      name: "file1.txt",
      status: "untracked",
    },
  ],

  stagingArea: [],

  commits: {},

  commitOrder: [],

  branches: {
    main: null,
  },

  currentBranch: "main",

  HEAD: null,

  remote: {
    commits: {},
    branches: {
      main: null,
    },
    HEAD: null,
  },

  currentPath: "~/project",
};