export function jsonToToon(input, indent = "") {
    let json;
    if (typeof json === "string") {
        try {
            json = JSON.parse(json);
        }
        catch {
            throw new Error("Invalid JSON string");
        }
    }
    if (typeof json !== "object" || json === null) {
        return String(json);
    }
    let result = "";
    for (const key in json) {
        console.log("Processing key:", key);
        const value = json[key];
        if (Array.isArray(value) && value.every(v => typeof v === "object" && v !== null)) {
            const headers = Object.keys(value[0]).join(",");
            result += `${indent}${key}[${value.length}]{${headers}}:\n`;
            for (const row of value) {
                result += indent + Object.values(row).join(",") + "\n";
            }
        }
        else if (Array.isArray(value)) {
            result += `${indent}${key}[${value.length}]: ${value.join(",")}\n`;
        }
        else if (typeof value === "object") {
            result += `${indent}${key}:\n${jsonToToon(value, indent + "  ")}\n`;
        }
        else {
            result += `${indent}${key}: ${value}\n`;
        }
    }
    return result.trim();
}
console.log(jsonToToon({ sku: "A1", qty: 2, price: 9.99 }));
