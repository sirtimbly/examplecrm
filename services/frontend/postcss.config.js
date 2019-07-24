// var postcss = require('postcss')
const cssnano = require("cssnano");
const postcssPresetEnv = require('postcss-preset-env');
var atImport = require("postcss-import");
var purgecss = require("@fullhuman/postcss-purgecss");
var purgeHtml = require("purge-from-html");

var purgeFromFrets = require("purgecss-from-frets");

module.exports = {
  // parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: [
    // atImport(),
    require('tailwindcss')('tailwind.config.js'),
    require('autoprefixer'),
    // postcssPresetEnv({
    //   stage: 1,
    //   browsers: 'last 2 versions'
    // }),
    purgecss({
      content: ['./src/scripts/**/*.ts', './src/**/.html', './src/markup/**/*.hbs'],
      extractors: [{
        extractor: purgeFromFrets,
        extensions: ["ts"]
      }, {
        extractor: purgeHtml,
        extensions: ['html', 'hbs']
      }],
      whitelist: ['html', 'body', 'input', 'button', 'select'],
      whitelistPatterns: [/icon/, /white/, /gray/, /fade/],
      rejected: true
    })
    // cssnano({
    //   preset: 'default',
    // })
  ],
  input: 'src/styles/base.css',
  dir: 'dist'
}
