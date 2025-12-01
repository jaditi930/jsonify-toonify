const readme = `
# json-toon

Convert **JSON ⇄ TOON**, a compact token-efficient data format.

## Install

```
npm install json-toon
```

## Usage

### JSON → TOON

```js
const { jsonToToon } = require("json-toon");

console.log(jsonToToon({ users: [...] }));
```

### TOON → JSON

```js
const { toonToJson } = require("json-toon");

console.log(toonToJson("users[2]{id,name}:n1,An2,B"));
```

## Features

✔ Converts JSON → TOON  
✔ Converts TOON → JSON  
✔ Supports arrays, tables & nested objects  
✔ Zero dependencies  
✔ Node.js/CommonJS compatible  

## Example

### Input JSON

```json
{
  "users": [
    { "id": 1, "name": "Sreeni", "role": "admin" },
    { "id": 2, "name": "Krishna", "role": "admin" }
  ]
}
```

### Output TOON

```
users[2]{id,name,role}:
1,Sreeni,admin
2,Krishna,admin
```

## License
MIT
