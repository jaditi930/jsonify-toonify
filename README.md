# json-toonify

A lightweight TypeScript library for converting between JSON and TOON formats. TOON is a compact, token-efficient data format that's perfect for scenarios where you need to minimize data size while maintaining readability.

## Installation

```bash
npm install json-toonify
```

## Quick Start

```javascript
import { jsonToToon, toonToJson } from 'json-toonify';

// Convert JSON to TOON
const json = { sku: "A1", qty: 2, price: 9.99 };
const toon = jsonToToon(json);
console.log(toon);
// Output: [1]{sku,qty,price}:
//         A1,2,9.99

// Convert TOON back to JSON
const backToJson = toonToJson(toon);
console.log(backToJson);
// Output: { sku: 'A1', qty: 2, price: 9.99 }
```

## Features

- ✅ Bidirectional conversion between JSON and TOON
- ✅ Supports all JSON data types (objects, arrays, primitives)
- ✅ Handles nested structures and complex data
- ✅ Zero dependencies
- ✅ TypeScript support with full type definitions
- ✅ Works with both CommonJS and ES modules

## API Reference

### `jsonToToon(input: unknown): string`

Converts a JSON value (object, array, or primitive) to TOON format.

**Parameters:**
- `input` - Any JSON-serializable value (object, array, number, string, boolean, null, or a JSON string)

**Returns:** A string in TOON format

**Examples:**

```javascript
// Simple object
jsonToToon({ name: "John", age: 30 });
// [1]{name,age}:
// John,30

// Array of objects
jsonToToon([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]);
// [2]{id,name}:
// 1,Alice
// 2,Bob

// Array of primitives
jsonToToon([1, 2, 3]);
// [3]{value}:
// 1
// 2
// 3

// Primitives
jsonToToon(42);        // "42"
jsonToToon(true);      // "true"
jsonToToon(null);      // "null"

// JSON string input
jsonToToon('{"a": 1}');
// [1]{a}:
// 1
```

### `toonToJson(toon: string): any`

Converts a TOON format string back to JSON.

**Parameters:**
- `toon` - A string in TOON format

**Returns:** The original JSON value (object, array, or primitive)

**Examples:**

```javascript
// Simple object
toonToJson('[1]{name,age}:\nJohn,30');
// { name: 'John', age: 30 }

// Array of objects
toonToJson('[2]{id,name}:\n1,Alice\n2,Bob');
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

// Array of primitives
toonToJson('[3]{value}:\n1\n2\n3');
// [1, 2, 3]

// Primitives
toonToJson('42');      // 42
toonToJson('true');    // true
toonToJson('null');    // null
```

## TOON Format Specification

The TOON format is designed to be compact and human-readable:

### Objects
Objects are represented as single-row tables:
```
[1]{key1,key2,key3}:
value1,value2,value3
```

### Arrays of Objects
Arrays of objects become multi-row tables:
```
[2]{id,name}:
1,Alice
2,Bob
```

### Arrays of Primitives
Primitive arrays use a special `value` header:
```
[3]{value}:
1
2
3
```

### Nested Structures
Nested objects are JSON-stringified within the TOON format:
```
[1]{product,qty}:
{"id":"X1","price":100},3
```

### Empty Structures
```
[0]{value}:        // Empty array
[1]{}:             // Empty object
```

## Use Cases

- **API Responses**: Reduce payload size for mobile apps
- **Data Storage**: Compact serialization for databases
- **Logging**: More efficient log file formats
- **Configuration Files**: Human-readable yet compact configs
- **Data Transfer**: Minimize bandwidth usage

## Examples

### E-commerce Product Data

```javascript
const products = [
  { sku: "A1", name: "Widget", price: 9.99, stock: 100 },
  { sku: "B2", name: "Gadget", price: 19.99, stock: 50 }
];

const toon = jsonToToon(products);
console.log(toon);
// [2]{sku,name,price,stock}:
// A1,Widget,9.99,100
// B2,Gadget,19.99,50
```

### Configuration Object

```javascript
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  enabled: true
};

const toon = jsonToToon(config);
console.log(toon);
// [1]{apiUrl,timeout,retries,enabled}:
// https://api.example.com,5000,3,true
```

### Round-trip Conversion

```javascript
const original = { users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }] };

// Convert to TOON
const toon = jsonToToon(original);

// Convert back to JSON
const restored = toonToJson(toon);

// They should be equal
console.log(JSON.stringify(original) === JSON.stringify(restored)); // true
```

## Error Handling

```javascript
try {
  // Invalid JSON string
  jsonToToon('{invalid json}');
} catch (error) {
  console.error(error.message); // "Invalid JSON string"
}
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import { jsonToToon, toonToJson } from 'json-toonify';

const data: { id: number; name: string }[] = [
  { id: 1, name: "Alice" }
];

const toon: string = jsonToToon(data);
const restored: typeof data = toonToJson(toon);
```

## Browser Support

Works in all modern browsers and Node.js environments (Node.js 12+).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Authors

- jaditi930
- akshay2002singh

## Links

- [GitHub Repository](https://github.com/jaditi930/json-toonify)
- [Report Issues](https://github.com/jaditi930/json-toonify/issues)
