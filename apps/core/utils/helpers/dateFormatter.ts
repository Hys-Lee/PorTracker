type divider = '.' | '-' | '/' | '_';
type year = 'YYYY' | 'YY';
type month = 'MM';
type date = 'DD';
type dateFormat =
  | `${year | month | date}${divider}${year | month | date}`
  | `${year | month | date}${divider}${year | month | date}${divider}${
      | year
      | month
      | date}`;

const dateFormatter = (
  date: Date | string,
  format: dateFormat,
  divider: divider
): string => {
  const dateDate = new Date(date);
  const year = dateDate.getFullYear();
  const month = dateDate.getMonth() + 1;
  const daydate = dateDate.getDate();

  const values = format.split(divider);
  //   const values = ['.', '-', '/', '_'].reduce((acc, curDivider) => {
  //     const res = format.split(curDivider).filter((str) => str.length > 0);
  //     if (res.length > 1) {
  //       for (let i = 0; i < res.length - 1; i++) {
  //         dividers.push(curDivider);
  //       }
  //     }
  //     return [...acc, ...res];
  //   }, [] as string[]);

  const dateValues = values.map((curValue) => {
    switch (curValue) {
      case 'YYYY':
        return String(year);
      case 'YY':
        return String(year).substring(2, 4);
      case 'MM':
        return String(month).padStart(2, '0');
      case 'DD':
        return String(daydate).padStart(2, '0');
      default:
        return null;
    }
  });

  return dateValues.join(divider);
};

export { dateFormatter };
