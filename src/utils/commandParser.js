


export function parseCommand(input) {
  const parts = input.trim().split(" ");

  if (input === "git init") {
    return { type: "INIT" };
  }

  if (parts[0] === "git" && parts[1] === "add") {
    return { type: "ADD", payload: parts[2] };
  }

  if (parts[0] === "git" && parts[1] === "commit") {
    const msgIndex = parts.indexOf("-m");
    if (msgIndex === -1) return { error: "Missing commit message" };

    const message = parts.slice(msgIndex + 1).join(" ").replace(/\"/g, "");
    return { type: "COMMIT", payload: message };
  }

  if (parts[0] === "git" && parts[1] === "branch") {
    return { type: "BRANCH", payload: parts[2] };
  }

  if (parts[0] === "git" && parts[1] === "checkout") {
    return { type: "CHECKOUT", payload: parts[2] };
  }

  if (input === "git push") {
    return { type: "PUSH" };
  }

  return { error: "Command not found" };
}