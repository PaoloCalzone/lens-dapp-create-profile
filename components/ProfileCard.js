import Link from "next/link";
import Image from "next/image";
import LimonImage from "../public/limon.png";

export default function ProfileCard({ handle, profilePictureURI, account }) {
  return (
    <div className="group relative clickable-card rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
      {/*  <Link href={`/profile/${handle}`}>
        <a className="clickable-card__link"></a>
      </Link> */}
      <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden relative group-hover:opacity-75">
        <Image src={LimonImage} alt="profile image" />
      </div>
      <p className="mt-2 block text-sm text-gray-500">{handle}</p>
    </div>
  );
}
