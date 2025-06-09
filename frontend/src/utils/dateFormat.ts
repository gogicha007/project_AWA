
export function formatToISODateTime(value: string | Date | undefined): Date | null {
  if (!value) {
    return null;
  }
  
  if (value instanceof Date) {
    return value;
  }
  
  if (typeof value === 'string') {
    if (!value.includes('T')) {
      return new Date(`${value}T12:00:00Z`);
    }
    return new Date(value);
  }
  
  return null;
}