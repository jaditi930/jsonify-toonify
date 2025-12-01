export function toonToJson(toon: string): any {
  const trimmed = toon.trim();
  
  if (!trimmed) return null;
  
  const tableMatch = trimmed.match(/^\[(\d+)\]{([^}]*)}:(.*)$/s);
  if (tableMatch) {
    const count = parseInt(tableMatch[1], 10);
    const headersStr = tableMatch[2];
    const dataStr = tableMatch[3].trim();
    
    if (count === 0) {
      return [];
    }
    
    if (headersStr === "") {
      return {};
    }
    
    const headers = headersStr.split(",");
    const lines = dataStr ? dataStr.split("\n") : [];
    
    if (headers.length === 1 && headers[0] === "value") {
      const result: any[] = [];
      for (const line of lines) {
        result.push(parseValue(line.trim()));
      }
      return result;
    }
    
    const result: any[] = [];
    for (const line of lines) {
      const values = parseCsvLine(line);
      const obj: any = {};
      headers.forEach((h, i) => {
        obj[h] = parseValue(values[i] || "");
      });
      result.push(obj);
    }
    
    if (count === 1 && result.length === 1) {
      return result[0];
    }
    
    return result;
  }
  
  return parseValue(trimmed);
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  let inJsonStructure = false;
  let depth = 0;
  let bracketType: '{' | '[' | null = null;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = i + 1 < line.length ? line[i + 1] : null;
    
    if (char === '"' && !inJsonStructure) {
      inQuotes = !inQuotes;
      current += char;
    } else if ((char === '[' || char === '{') && !inQuotes) {
      if (!inJsonStructure) {
        inJsonStructure = true;
        bracketType = char;
        depth = 1;
      } else {
        depth++;
      }
      current += char;
    } else if ((char === ']' || char === '}') && !inQuotes && inJsonStructure) {
      depth--;
      current += char;
      if (depth === 0) {
        inJsonStructure = false;
        bracketType = null;
      }
    } else if (char === ',' && !inQuotes && !inJsonStructure) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  
  if (current) {
    result.push(current);
  }
  
  return result;
}

function parseValue(value: string): any {
  const trimmed = value.trim();
  
  if (trimmed === "") return "";
  if (trimmed === "null") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1);
    if (inner === "") return [];
    return inner.split(",").map(v => {
      const trimmedVal = v.trim();
      if (trimmedVal === "") return "";
      if (trimmedVal === "null") return null;
      if (trimmedVal === "true") return true;
      if (trimmedVal === "false") return false;
      if (!isNaN(Number(trimmedVal)) && trimmedVal !== "") {
        return Number(trimmedVal);
      }
      return trimmedVal;
    });
  }
  
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }
  
  if (!isNaN(Number(trimmed)) && trimmed !== "") {
    return Number(trimmed);
  }
  
  return trimmed;
}
