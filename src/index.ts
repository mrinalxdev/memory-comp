import {
    compactArray,
    compactObject,
    deepCompactArray,
    deepCompactObject,
    compactWithCustomFilter,
    compactBySize,
    compactWithPriority
} from "./compact";

const basicData = [
    { id: 1, name: "Alice", age: 25, unusedField: null },
    { id: 2, name: "Bob", age: 30, unusedField: undefined },
];

const nestedData = [
    {
        id: 1,
        info: { name: "Alice", temp: null, details: { age: 25, temp2: undefined } },
        extra: null
    }
];

const mixedData = [
    { id: 1, name: "Alice", score: 0, notes: "test", temp: null },
    { id: 2, name: "Bob", score: 10, notes: "", temp: undefined },
];

console.log("Basic Compact:", compactArray(basicData));
console.log("Basic Object Compact:", compactObject(basicData[0]));
console.log("Deep Compact:", deepCompactArray(nestedData));
console.log("Deep Object Compact:", deepCompactObject(nestedData[0]));
console.log("Custom Filter (non-zero):",
    compactWithCustomFilter(mixedData, v => v !== 0));
console.log("Size Limited (50 bytes):", compactBySize(mixedData, 50));
console.log("Priority Compact:",
    compactWithPriority(mixedData, ["name", "id"]));
