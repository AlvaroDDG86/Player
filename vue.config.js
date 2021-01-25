module.exports = {
  publicPath: '',
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
