import { useState } from "react";
import { CREATE_PROFILE } from "../api";
import { gql, useMutation } from "@apollo/client";
import { login } from "../api/login";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import Profiles from "../components/Profiles";
import Spinner from "../components/Spinner";
import Seo from "../utils/Seo";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [handle, setHandle] = useState("");
  const [txHash, settxHash] = useState(null);

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

    const response = await createProfile({
      variables: {
        request: {
          handle: handle,
        },
      },
    });

    if (response.error)
      alert(`Oooops, something went wrong: ${response.error}`);
    if (response.data && response.data.createProfile.reason == "HANDLE_TAKEN") {
      alert("HANDLE ALREADY TAKEN. TRY ANOTHER ONE");
    }
    if (response.data.createProfile.txHash) {
      settxHash(response.data.createProfile.txHash);
    }
  }

  return (
    <Layout>
      <Seo />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <section className="relative py-12">
          <h1 className="text-lg my-8">
            <span className="text-2xl">1.</span> Connect your wallet, select{" "}
            <strong>Polygon Mumbai</strong> network and <strong>sign</strong>{" "}
            the transaction to be logged in.
          </h1>
          <div className="flex justify-end">
            <button
              className="bg-emerald-600 w-40 py-2 px-4 text-center border border-gray-300 rounded-full shadow-sm text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700"
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </button>
          </div>
          <h1 className="text-lg my-8">
            <span className="text-2xl">2.</span> Choose a funky handle!
          </h1>
          <div className="my-16 space-y-12">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 divide-y divide-gray-200"
            >
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="handle"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Handle
                    <p className="mt-1 max-w-2xl text-sm text-gray-400">
                      Your handle will receive the `.test` extension on lens
                      testnet. Min. 5 characters, max 30.
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
                      disabled={!account}
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex   ml-3 w-40 py-2 px-8  border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={loading}
                    >
                      {loading ? <Spinner /> : ""}
                      <span className="flex-1">Create </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <h1 className="text-lg my-8">
              <span className="text-2xl">3.</span>{" "}
              {txHash ? "Congrats! See what happened:" : "Curious?"}
            </h1>
          </div>
          <Profiles account={account} txHash={txHash} />
        </section>
      </div>
    </Layout>
  );
}
