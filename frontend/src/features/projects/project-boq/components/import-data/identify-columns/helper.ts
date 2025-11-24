export const nameColumns = (array: unknown[], mapping: Record<number, string>) => {
    const result = array.reduce<unknown[]>((acc, item) => {
        const arrItem = Object.entries(mapping).reduce<Record<string, number>>((arr, [key, value]) => {
            if (Array.isArray(item)) {
                arr[value] = item[Number(key) - 2];
            }
            return arr;
        }, {})
        return [...acc, arrItem]
    }, [])
    return result;
}