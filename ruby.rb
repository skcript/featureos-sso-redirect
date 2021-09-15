# Understanding SSO Redirects
# https://hellonext.co/help/sso-redirects

require 'sinatra'
require 'jwt'

template :login do
  '''
    <form action="/sign_in" method="post">
      <label for="fname">Email:</label><br>
      <input type="text" id="name" name="email" value="john@hellonext.co"><br>
      <input type="submit" value="Submit">
    </form>
  '''
end

get '/' do
  'Hello World'
end

get '/login' do
  erb :login
end

post '/sign_in' do
  # Your organizations SSO key is present in the Admin Dashboard > Organization Settings > Advanced > SSO Key
  key = <ORGNAIZATION_SSO_KEY>
  payload = {
    email: params[:email],
    name: 'John Smith'
  }
  
  # This token is unique for every user and helps us authenticate. Read more here: https://hellonext.co/help/setting-up-sso
  sso_token = JWT.encode payload, key, 'HS256'

  redirect_url = "https://app.hellonext.co/redirects/sso?domain=#{params[:domain]}&redirect=#{params[:redirect]}&ssoToken=#{sso_token}"
  redirect redirect_url
end
