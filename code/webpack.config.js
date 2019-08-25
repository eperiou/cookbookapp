var path = require('path');
var webpack = require('webpack'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: path.join(__dirname, './users/main.js'),
        //server: path.join(__dirname, './server/server.js')
    },
    output: {
        filename: 'app-bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer : {
        contentBase: path.join(__dirname,'./dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            /*{
                test: require.resolve('jquery'),
                use: [{
                loader: 'expose-loader',
                options: 'jQuery'
                },{
                loader: 'expose-loader',
                options: '$'
                }]
            },*/
            
            { 
                test: /\.js$/, 
                use: 'babel-loader', 
                exclude: /node_modules/ 
            },
            { 
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            { 
                test: /\.sass$/, 
                loaders: [
                    'style-loader', 
                    'css-loader'
                ] 
            },
            { 
                test: /\.html$/, 
                use: 'html-loader' 
            },
            // inline base64 URLs for <=8k images, direct URLs for the rest
            { 
                test: /\.(png|jpg)$/, 
                use: 'url-loader?limit=8192' 
            },
            // helps to load bootstrap's css.
            { 
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&minetype=application/font-woff' 
            },
            { 
                test: /\.woff2$/,
                use: 'url?limit=10000&minetype=application/font-woff' 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&minetype=application/octet-stream' 
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file' 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&minetype=image/svg+xml' 
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'hot replacement',
            minify: {
                collapseWhitespace:true,
            },
            cache: true,
            hash: true,
            title: 'My App',
            template: './dist/index.html',
            inject: true,
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
    devServer: {
        publicPath: '/',
        contentBase: path.join(__dirname, '/public'),
        compress: true
    },
    devtool: 'eval'
};