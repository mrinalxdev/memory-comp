import { compactArray, compactObject } from "./compact";

// Example usage
const data = [
  { id: 1, name: "Alice", age: 25, unusedField: null },
  { id: 2, name: "Bob", age: 30, unusedField: undefined },
];

console.log("Original Data:", data);
console.log("Compacted Data:", compactArray(data));

const singleObject = { id: 1, name: "Alice", age: 25, unusedField: null };
console.log("Compacted Object:", compactObject(singleObject));
