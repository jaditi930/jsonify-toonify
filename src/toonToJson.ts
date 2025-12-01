export function toonToJson(toon: string): any {
  const lines = toon.trim().split("\n");
  const json: any = {};

  let currentKey: string | null = null;
  let headers: string[] = [];

  for (let line of lines) {
    line = line.trim();

    const tableMatch = line.match(/(\w+)\[(\d+)\]{(.+)}:/);
    if (tableMatch) {
      currentKey = tableMatch[1];
      headers = tableMatch[3].split(",");
      json[currentKey] = [];
      continue;
    }

    const nestedMatch = line.match(/(\w+):$/);
    if (nestedMatch) {
      currentKey = nestedMatch[1];
      json[currentKey] = {};
      continue;
    }

    if (currentKey && headers.length) {
      const values = line.split(",");
      const rowObj: any = {};

      headers.forEach((h, i) => (rowObj[h] = values[i]));

      json[currentKey].push(rowObj);
    }
  }

  return json;
}
