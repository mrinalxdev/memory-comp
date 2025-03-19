
import { compactArray, compactObject } from "../src/compact";

describe("Memory Compacter", () => {
  it("should compact an array of objects", () => {
    const data = [
      { id: 1, name: "Alice", age: 25, unusedField: null },
      { id: 2, name: "Bob", age: 30, unusedField: undefined },
    ];
    const result = compactArray(data);
    expect(result).toEqual([
      { id: 1, name: "Alice", age: 25 },
      { id: 2, name: "Bob", age: 30 },
    ]);
  });

  it("should compact a single object", () => {
    const data = { id: 1, name: "Alice", age: 25, unusedField: null };
    const result = compactObject(data);
    expect(result).toEqual({ id: 1, name: "Alice", age: 25 });
  });
});
