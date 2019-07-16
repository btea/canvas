const fs = require('fs');
let htmlWebpackPlugin = require('html-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        new VueLoaderPlugin()
    ]
}