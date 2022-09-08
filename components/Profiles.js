import { gql, useQuery } from "@apollo/client";
import { GET_PROFILES } from "../api";
import ProfileCard from "./ProfileCard";

export default function Profile({ account }) {
  const { loading, error, data } = useQuery(gql(GET_PROFILES), {
    variables: {
      request: { ownedBy: account },
      pollInterval: 500,
      notifyOnNetworkStatusChange: true,
    },
  });

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
      >
        {data &&
          data.profiles.items.map((item) => (
            <ProfileCard
              handle={item.handle}
              profilePictureURI={item.picture}
              account={account}
            />
          ))}
      </ul>
    </div>
  );
}
