module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/player/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_main.scss";
          @import "@/scss/_variables.scss";
          @import "@/scss/_animations.scss";
        `
      }
    }
  }
};
