import { clearLocalstorage } from "./localStorage";


export function parseCommand(input) {
  const parts = input.trim().split(" ");

  // clearing terminal
  if (parts[0] === "clear") {
    clearLocalstorage("terminal-history");
    return { type: "CLEAR_HISTORY" }
  }
  if (parts[0] !== "git") {
    return { error: "Command not found" };
  }

  switch (parts[1]) {
    case "init":
      return { type: "INIT" };

    case "add":
      if (!parts[2]) return { error: "Nothing specified, nothing added " };
      return { type: "ADD", payload: parts[2] };

    case "commit": {
      const msgIndex = parts.indexOf("-m");
      if (msgIndex === -1) {
        return { error: "Missing commit message" };
      }

      const message = parts
        .slice(msgIndex + 1)
        .join(" ")
        .replace(/\"/g, "");

      return { type: "COMMIT", payload: message };
    }

    case "branch":
      return { type: "BRANCH", payload: parts[2] };

    case "checkout":
      return { type: "CHECKOUT", payload: parts[2] };

    case "push":
      return { type: "PUSH" };

    case "merge":
      if (!parts[2]) return { error: `${parts[2]} branch does not exists` };
      return { type: "MERGE", payload: parts[2] };

    default:
      return { error: "Command not found" };
  }
}