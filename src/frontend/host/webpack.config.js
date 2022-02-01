const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const port = 4200;

module.exports = (_, argv) => {
  prod = argv.mode === 'production';
  return ({
    entry: {
      bundle: ["./src/main.js"],
    },
    resolve: {
      alias: {
        svelte: path.resolve("node_modules", "svelte"),
      },
      extensions: [".mjs", ".js", ".svelte"],
      mainFields: ["svelte", "browser", "module", "main"],
    },
    output: {
      chunkFilename: "[name].[id].js",
      publicPath: prod ? 'http://localhost/' : `http://localhost:${port}/`
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: "svelte-loader",
            options: {
              emitCss: false,
              hotReload: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            /**
             * MiniCssExtractPlugin doesn't support HMR.
             * For developing, use 'style-loader' instead.
             * */
            prod ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },
      ],
    },
    devServer: {
      host: '0.0.0.0',
      port: port,
      disableHostCheck: true,
      // to allow serving routes
      historyApiFallback: true,
    },
    mode: argv.mode,
    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        remotes: {
          painter: 'painter@http://localhost:4201/remoteEntry.js'
        },
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
    devtool: prod ? false : "source-map",
  });
};
