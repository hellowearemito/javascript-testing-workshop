module.exports = {
  rules: {
    "no-unused-vars": "off"
  },
  overrides: [
    {
      files: ["**/*.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
