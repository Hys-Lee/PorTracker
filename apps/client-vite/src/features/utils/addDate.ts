const addDate = (
  baseDate: Date,
  by: 'day' | 'month' | 'year',
  operand: number
) => {
  const resDate = new Date(baseDate);
  switch (by) {
    case 'day':
      resDate.setDate(baseDate.getDate() + operand);
      break;
    case 'month':
      resDate.setMonth(baseDate.getMonth() + operand);
      break;
    case 'year':
      resDate.setFullYear(baseDate.getFullYear() + operand);
      break;
    default:
      break;
  }
  return resDate;
};

export default addDate;
