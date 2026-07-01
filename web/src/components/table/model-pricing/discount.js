export const getUsedGroupRatio = (model, selectedGroup, groupRatio = {}) => {
  let usedGroupRatio = groupRatio[selectedGroup];

  if (selectedGroup === 'all' || usedGroupRatio === undefined) {
    let minRatio = Number.POSITIVE_INFINITY;
    const enableGroups = Array.isArray(model?.enable_groups)
      ? model.enable_groups
      : [];

    enableGroups.forEach((g) => {
      const ratio = groupRatio[g];
      if (ratio !== undefined && ratio < minRatio) {
        minRatio = ratio;
        usedGroupRatio = ratio;
      }
    });

    if (usedGroupRatio === undefined) {
      usedGroupRatio = 1;
    }
  }

  return usedGroupRatio;
};

export const getDiscountZheByGroupRatio = (groupRatio) => {
  const ratio = Number(groupRatio);
  if (!Number.isFinite(ratio)) {
    return null;
  }

  // 折数 = 组倍率 * 10，保留到小数点后一位
  const zhe = ratio * 10;
  const boundedZhe = Math.max(0, Math.min(10, zhe));
  return Number(boundedZhe.toFixed(1));
};
