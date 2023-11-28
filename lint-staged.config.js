module.exports = {
  "packages/**/*.{js,ts,tsx,cjs}": ["eslint --fix"],
  "packages/**/*.{js,ts,tsx,json,yml,cjs}": ["prettier --write"],
};
