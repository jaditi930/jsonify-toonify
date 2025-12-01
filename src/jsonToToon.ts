export function jsonToToon(input: unknown): string {
  let json: unknown = input;

  // Handle JSON string input
  if (typeof input === "string") {
    try {
      json = JSON.parse(input);
    } catch {
      throw new Error("Invalid JSON string");
    }
  }

  // ----- Primitive -----
  if (json === null || typeof json !== "object") {
    return jsonToToonPrimitive(json);
  }

  // ----- Array -----
  if (Array.isArray(json)) {
    return jsonToToonArray(json);
  }

  // ----- Object -----
  return jsonToToonObject(json as Record<string, unknown>);
}

// ---------------- PRIMITIVE ----------------
function jsonToToonPrimitive(value: unknown): string {
  return String(value);
}

// ---------------- ARRAY ----------------
function jsonToToonArray(arr: unknown[]): string {
  // Empty array
  if (arr.length === 0) return `[0]{value}:\n`;

  // All objects? → Table
  if (arr.every(v => typeof v === "object" && v !== null && !Array.isArray(v))) {
    const rows = arr as Record<string, unknown>[];
    const headers = Object.keys(rows[0]).join(",");
    let out = `[${arr.length}]{${headers}}:\n`;
    for (const row of rows) {
      out += Object.values(row).map(v => stringify(v)).join(",") + "\n";
    }
    return out.trim();
  }

  // Mixed or primitive arrays
  let out = `[${arr.length}]{value}:\n`;
  for (const v of arr) out += stringify(v) + "\n";
  return out.trim();
}

// ---------------- OBJECT ----------------
function jsonToToonObject(obj: Record<string, unknown>): string {
  const keys = Object.keys(obj);

  // Empty object
  if (keys.length === 0) return `[1]{}:\n`;

  // Convert to 1-row table
  const headers = keys.join(",");
  const values = keys.map(k => stringify(obj[k])).join(",");

  return `[1]{${headers}}:\n${values}`;
}

// ---------------- HELPERS ----------------
function stringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.join(",")}]`;
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value);
}
