const { addBabelPlugin, override, babelInclude } = require("customize-cra");
const path = require("path");

module.exports = override(
  babelInclude([
    path.resolve("src"),
    path.resolve("node_modules/@react-leaflet"),
    path.resolve("node_modules/react-leaflet"),
  ]),
  addBabelPlugin([
    "babel-plugin-root-import",
    {
      rootPathSuffix: "src",
    },
  ])
);
