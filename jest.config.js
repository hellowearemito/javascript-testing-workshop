module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  rootDir: "src",
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/__tests__/*.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"]
};
