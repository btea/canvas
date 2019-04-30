const fs = require('fs');
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        })
    ]
}