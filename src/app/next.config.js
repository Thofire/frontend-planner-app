module.exports = {
    basePath: '/pages',
    async redirects() {
      return [
        {
          source: '/pages',
          destination: '/',
          permanent: true,
        },
      ]
    },
  }