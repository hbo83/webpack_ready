const path = require('path');//modul poskytujici praci se slozkama a souborama 
const HtmlWebpackPlugin = require('html-webpack-plugin');//tenhle plugin generuje index.html v dist(nemusime rucne menit src a atd v index.html)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//tenhle plugin vycisti dist slozku od starych vybuildenych souboru(predtim tam zustavali)

module.exports = {
    mode: 'development',//development pro vyvoj a production pro vybuildeni produkcni verze, bundle v dev. verzi lze cist. v produkcni je necitelna minifikovana a uglifikovana
    entry: {//objekt s entry pointy
        app: './src/index.js',
        print: './src/print.js',
    },
    devtool: 'inline-source-map',//zajisti source mapovani, to znamena, ze pokud mam vybuildeny tri scripty a v jednom je chyba, konzole vypise v jakym souboru chyba je
    devServer: {//zajisti vyvojovy server na localhostu(to take bude potreba pro HMR)
             contentBase: './dist',
             hot: true,//zajisti hot reload
           },
    plugins: [
        new CleanWebpackPlugin(),//tenhle plugin vycisti dist slozku od starych vybuildenych souboru(predtim tam zustavali)
        new HtmlWebpackPlugin({//tenhle plugin generuje index.html v dist(nemusime rucne menit src a atd v index.html)
            title: 'Output Management',
        }),
    ],
    output: {
        filename: '[name].bundle.js',//output file, ktery automaticky generuje bundle podle nazvu vstupniho souboru (print.bundle.js)
        path: path.resolve(__dirname, 'dist'),//output directory
    },
    module: {
        rules: [
            {
                test: /\.css$/,//na vse co konci css se aplikuji tyto loadery, to umozni import './style.css' v index.js, tyto styly pak vlozi do hlavicky v html
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,//na vse co ma tyto pripony aplikuj file-loader
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,//na vse co ma tyto pripony aplikuj file-loader(tohle jsou fonty)
                use: [
                    'file-loader',
                ],
            },
        ],
    },
};