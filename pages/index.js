import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CREATE_PROFILE, GET_PROFILES, GET_DEFAULT_PROFILES } from "../api";
import { gql, useQuery, useMutation } from "@apollo/client";
import { login } from "../api/login";
import Layout from "../components/Layout";
import Head from "next/head";
import HeroSection from "../components/HeroSection";
import { apolloClient } from "../apollo-client";

// TODO create form to create a profile

export default function Home() {
  const [accounts, setAccounts] = useState(null);

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("accounts:", accounts);
    console.log("Trying to log in...");
    login(accounts[0]);
  }

  async function createProfile() {
    const response = await apolloClient.mutate({
      mutation: gql(CREATE_PROFILE),
      variables: {
        request: {
          handle: "Chaussettes",
        },
      },
    });
    console.log("CREATION RESPONSE", response);
  }

  return (
    <Layout>
      <Head>
        <title>Lensbook</title>
      </Head>
      <HeroSection />
      <div className="my-16 space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
        <button onClick={() => connectWallet()}>Connect Wallet</button>
        <button onClick={() => createProfile()}>Create Profile</button>
      </div>
    </Layout>
  );
}
