import { gql } from "@apollo/client/core";
import { apolloClient } from "../apollo-client";
import { getAuthenticationToken, setAuthenticationToken } from "../utils/state";
import { ethers } from "ethers";

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = (address) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address, signature) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

export const login = async (address) => {
  if (getAuthenticationToken()) {
    console.log("login: already logged in");
    return;
  }

  console.log("login: address", address);

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);

  // sign the text with the wallet
  const signer = Provider.getSigner();
  const signature = await signer.signMessage(
    challengeResponse.data.challenge.text
  );

  const accessTokens = await authenticate(address, signature);
  console.log("Acess tokens", accessTokens);

  setAuthenticationToken(accessTokens.data.authenticate.accessToken);

  return accessTokens.data;
};
