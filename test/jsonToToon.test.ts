import { jsonToToon } from "../src/jsonToToon";

describe("jsonToToon()", () => {
  // ------------------- OBJECT TESTS --------------------
  test("should convert simple object", () => {
    const input = { sku: "A1", qty: 2, price: 9.99 };
    const output = jsonToToon(input);
    console.log(output);

    expect(output).toBe(
      `[1]{sku,qty,price}:\nA1,2,9.99`
    );
  });

  test("should convert nested object", () => {
    const input = {
      product: { id: "X1", price: 100 },
      qty: 3
    };

    const output = jsonToToon(input);
    expect(output).toBe(
      `[1]{product,qty}:\n{"id":"X1","price":100},3`
    );
  });

  test("should convert empty object", () => {
    expect(jsonToToon({})).toBe(`[1]{}:\n`);
  });

  // ------------------- ARRAY TESTS --------------------
  test("should convert array of objects", () => {
    const input = [
      { sku: "A1", qty: 2 },
      { sku: "B2", qty: 1 }
    ];

    const output = jsonToToon(input);

    expect(output).toBe(
      `[2]{sku,qty}:\nA1,2\nB2,1`
    );
  });

  test("should convert array of primitives", () => {
    expect(jsonToToon([1, 2, 3])).toBe(`[3]{value}:\n1\n2\n3`);
    expect(jsonToToon(["a", "b"])).toBe(`[2]{value}:\na\nb`);
  });

  test("should convert nested array", () => {
    const input = [[1, 2], [3, 4]];

    expect(jsonToToon(input)).toBe(
      `[2]{value}:\n[1,2]\n[3,4]`
    );
  });

  test("should convert empty array", () => {
    expect(jsonToToon([])).toBe(`[0]{value}:\n`);
  });

  // ------------------- PRIMITIVE INPUT TESTS --------------------
    test("should throw error for invalid JSON (string input)", () => {
    expect(() => jsonToToon("hello")).toThrow("Invalid JSON string");
    });

  test("should convert number", () => {
    expect(jsonToToon(123)).toBe(`123`);
  });

  test("should convert boolean", () => {
    expect(jsonToToon(true)).toBe(`true`);
    expect(jsonToToon(false)).toBe(`false`);
  });

  test("should convert null", () => {
    expect(jsonToToon(null)).toBe(`null`);
  });

  // ------------------- STRINGIFIED JSON TESTS --------------------

  test("should parse valid JSON string", () => {
    const input = JSON.stringify([{ a: 1 }]);
    const output = jsonToToon(input);

    expect(output).toBe(
      `[1]{a}:\n1`
    );
  });

  test("should throw error for invalid JSON string", () => {
    expect(() => jsonToToon("{bad json")).toThrow("Invalid JSON");
  });

  // ------------------- MIXED / COMPLEX TESTS --------------------

  test("should handle heterogeneous arrays", () => {
    const input = [
      { a: 1 },
      10,
      "test",
      null,
      [5, 6]
    ];

    const output = jsonToToon(input);

    expect(output).toBe(
      `[5]{value}:\n{"a":1}\n10\ntest\nnull\n[5,6]`
    );
  });
});
