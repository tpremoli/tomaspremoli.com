const path = require("path");
const webpack = require("webpack");

// sudo cp -r ~/Spotifier/Spotifier/frontend/build/* /var/www/html/

module.exports = {
    // Change to production for final
    mode: 'development',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./static/frontend"), // when testing
        // path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        },],
    },
    optimization: {
        // Optimising
        minimize: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify("development"),
            },
        }),
    ],
};