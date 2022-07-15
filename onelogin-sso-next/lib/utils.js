import { nanoid } from "nanoid";
const jwt = require('jsonwebtoken');
const crypto = require ("crypto");


export const GET_HELLONEXT_SSO_KEY_URL = "http://localhost:3000/api/hn_auth";

export const generateStateAndNonce = (domain, redirect) => {
  return {
    state: `domain:::${domain}&redirect:::${redirect}`,
    nonce: nanoid(32),
  }
};

export const generateHellonextSSOToken = async (userProfile) => {
  const sso_key = "YOUR_SSO_TOKEN_HERE";
  const userData = {
    email: userProfile.email,
    name: userProfile.name, 
    //add_as_customer: true, //optional
    //labels: ["Pro", "EU"], //optional
    //avatar: "https://example.com/avatar.png" //optional
  }

  const token = jwt.sign(userData, sso_key, {
    algorithm: "HS256",
  });

  return token;
}

export const generateHellonextRedirectURL = (token, state) => {
  const redirectBaseURL = "https://app.hellonext.co/redirects/sso?";
  state.split('&').forEach(param => {
    console.log(param);
    const [key, value] = param.split(':::');
    redirectBaseURL += `${key}=${value}&`;
  });
  return `${redirectBaseURL}ssoToken=${token}`;
}
