/**
 * Compacts an array of objects by removing keys with null or undefined values.
 * @param data - The input array of objects.
 * @returns A new array of compacted objects.
 */
export function compactArray<T extends object>(data: T[]): Partial<T>[] {
    return data.map((item) => {
      const compactedItem: Partial<T> = {};
      for (const [key, value] of Object.entries(item)) {
        if (value !== null && value !== undefined) {
          compactedItem[key as keyof T] = value;
        }
      }
      return compactedItem;
    });
  }



  /**
   * Compacts a single object by removing keys with null or undefined values.
   * @param data - The input object.
   * @returns A new compacted object.
   */
  export function compactObject<T extends object>(data: T): Partial<T> {
    const compactedItem: Partial<T> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined) {
        compactedItem[key as keyof T] = value;
      }
    }
    return compactedItem;
  }
