export const mix = (color1, color2, weight) => {
  // decimal to hex
  const d2h = (d) => d.toString(16);
  // hex to decimal
  const h2d = (h) => parseInt(h, 16);

  const weightValue = typeof weight !== "undefined" ? weight : 50;

  let color = "#";

  // loop through hex pairs
  for (let i = 0; i <= 5; i += 2) {
    // extract the current pairs
    const v1 = h2d(color1.substr(i, 2));
    const v2 = h2d(color2.substr(i, 2));

    // combine the colors
    let val = d2h(Math.round(v2 + (v1 - v2) * (weightValue / 100.0)));

    while (val.length < 2) {
      val = `0${val}`;
    }

    color += val;
  }

  return color;
};

export const calculatePercentageFromRange = (minValue, maxValue, value) => {
  const percent = (value - minValue) / (maxValue - minValue);

  if (percent <= 0) {
    return 0;
  }
  if (percent >= 1) {
    return 100;
  }
  return percent * 100;
};
