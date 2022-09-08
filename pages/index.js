import { useState } from "react";
import { CREATE_PROFILE } from "../api";
import { gql, useMutation } from "@apollo/client";
import { login } from "../api/login";
import Layout from "../components/Layout";
import Head from "next/head";
import HeroSection from "../components/HeroSection";
import Profiles from "../components/Profiles";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [handle, setHandle] = useState("");
  const [profilePictureURI, setProfilePictureURI] = useState("");

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    login(accounts[0]);
    setAccount(accounts[0]);
  }

  const [createProfile, { data, loading, error }] = useMutation(
    gql(CREATE_PROFILE)
  );

  async function handleSubmit(e) {
    e.preventDefault();

    createProfile({
      variables: {
        request: {
          handle: handle,
          profilePictureUri: profilePictureURI,
        },
      },
    });

    if (data && data.createProfile.reason == "HANDLE_TAKEN") {
      alert("HANDLE ALREADY TAKEN. TRY ANOTHER ONE");
    }
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Lens do it</title>
        </Head>
        <HeroSection />
        <section className="relative py-12">
          <h1 className="text-lg my-8">
            1. Connect your wallet, select Polygon Mumbai network and sign the
            transaction to be logged in.
          </h1>
          <button
            className="bg-emerald-600 w-40 py-2 px-4 text-center border border-gray-300 rounded-full shadow-sm text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700"
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
                      className="block max-w-lg w-full shadow-sm focus:ring-emerald-700 focus:border-emerald-700 sm:text-sm border border-gray-300 rounded-md"
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
                      className="block max-w-lg w-full shadow-sm focus:ring-emerald-700 focus:border-emerald-700 sm:text-sm border border-gray-300 rounded-md"
                      value={profilePictureURI}
                      onChange={(e) => setProfilePictureURI(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex   ml-3 w-40 py-2 px-8  border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          <Profiles account={account} />
        </section>
      </div>
    </Layout>
  );
}
