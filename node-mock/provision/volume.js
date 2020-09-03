module.exports = function(router) {
  router.get(global.APP_BASE_API + '/volume', (req, res) => {
    res.send('login success');
  })
}
