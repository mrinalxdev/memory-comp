export function compactArray<T extends object>(data : T[]):Partial<T>[]{
    return data.map((item) => {
        const compactedItem : Partial<T> = {};
        for (const [key, value] of Object.entries(item)){
            if (value !== null && value !== undefined)
                compactedItem[key as keyof T] = value;
        }
        return compactedItem
    })
}

export function compactObject<T extends object>(data : T[]) : Partial<T> {
    const compactedItem : Partial<T> = {};
    for (const [key, value] of Object.entries(data)){
        if (value !== null && value !== undefined){
            compactedItem[key as keyof T] = value;
        }
    }

    return compactedItem
}

export function deepCompactArray<T extends object>(data: T[]): Partial<T>[] {
    return data.map((item) => {
        const compactedItem: Partial<T> = {};
        for (const [key, value] of Object.entries(item)) {
            if (value !== null && value !== undefined) {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    compactedItem[key as keyof T] = deepCompactObject(value as any);
                } else if (Array.isArray(value)) {
                    compactedItem[key as keyof T] = deepCompactArray(value as any) as any;
                } else {
                    compactedItem[key as keyof T] = value;
                }
            }
        }
        return compactedItem;
    });
}

export function deepCompactObject<T extends object>(data: T): Partial<T> {
    const compactedItem: Partial<T> = {};
    for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                compactedItem[key as keyof T] = deepCompactObject(value as any);
            } else if (Array.isArray(value)) {
                compactedItem[key as keyof T] = deepCompactArray(value as any) as any;
            } else {
                compactedItem[key as keyof T] = value;
            }
        }
    }
    return compactedItem;
}
export function compactWithCustomFilter<T extends object>(
    data: T[],
    filterFn: (value: any) => boolean
): Partial<T>[] {
    return data.map((item) => {
        const compactedItem: Partial<T> = {};
        for (const [key, value] of Object.entries(item)) {
            if (filterFn(value)) {
                compactedItem[key as keyof T] = value;
            }
        }
        return compactedItem;
    });
}

export function compactBySize<T extends object>(
    data: T[],
    maxSize: number
): Partial<T>[] {
    return data.map((item) => {
        const compactedItem: Partial<T> = {};
        let currentSize = 0;
        const entries = Object.entries(item).sort(([, a], [, b]) =>
            JSON.stringify(b).length - JSON.stringify(a).length
        );
        for (const [key, value] of entries) {
            if (value !== null && value !== undefined) {
                const valueSize = JSON.stringify(value).length;
                if (currentSize + valueSize <= maxSize) {
                    compactedItem[key as keyof T] = value;
                    currentSize += valueSize;
                }
            }
        }
        return compactedItem;
    });
}

export function compactWithPriority<T extends object>(
    data: T[],
    priorityKeys: (keyof T)[]
): Partial<T>[] {
    return data.map((item) => {
        const compactedItem: Partial<T> = {};
        const priorityMap = new Map(priorityKeys.map((k, i) => [k, i]));
        const entries = Object.entries(item).sort(([a], [b]) => {
            const priorityA = priorityMap.get(a as keyof T) ?? Infinity;
            const priorityB = priorityMap.get(b as keyof T) ?? Infinity;
            return priorityA - priorityB;
        });
        for (const [key, value] of entries) {
            if (value !== null && value !== undefined) {
                compactedItem[key as keyof T] = value;
            }
        }
        return compactedItem;
    });
}
