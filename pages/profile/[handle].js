import { useState, useEffect } from "react";
import { getProfileById, getPublicationsById } from "../../api";
import ABI from "../../abi.json";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Layout from "../../components/Layout";
import Head from "next/head";
import Image from "next/image";

export default function Profile(context) {
  const router = useRouter();
  const { handle } = router.query;
  return (
    <Layout>
      <Head>
        <title>{handle ? handle : "Lensbook"}</title>
      </Head>
    </Layout>
  );
}
