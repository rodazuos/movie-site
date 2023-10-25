import "../styles/globals.css";
import Head from "next/head";
import getConfig from "next/config";
import SessionContext from "../components/shared/SessionContext";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

function CustomApp({ Component, pageProps, userData }) {
  return (
    <>
      <Head>
        <title>Gestão e Catálago de filmes</title>
        <meta name="description" content="Site para gerenciar filmes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionContext.Provider value={userData}>
        <Component {...pageProps} />
      </SessionContext.Provider>
    </>
  );
}

CustomApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getServerSideProps) {
    pageProps = await Component.getServerSideProps(ctx);
  }

  let token = null;
  let url = null;
  if (typeof window === "undefined") {
    token = ctx.req.cookies.token;
    url = serverRuntimeConfig.movieApiBaseUrl;
  } else {
    if (document.cookie) {
      const arrayCookies = document.cookie.split(";");
      const authorization = arrayCookies.filter((cookie) =>
        cookie.includes("token")
      );
      if (authorization.length > 0) {
        token = authorization[0].split("=")[1];
        url = publicRuntimeConfig.movieApiBaseUrl;
      }
    }
  }

  let userData = {};
  if (token) {
    const response = await fetch(`${url}/v1/user/myProfile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      userData = await response.json();
    }
  }

  return {
    userData,
    pageProps,
  };
};

export default CustomApp;
