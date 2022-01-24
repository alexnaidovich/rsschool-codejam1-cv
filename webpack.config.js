const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Alex Naidovich - RS School - 2018Q3 - Code Jam #1';

/**
 * Required Constants
 */
const INFO = require(path.join(dirApp, 'constants', 'INFO'));
const SLIDES = require(path.join(dirApp, 'constants', 'SLIDES'));

/**
 * Webpack Configuration
 */
const CONFIG = {
    entry: {
        index: [path.join(dirApp, 'index')]
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),

        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./index.ejs',
            filename: 'index.html',
            title: appHtmlTitle,
            favicon: path.join(__dirname, 'favicon.ico'),
            info: INFO,
            slides: SLIDES
        })
    ],
    module: {
        rules: [
            // no need for Babel here
            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                      loader: 'group-css-media-queries-loader',
                      options: {
                        sourceMap: IS_DEV
                      }
                    }
                ]
            },
            

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'group-css-media-queries-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};

module.exports = CONFIG;
