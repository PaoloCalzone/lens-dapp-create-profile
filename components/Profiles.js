import { gql, useQuery } from "@apollo/client";
import { GET_PROFILES } from "../api";
import ProfileCard from "./ProfileCard";

export default function Profile({ account, txHash }) {
  const { loading, error, data, refetch } = useQuery(gql(GET_PROFILES), {
    variables: {
      request: { ownedBy: account },
    },
  });
  //console.log("DATA", data);

  return (
    <div>
      {txHash && (
        <div>
          <p className="text-lg mb-10">
            👉 You can see your transaction on{" "}
            <a
              href={`https://mumbai.polygonscan.com/tx/${txHash}`}
              className="text-emerald-600 underline"
            >
              mumbai.polygonscan.
            </a>{" "}
          </p>
          <div className="flex justify-between mb-10">
            <p className="text-lg">
              👉 Wait a few seconds and refresh to see your new profile!
            </p>
            <button
              className="flex   ml-3 w-40 py-2 px-8  items-center border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() =>
                refetch({
                  variables: {
                    request: { ownedBy: account },
                  },
                })
              }
            >
              <span className="flex-1 ">Refresh</span>
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        {txHash && (
          <div>
            <p className="text-lg mb-3">
              And now comes the fun part! Go to{" "}
              <a
                href="https://testnet.lenster.xyz"
                target="blank"
                className="text-emerald-600 underline"
              >
                Lenster
              </a>{" "}
              to edit your profile! Because I lent my ape only for the the demo.
              You can choose your profile picture, which metadata your followers
              will mint when they follow you and much more. Just follow the
              white rabbit!
            </p>
            <p className="text-lg mb-12">
              Last but not least: you can create as many profiles as you want
              with just one account! Just try again...
            </p>
          </div>
        )}
        {account && <h1 className="text-xl mb-3">My account(s):</h1>}
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
        >
          {data &&
            data.profiles.items.map((item) => (
              <ProfileCard
                key={item.handle}
                handle={item.handle}
                profilePictureURI={item.picture}
                account={account}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
