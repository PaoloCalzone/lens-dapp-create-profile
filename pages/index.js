import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { recommendedProfiles } from "../api";
import { useQuery } from "@apollo/client";
import { login } from "../api/login";
import Layout from "../components/Layout";
import Head from "next/head";
import HeroSection from "../components/HeroSection";

// TODO call the login() after the connect() function
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
      </div>
    </Layout>
  );
}
