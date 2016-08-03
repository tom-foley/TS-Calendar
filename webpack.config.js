var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './index.ts',
    output: {
        filename: './bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.sccs', '.css']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('./bundle.css', {
            allChunks: true
        })
    ],    
    sassLoader: {
        includePaths: ["./src/styles/"]
    }
}