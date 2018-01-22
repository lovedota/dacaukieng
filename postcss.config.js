module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer'),
        require('postcss-import'),
        require('postcss-nested')({}),
        require('postcss-global-nested')({}),
    ]
}