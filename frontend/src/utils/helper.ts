/* takes array of objects {id: value, anyKey: value} 
and converts to object with id value as key and anyKey value as value*/

export function arrayToIdValueMap<
  T extends { id?: string | number },
  K extends keyof T,
>(arr: T[], valueKey: K): Record<string, T[K]> {
  return arr.reduce(
    (acc, item) => {
      if (item.id !== undefined) {
        acc[item.id.toString()] = item[valueKey];
      }
      return acc;
    },
    {} as Record<string, T[K]>
  );
}

export const negIdCounter = {
  value: 0,
  getId: function () {
    return --this.value;
  },
  reset: function () {
    this.value = 0;
  },
};
