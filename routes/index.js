function signIn(req, res) {

}

function signUp(req, res) {
  console.log(req.data)
  res.send(data);
}

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('Hello world');
  });
  app.get('/signIn', function (req, res) {
    res.send('Hello world');
  });
  app.post('/signUp', signUp);
};