const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },

    output: {
        filename: 'bundle.js',
        path: require('path').resolve(__dirname, 'dist')
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: require('path').resolve(__dirname, 'src/index.html')
        }),
        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

    devServer: {
        watchFiles: ["./src/*"],
        open: true,
        hot: true,
        port: 9000,
    },
}