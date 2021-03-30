const path = require("path")

module.exports = {
  publicPath:'./',
  configureWebpack: {
    plugins: [
      // new MyAwesomeWebpackPlugin()
    ],
    resolve: {
      alias: {
        "@components":path.resolve(__dirname,"./src/components"),
        "@api": path.resolve(__dirname, "./src/api/index.js"),
        "@store": path.resolve(__dirname, "./src/store/index.js"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@views": path.resolve(__dirname, "./src/views"),
        "@router": path.resolve(__dirname, "./src/router"),
      }
    },
    module: {
      rules: [
        // {
        //   test: /\.json$/,
        //   loader: 'json-loader'
        // }
      ]
    }
    // devServer: {
    //   allowedHosts: [
    //     "https://shilai.zhiyi.cn/",
    //     "test.shilai.zhiyi.cn"
    //   ],
    //   proxy: {
    //     "/api": {
    //       target:"https://shilai.zhiyi.cn/",
    //       bypass: function(req, res, proxyOptions) {
    //         if (req.headers.accept.indexOf("html") !== -1) {
    //           console.log("Skipping proxy for browser request.");
    //           return "/index.html";
    //         }
    //       }
    //     }
    //   }
    // }
  },
 
}