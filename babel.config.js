module.exports = function (api) {
   api.cache(true)
   return {
      // babel-preset-expo adds the react-native-worklets plugin automatically (SDK 54+)
      presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
   }
}
