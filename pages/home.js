import dynamic from "next/dynamic";
import getConfig from "next/config";

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

const DynamicHome = dynamic(() => import("../components/pages/Home"), {
  ssr: false,
});

export async function getServerSideProps(ctx) {
  let listMovies = {};

  const response = await fetch(`${movieApiBaseUrl}/v1/movies/list`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ctx.req.cookies.token}`,
    },
  });
  if (response.status === 200) {
    listMovies = await response.json();
  }

  return { props: { listMovies } };
}

export default DynamicHome;
