import dynamic from 'next/dynamic';
import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

const DynamicCreateCast = dynamic(() => import('../../../components/pages/Movie/CreateCast'), {
  ssr: false,
});

export async function getServerSideProps(ctx) {
  const { idMovie } = ctx.params;

  let castInMovie = []
  const responseGenresInMovie = await fetch(`${movieApiBaseUrl}/v1/movie/cast/${idMovie}`, {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ctx.req.cookies.token}`
    }
  });
  if (responseGenresInMovie.status === 200) {
    castInMovie = await responseGenresInMovie.json();
  }


  let listTypeCasts = []
  const responseListGenres = await fetch(`${movieApiBaseUrl}/v1/cast-profile/list`, {
      method: "GET",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ctx.req.cookies.token}`
      }
  });
  if (responseListGenres.status === 200) {
    listTypeCasts = await responseListGenres.json();
  }

  return { props: { castInMovie, listTypeCasts } };
};

export default DynamicCreateCast;