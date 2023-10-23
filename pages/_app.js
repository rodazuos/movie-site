import "../styles/globals.css";
import Head from "next/head";

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Gestão e Catálago de filmes</title>
        <meta name="description" content="Site para gerenciar filmes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

CustomApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getServerSideProps) {
    pageProps = await Component.getServerSideProps(ctx);
  }

  return {
    pageProps,
  };
};

export default CustomApp;
