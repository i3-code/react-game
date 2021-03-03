export function levelGrid(level) {
  if (level < 2) return 2;
  if (level < 4) return 3;
  if (level < 8) return 4;
  if (level < 13) return 5;
  if (level < 22) return 6;
  if (level < 32) return 7;
  if (level < 36) return 8;
  if (level < 40) return 9;
  if (level < 44) return 10;
  if (level < 48) return 11;
  return 12;
}

export function levelColorDiff(level) {
  if (level <= 58) {
    const col = [
      105, 75, 60, 45, 30, 20, 18, 16, 15, 15, 15, 14, 14, 14, 13, 13, 13, 12, 12, 12, 11, 11, 11,
      10, 10, 9, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2,
      1, 1, 1, 1, 1,
    ];
    return col[level - 1];
  }
  return 1;
}

export function levelRandomColor(level) {
  const colorDiff = levelColorDiff(level);
  const r = Math.floor(Math.random() * (255 - colorDiff));
  const g = Math.floor(Math.random() * (255 - colorDiff));
  const b = Math.floor(Math.random() * (255 - colorDiff));
  const normal = `rgb(${r},${g},${b})`;
  const special = `rgb(${r + colorDiff},${g + colorDiff},${b + colorDiff})`;
  return { normal, special };
}

export function getRandomInt(min = 0, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
