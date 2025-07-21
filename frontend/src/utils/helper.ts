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

// temporary id generator for CRUD operations, generetes negative numbers
export const negIdCounter = {
  value: 0,
  getId: function () {
    return --this.value;
  },
  reset: function () {
    this.value = 0;
  },
};

export const ensureNumber = (value: string | number | undefined | null): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const ensureInteger = (value: string | number | undefined | null): number => {
  if (typeof value === 'number') return Math.floor(value);
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const ensureDate = (value: string | Date | undefined | null): Date | null => {
  if (value instanceof Date) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
};
