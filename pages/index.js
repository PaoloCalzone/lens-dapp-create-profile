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
  const [account, setAccount] = useState(null);
  const [handle, setHandle] = useState("");
  const [profilePictureURI, setProfilePictureURI] = useState("");

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("accounts:", accounts);
    console.log("Trying to log in...");
    login(accounts[0]);
    setAccount(accounts[0]);
  }

  async function createProfile(_handle, _profilePictureURI) {
    const response = await apolloClient.mutate({
      mutation: gql(CREATE_PROFILE),
      variables: {
        request: {
          _handle,
          _profilePictureURI,
        },
      },
    });
    console.log("CREATION RESPONSE", response);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submiting form");
    createProfile(handle, profilePictureURI);
    console.log("Profile successfully created!");
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Lensbook</title>
        </Head>
        <HeroSection />
        <section className="relative py-12">
          <h1 className="text-lg my-8">
            1. Connect your wallet and select Polygon Mumbai network
          </h1>
          <button
            className="bg-emerald-600 w-40 py-2 px-4 text-center border border-gray-300 rounded-full shadow-sm text-sm font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </button>
          <h1 className="text-lg my-8">2. Choose an funky handle!</h1>
          <div className="my-16 space-y-12">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 divide-y divide-gray-200"
            >
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="eventname"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Handle
                    <p className="mt-1 max-w-2xl text-sm text-gray-400">
                      Your handle will receive the `.test` extension on lens
                      testnet.
                    </p>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="event-name"
                      name="event-name"
                      type="text"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Profile Picture Uri
                    <p className="mt-1 max-w-2xl text-sm text-gray-400">
                      You can pass in a profilePictureUri which is a link to any
                      kind of storage that points to an image. You can leave
                      this out the request if you do not want to supply a
                      default image for the profile.
                    </p>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="event-name"
                      name="event-name"
                      type="text"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      required
                      value={profilePictureURI}
                      onChange={(e) => setProfilePictureURI(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex   ml-3 w-40 py-2 px-8  border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-emerald-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      /* disabled={submitting} */
                    >
                      {/*   {submitting ? <Spinner /> : ""} */}
                      <span className="flex-1">Create</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <h1 className="text-lg my-8">3. You belong to us now!</h1>
          </div>
        </section>
      </div>
    </Layout>
  );
}
