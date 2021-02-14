
// Dark Triad Z-scores
export function ZscoreMachiavelli(x) {
  var m = 3;
  var sd = 0.59;
  var Z = (x - m) / sd;
  return Z;
}

export function ZscoreNarcissism(x) {
  var m = 2.71;
  var sd = 0.56;
  var Z = (x - m) / sd;
  return Z;
}

export function ZscorePsychopathy(x) {
  var m = 2.2;
  var sd = 0.6;
  var Z = (x - m) / sd;
  return Z;
}

// Percentiles 
const percentiles = [
  -2.326,
  -2.054,
  -1.881,
  -1.751,
  -1.645,
  -1.555,
  -1.476,
  -1.405,
  -1.341,
  -1.282,
  -1.227,
  -1.175,
  -1.126,
  -1.08,
  -1.036,
  -0.994,
  -0.954,
  -0.915,
  -0.878,
  -0.842,
  -0.806,
  -0.772,
  -0.739,
  -0.706,
  -0.674,
  -0.643,
  -0.613,
  -0.583,
  -0.553,
  -0.524,
  -0.496,
  -0.468,
  -0.44,
  -0.412,
  -0.385,
  -0.358,
  -0.332,
  -0.305,
  -0.279,
  -0.253,
  -0.228,
  -0.202,
  -0.176,
  -0.151,
  -0.126,
  -0.1,
  -0.075,
  -0.05,
  -0.025,
  0,
  0.025,
  0.05,
  0.075,
  0.1,
  0.126,
  0.151,
  0.176,
  0.202,
  0.228,
  0.253,
  0.279,
  0.305,
  0.332,
  0.358,
  0.385,
  0.412,
  0.44,
  0.468,
  0.496,
  0.524,
  0.553,
  0.583,
  0.613,
  0.643,
  0.674,
  0.706,
  0.739,
  0.772,
  0.806,
  0.842,
  0.878,
  0.915,
  0.954,
  0.994,
  1.036,
  1.08,
  1.126,
  1.175,
  1.227,
  1.282,
  1.341,
  1.405,
  1.476,
  1.555,
  1.645,
  1.751,
  1.881,
  2.054,
  2.326,
];

// Zscore Percentile function
export function ZscorePercentile(score) {
  // Filter out all values lower than score
  // highest index represent percentile
  return percentiles.filter((p) => p < score).length;
}
