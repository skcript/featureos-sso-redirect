import { parse } from "query-string";
import { useRouter } from 'next/router';
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { generateHellonextRedirectURL, generateHellonextSSOToken, generateStateAndNonce, GET_HELLONEXT_SSO_KEY_URL } from "../lib/utils";
import axios from "axios";

export default function Auth() {
  // const location = window.location;
  const { asPath } = useRouter();
  const hash = parse(asPath.split('#')[1]);
  const id_token = hash.id_token;
  const [profile, setProfile] = useState(null);


  const getSSOToken = async (profile) => {
    return await axios.post(GET_HELLONEXT_SSO_KEY_URL, {
      profile,
    })
  }

  useEffect(() => {
    if (id_token) {
      const decoded = jwtDecode(id_token);
      setProfile(decoded);
      getSSOToken(decoded).then(res => {
        const token = res.data.token;
        const redirect = generateHellonextRedirectURL(token, hash.state);
        console.log(redirect);
        window.location.href = redirect;
      });
    }
  }, [id_token]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello {profile.name}</h1>
    </div>
  );
}

