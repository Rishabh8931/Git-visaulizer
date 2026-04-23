import { clearLocalstorage } from "./localStorage";

const SHORTHANDS = {
  "gs": "git status",
  "gst": "git status",
  "ga": "git add",
  "gc": "git commit",
  "gcm": "git commit -m",
  "gb": "git branch",
  "gco": "git checkout",
  "gp": "git push",
  "gl": "git log",
  "gm": "git merge",
};

export function parseCommand(input) {
  let normalizedInput = input.trim();
  
  // Handle shorthands
  const firstWord = normalizedInput.split(" ")[0];
  if (SHORTHANDS[firstWord]) {
    normalizedInput = normalizedInput.replace(firstWord, SHORTHANDS[firstWord]);
  }

  const parts = normalizedInput.split(" ");

  // clearing terminal
  if (parts[0] === "clear") {
    clearLocalstorage("terminal-history");
    return { type: "CLEAR_HISTORY" }
  }

  // basic validation 
  if (parts[0] !== "git") {
    return { error: `Command not found: ${parts[0]}. Did you mean 'git'?` };
  }

  const command = parts[1];

  switch (command) {
    case "init":
      return { type: "INIT" };

    case "status":
      return { type: "STATUS" };

    case "add":
      if (!parts[2]) return { error: "Nothing specified, nothing added." };
      return { type: "ADD", payload: parts[2] };

    case "commit": {
      const msgIndex = parts.indexOf("-m");
      if (msgIndex === -1) {
        return { error: "Missing commit message. Use -m \"message\"" };
      }

      const message = parts
        .slice(msgIndex + 1)
        .join(" ")
        .replace(/\"/g, "");

      if (!message) return { error: "Commit message cannot be empty." };
      return { type: "COMMIT", payload: message };
    }

    case "branch":
      if (!parts[2]) return { type: "SHOW_BRANCHES" };
      return { type: "BRANCH", payload: parts[2] };

    case "checkout":
      if (!parts[2]) return { error: "Branch name required." };
      if (parts[2] === "-b") {
        if (!parts[3]) return { error: "Branch name required for -b." };
        return { type: "CHECKOUT_NEW_BRANCH", payload: parts[3] };
      }
      return { type: "CHECKOUT", payload: parts[2] };

    case "push":
      return { type: "PUSH" };

    case "log":
      return { type: "LOG" };

    case "merge":
      if (!parts[2]) return { error: "Branch name required to merge." };
      return { type: "MERGE", payload: parts[2] };

    case "reset":
      if (parts[2] === "--hard") {
        return { type: "RESET_HARD", payload: parts[3] };
      }
      return { type: "RESET", payload: parts[2] };

    case "remote":
      if (parts[2] === "add") {
        return { type: "REMOTE_ADD", payload: { name: parts[3], url: parts[4] } };
      }
      return { type: "SHOW_REMOTES" };

    case "fetch":
      return { type: "FETCH" };

    default:
      return { error: `git: '${command}' is not a git command. See 'git --help'.` };
  }
}