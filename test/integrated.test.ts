import { jsonToToon } from "../src/jsonToToon";
import { toonToJson } from "../src/toonToJson";

describe("Round-trip conversion (JSON → TOON → JSON)", () => {
  const testCases = [
    { name: "simple object", input: { sku: "A1", qty: 2, price: 9.99 } },
    { name: "nested object", input: { product: { id: "X1", price: 100 }, qty: 3 } },
    { name: "empty object", input: {} },
    { name: "array of numbers", input: [1, 2, 3] },
    { name: "array of strings", input: ["a", "b", "c"] },
    { name: "nested array", input: [[1, 2], [3, 4]] },
    { name: "empty array", input: [] },
    { name: "number", input: 123 },
    { name: "boolean true", input: true },
    { name: "boolean false", input: false },
    { name: "null", input: null },
    { name: "heterogeneous array", input: [{ a: 1 }, 10, "test", null, [5, 6]] },
    { name: "object with arrays", input: { items: [1, 2, 3], count: 3 } },
    { name: "object with booleans and null", input: { active: true, deleted: false, value: null } },
    { name: "array of booleans", input: [true, false, true] },
    { name: "array of nulls", input: [null, null] },
    { name: "single item array", input: [42] },
    { name: "object with single property", input: { name: "John" } },
    { name: "mixed array", input: [{ x: 1 }, { y: 2 }, 5] },
    { name: "decimal numbers", input: { price: 9.99, discount: 0.15 } },
    { name: "negative numbers", input: { temp: -5, offset: -10 } },
  ];

  testCases.forEach(({ name, input }) => {
    test(`should round-trip convert: ${name}`, () => {
      const toon = jsonToToon(input);
      const result = toonToJson(toon);
      
      expect(result).toEqual(input);
    });
  });

  test("should handle JSON string input in round-trip", () => {
    const original = [{ a: 1, b: 2 }, { a: 2, b: 3 }];
    const jsonString = JSON.stringify(original);
    const toon = jsonToToon(jsonString);
    const result = toonToJson(toon);
    
    expect(result).toEqual(original);
  });

  test("should maintain data types in round-trip", () => {
    const input = {
      number: 42,
      float: 3.14,
      negative: -10,
      string: "test",
      booleanTrue: true,
      booleanFalse: false,
      nullValue: null,
      array: [1, 2, 3],
      object: { nested: "value" }
    };
    
    const toon = jsonToToon(input);
    const result = toonToJson(toon);
    
    expect(result).toEqual(input);
    expect(typeof result.number).toBe("number");
    expect(typeof result.float).toBe("number");
    expect(typeof result.string).toBe("string");
    expect(typeof result.booleanTrue).toBe("boolean");
    expect(typeof result.booleanFalse).toBe("boolean");
    expect(result.nullValue).toBe(null);
    expect(Array.isArray(result.array)).toBe(true);
    expect(typeof result.object).toBe("object");
  });
});

