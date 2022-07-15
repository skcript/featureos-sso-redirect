import { stringify } from "query-string";

// Static oidc params for a single provider
const authority = "https://syncfit-dev.onelogin.com/oidc/2";
const client_id = "a2e7cbc0-e4cf-013a-f85a-061731d8c81f212509";
const redirect_uri = "http://localhost:3000/auth";
const response_type = "id_token token";
const scope = "openid profile";

export const beginAuth = ({ state, nonce }) => {
  // Generate authentication URL
  const params = stringify({
    client_id,
    redirect_uri,
    response_type,
    scope,
    state,
    nonce
  });
  const authUrl = `${authority}/auth?${params}`;
  console.log(authUrl);

  // Attempt login by navigating to authUrl
  return authUrl;
};
