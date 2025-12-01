import { toonToJson } from "../src/toonToJson";

describe("toonToJson()", () => {
  test("should convert simple object", () => {
    const input = `[1]{sku,qty,price}:\nA1,2,9.99`;
    const output = toonToJson(input);
    
    expect(output).toEqual({ sku: "A1", qty: 2, price: 9.99 });
  });

  test("should convert nested object", () => {
    const input = `[1]{product,qty}:\n{"id":"X1","price":100},3`;
    const output = toonToJson(input);
    
    expect(output).toEqual({
      product: { id: "X1", price: 100 },
      qty: 3
    });
  });

  test("should convert empty object", () => {
    const input = `[1]{}:\n`;
    const output = toonToJson(input);
    
    expect(output).toEqual({});
  });

  test("should convert array of objects", () => {
    const input = `[2]{sku,qty}:\nA1,2\nB2,1`;
    const output = toonToJson(input);
    
    expect(output).toEqual([
      { sku: "A1", qty: 2 },
      { sku: "B2", qty: 1 }
    ]);
  });

  test("should convert array of primitives", () => {
    expect(toonToJson(`[3]{value}:\n1\n2\n3`)).toEqual([1, 2, 3]);
    expect(toonToJson(`[2]{value}:\na\nb`)).toEqual(["a", "b"]);
  });

  test("should convert nested array", () => {
    const input = `[2]{value}:\n[1,2]\n[3,4]`;
    const output = toonToJson(input);
    
    expect(output).toEqual([[1, 2], [3, 4]]);
  });

  test("should convert empty array", () => {
    const input = `[0]{value}:\n`;
    const output = toonToJson(input);
    
    expect(output).toEqual([]);
  });

  test("should convert number", () => {
    expect(toonToJson(`123`)).toBe(123);
    expect(toonToJson(`0`)).toBe(0);
    expect(toonToJson(`-42`)).toBe(-42);
    expect(toonToJson(`3.14`)).toBe(3.14);
  });

  test("should convert boolean", () => {
    expect(toonToJson(`true`)).toBe(true);
    expect(toonToJson(`false`)).toBe(false);
  });

  test("should convert null", () => {
    expect(toonToJson(`null`)).toBe(null);
  });

  test("should convert string", () => {
    expect(toonToJson(`hello`)).toBe("hello");
    expect(toonToJson(`test123`)).toBe("test123");
  });

  test("should handle heterogeneous arrays", () => {
    const input = `[5]{value}:\n{"a":1}\n10\ntest\nnull\n[5,6]`;
    const output = toonToJson(input);
    
    expect(output).toEqual([
      { a: 1 },
      10,
      "test",
      null,
      [5, 6]
    ]);
  });

  test("should handle array with mixed objects and primitives", () => {
    const input = `[3]{value}:\n{"x":1}\n{"y":2}\n5`;
    const output = toonToJson(input);
    
    expect(output).toEqual([
      { x: 1 },
      { y: 2 },
      5
    ]);
  });

  test("should handle object with array values", () => {
    const input = `[1]{items,count}:\n[1,2,3],3`;
    const output = toonToJson(input);
    
    expect(output).toEqual({
      items: [1, 2, 3],
      count: 3
    });
  });

  test("should handle empty string", () => {
    expect(toonToJson(``)).toBe(null);
  });

  test("should handle object with boolean and null values", () => {
    const input = `[1]{active,deleted,value}:\ntrue,false,null`;
    const output = toonToJson(input);
    
    expect(output).toEqual({
      active: true,
      deleted: false,
      value: null
    });
  });

  test("should handle array of booleans", () => {
    const input = `[3]{value}:\ntrue\nfalse\ntrue`;
    const output = toonToJson(input);
    
    expect(output).toEqual([true, false, true]);
  });

  test("should handle array of nulls", () => {
    const input = `[2]{value}:\nnull\nnull`;
    const output = toonToJson(input);
    
    expect(output).toEqual([null, null]);
  });

  test("should handle single item array", () => {
    const input = `[1]{value}:\n42`;
    const output = toonToJson(input);
    
    expect(output).toEqual([42]);
  });

  test("should handle object with single property", () => {
    const input = `[1]{name}:\nJohn`;
    const output = toonToJson(input);
    
    expect(output).toEqual({ name: "John" });
  });
});

