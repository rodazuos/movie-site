import dynamic from "next/dynamic";
import getConfig from "next/config";

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

const DynamicDetailsMovie = dynamic(
  () => import("../../../components/pages/Movie/Details"),
  {
    ssr: false,
  }
);

export async function getServerSideProps(ctx) {
  let dataMovie = {};
  const { id } = ctx.params;

  const response = await fetch(`${movieApiBaseUrl}/v1/movie/${id}?full=true`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ctx.req.cookies.token}`,
    },
  });
  if (response.status === 200) {
    dataMovie = await response.json();
  }

  return { props: { dataMovie } };
}

export default DynamicDetailsMovie;
