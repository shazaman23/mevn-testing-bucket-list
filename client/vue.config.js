module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3000'
                }
            }
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Bucket List'
        }
    }
}