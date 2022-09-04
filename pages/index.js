import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CREATE_PROFILE } from "../api";
import { gql, useMutation } from "@apollo/client";
import { login } from "../api/login";
import Layout from "../components/Layout";
import Head from "next/head";
import HeroSection from "../components/HeroSection";
import { apolloClient } from "../apollo-client";

// TODO
// Define the createProfile query and function
// Add a button to let the user create his profilenpm run de
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

  const [createProfile, { data, loading, error }] = useMutation(
    gql(CREATE_PROFILE)
  );

  console.log("LOADING", loading);
  console.log("ERROR", error);
  console.log("DATA", data);

  /* const createProfile = async function createProfile() {
    const response = await apolloClient.mutate({
      mutation: gql(CREATE_PROFILE),
      variables: {
        request: {
          handle: "jimmyConnors",
        },
      },
    });
  }; */

  /*  if (loading)
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>`Error! ${error.message}`</p>
      </div>
    ); */
  return (
    <Layout>
      <Head>
        <title>Lensbook</title>
      </Head>
      <HeroSection />
      <div className="my-16 space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
        <button onClick={() => connectWallet()}>Connect Wallet</button>
        <button
          onClick={() =>
            createProfile({
              variables: {
                request: {
                  handle: "jimmyConnors",
                },
              },
            })
          }
        >
          Create Profile
        </button>
      </div>
    </Layout>
  );
}
