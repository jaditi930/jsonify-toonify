# Running jsonify-toonify

## Installation

```bash
git clone https://github.com/jaditi930/jsonify-toonify.git
cd jsonify-toonify
npm install
```

## File Structure

```
jsonify-toonify/
├── src/
│   ├── jsonToToon.ts    # JSON to TOON converter
│   └── toonToJson.ts    # TOON to JSON converter
├── test/
│   ├── jsonToToon.test.ts
│   ├── toonToJson.test.ts
│   └── integrated.test.ts
├── dist/                # Compiled output (generated)
└── package.json
```

## Run Tests

```bash
npm test
```

To run tests in watch mode:

```bash
npm test -- --watch
```
