import Head from "next/head";
import OGImage from "../public/og-picture.png";

const Seo = () => {
  return (
    <Head>
      <title>Lens do it</title>
      <meta name="description" content="Create your lens handle on testnet!" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />

      <meta property="og:url" content="https://lens-do-it.vercel.app/" />
      <meta property="og:site_name" content="Lens do it!" />
      <meta property="og:title" content="Lens do it!" />
      <meta
        property="og:description"
        content="Create your lens handle on testnet!"
      />
      <meta
        property="og:image"
        content="https://lens-do-it.vercel.app/og-picture.png"
      />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="Lens do it!" />
      <meta property="twitter:title" content="Lens do it!" />
      <meta
        property="twitter:description"
        content="Create your lens handle on testnet!"
      />
      <meta
        property="twitter:image:src"
        content="https://lens-do-it.vercel.app/og-picture.png"
      />
      <meta property="twitter:image:width" content="400" />
      <meta property="twitter:image:height" content="400" />
      <meta property="twitter:creator" content="paolocalzone" />
    </Head>
  );
};

export default Seo;
