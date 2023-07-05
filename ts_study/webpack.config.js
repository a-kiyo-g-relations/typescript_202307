const path = require("path");
const globule = require("globule");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// html読み込み
const plugins = [];
const htmlDir = globule.find({
  src: "*.html",
  srcBase: "src/html",
  matchBase: true,
  prefixBase: true,
});
htmlDir.forEach((htmlFile) => {
  const fileName = path.basename(htmlFile);
  const chunksName = fileName.replace(".html", "");
  plugins.push(
    new HtmlWebpackPlugin({
      filename: fileName,
      template: htmlFile,
    })
  );
});

// webpack設定
module.exports = {
  mode: "development",

  // エントリポイント
  entry: "./src/ts/main.ts",

  // 出力先
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // node_modulesを除外
        exclude: /node_modules/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js", ".html"],
  },

  plugins: plugins,

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
  },

  watchOptions: {
    aggregateTimeout: 1000,
    ignored: "**/node_modules/",
  },
};
