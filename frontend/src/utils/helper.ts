/* takes array of objects {id: value, anyKey: value} 
and converts to object with id value as key and anyKey value as value*/

export const ArrToObjById = (
  // eslint-disable-next-line
  array: any[],
  valueAsKey: string,
  valueAsValue: string
) => {
  return array.reduce(
    (acc, val) => {
      if (val[valueAsKey] !== undefined) {
        acc[val[valueAsKey]] = val[valueAsValue];
      }
      return acc;
    },
    {} as Record<string | number, string>
  );
};
