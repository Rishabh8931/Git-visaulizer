export const getHeadHash = (state) => {
  return state.HEAD;
};

export const getParentHash = (state, commitId) => {
  const commit = state.commits[commitId];
  return commit?.parent?.[0] || null;
};
