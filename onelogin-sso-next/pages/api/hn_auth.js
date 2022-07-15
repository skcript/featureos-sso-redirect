// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { decryptedState, generateHellonextSSOToken } from "../../lib/utils";

export default async function handler(req, res) {
  // Do not allow get 
  if (req.method === 'GET') {
    res.status(405).end();
    return;
  }

  const { profile } = req.body;
  const token = await generateHellonextSSOToken(profile);
  res.json({ token });
}
