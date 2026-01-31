/**
 * Ori * (1+Ratio) = finalVal
 *
 * So, DiffVal = FinalVal - Ori
 *
 * -> Val - Val/(1+R) = Val(1-(1/(1+R))) = Val(R/(1+R))
 *
 */

const calcDiffValFromRatio = (finalVal: number, changeRatioBps: number) => {
  const ratioPercent = changeRatioBps * 100;
  return Number((finalVal * (ratioPercent / (1 + ratioPercent))).toFixed(0));
};
export { calcDiffValFromRatio };
