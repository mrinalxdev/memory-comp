import {
    compactArray,
    compactObject,
    deepCompactArray,
    deepCompactObject,
    compactWithCustomFilter,
    compactBySize,
    compactWithPriority
} from "../src/compact";

describe("Memory Compacter", () => {
    it("compacts array of objects", () => {
        const data = [
            { id: 1, name: "Alice", age: 25, unusedField: null },
            { id: 2, name: "Bob", age: 30, unusedField: undefined },
        ];
        expect(compactArray(data)).toEqual([
            { id: 1, name: "Alice", age: 25 },
            { id: 2, name: "Bob", age: 30 },
        ]);
    });

    it("compacts single object", () => {
        const data = { id: 1, name: "Alice", age: 25, unusedField: null };
        expect(compactObject(data)).toEqual({ id: 1, name: "Alice", age: 25 });
    });

    it("deep compacts array", () => {
        const data = [{
            id: 1,
            info: { name: "Alice", temp: null, details: { age: 25, temp2: undefined } },
            extra: null
        }];
        expect(deepCompactArray(data)).toEqual([{
            id: 1,
            info: { name: "Alice", details: { age: 25 } }
        }]);
    });

    it("deep compacts object", () => {
        const data = {
            id: 1,
            info: { name: "Alice", temp: null },
            extra: null
        };
        expect(deepCompactObject(data)).toEqual({
            id: 1,
            info: { name: "Alice" }
        });
    });

    it("compacts with custom filter", () => {
        const data = [{ id: 1, name: "Alice", score: 0, temp: null }];
        expect(compactWithCustomFilter(data, v => typeof v === 'string'))
            .toEqual([{ name: "Alice" }]);
    });

    it("compacts by size limit", () => {
        const data = [{ id: 1, name: "Alice", notes: "long text here", temp: null }];
        expect(compactBySize(data, 20)).toHaveLength(1);
    });

    it("compacts with priority", () => {
        const data = [{ id: 1, name: "Alice", age: 25, temp: null }];
        const result = compactWithPriority(data, ["name", "id"]);
        expect(Object.keys(result[0])).toEqual(["name", "id", "age"]);
    });
});
