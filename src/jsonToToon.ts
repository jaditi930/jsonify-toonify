export function jsonToToon(input: unknown): string {
  let json: unknown = input;

  if (typeof input === "string") {
    try {
      json = JSON.parse(input);
    } catch {
      throw new Error("Invalid JSON string");
    }
  }

  if (json === null || typeof json !== "object") {
    return jsonToToonPrimitive(json);
  }

  if (Array.isArray(json)) {
    return jsonToToonArray(json);
  }

  return jsonToToonObject(json as Record<string, unknown>);
}

function jsonToToonPrimitive(value: unknown): string {
  return String(value);
}

function jsonToToonArray(arr: unknown[]): string {
  if (arr.length === 0) return `[0]{value}:\n`;

  if (arr.every(v => typeof v === "object" && v !== null && !Array.isArray(v))) {
    const rows = arr as Record<string, unknown>[];
    const headers = Object.keys(rows[0]).join(",");
    let out = `[${arr.length}]{${headers}}:\n`;
    for (const row of rows) {
      out += Object.values(row).map(v => stringify(v)).join(",") + "\n";
    }
    return out.trim();
  }

  let out = `[${arr.length}]{value}:\n`;
  for (const v of arr) out += stringify(v) + "\n";
  return out.trim();
}

function jsonToToonObject(obj: Record<string, unknown>): string {
  const keys = Object.keys(obj);

  if (keys.length === 0) return `[1]{}:\n`;

  const headers = keys.join(",");
  const values = keys.map(k => stringify(obj[k])).join(",");

  return `[1]{${headers}}:\n${values}`;
}

function stringify(value: unknown): string {
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every(v => typeof v === "object" && v !== null && !Array.isArray(v))) {
      return JSON.stringify(value);
    }
    return `[${value.map(v => {
      if (Array.isArray(v)) return `[${v.join(",")}]`;
      if (typeof v === "object" && v !== null) return JSON.stringify(v);
      return String(v);
    }).join(",")}]`;
  }
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value);
}
