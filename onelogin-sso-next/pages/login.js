import { beginAuth } from "../lib/oidApi";
import { generateStateAndNonce } from "../lib/utils";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <p>
        <a href="/auth/login">Login with OneLogin</a>
      </p>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // get params
  const { domain, redirect } = ctx.query;
  const { state, nonce } = generateStateAndNonce(domain, redirect);

  const redirectURL = beginAuth({ state, nonce });

  if (redirectURL) {
    return {
      redirect: {
        permanent: false,
        destination: redirectURL,
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}
