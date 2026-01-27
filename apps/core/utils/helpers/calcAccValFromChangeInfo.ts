export const calcAccuValFromChangeInfo = (
  changeValue: number,
  changeRatioBps: number
) => {
  const changeRatio = changeRatioBps / 100;
  return (changeValue / changeRatio) * (1 + changeRatio);
};
