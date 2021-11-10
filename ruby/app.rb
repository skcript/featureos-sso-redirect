# Understanding SSO Redirects
# https://hellonext.co/help/sso-redirects

require 'sinatra'
require 'jwt'

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
    name: params[:name]
  }

  # This token is unique for every user and helps us authenticate. Read more here: https://hellonext.co/help/setting-up-sso
  sso_token = JWT.encode payload, key, 'HS256'

  # When we redirect users to your application, we'll include a redirect query parameter.
  # You will need to send users back to us with both the redirect URL and SSO token in the query parameters, once they've been logged in.
  redirect_url = "https://app.hellonext.co/redirects/sso?domain=#{params[:domain]}&redirect=#{params[:redirect]}&ssoToken=#{sso_token}"
  redirect redirect_url
end
