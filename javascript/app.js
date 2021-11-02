const express = require('express')
const jwt = require('jwt-simple');
const app = express()
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/login', function (req, res) {
  res.render("login", {
    domain: req.query.domain,
    redirect: req.query.redirect
  })
})

app.post('/singin', function (req, res) {
  var user = {
    email: req.body.email,
    name: req.body.name,
  }
  var key = "XcZDHS9J5mdN-asjkdhk" // Organization SSO Key
  var ssoToken = jwt.encode(user, key);
  var url = "https://app.hellonext.co/redirects/sso?domain=" + req.body.domain + "&token=" + ssoToken + "&redirect=" + req.body.redirect;
  console.log(url, req.body);
  res.redirect(url);
})

app.listen(3000)
