module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/main.scss";
          @import "@/scss/_variables.scss";
        `
      }
    }
  }
};
