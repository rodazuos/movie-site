import dynamic from 'next/dynamic';
import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

const DynamicCreateGenre = dynamic(() => import('../../../components/pages/Movie/CreateGenre'), {
  ssr: false,
});

export async function getServerSideProps(ctx) {
  const { idMovie } = ctx.params;

  let genresInMovie = []
  const responseGenresInMovie = await fetch(`${movieApiBaseUrl}/v1/movie/genre/${idMovie}`, {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ctx.req.cookies.token}`
    }
  });
  if (responseGenresInMovie.status === 200) {
    genresInMovie = await responseGenresInMovie.json();
  }


  let listGenres = []
  const responseListGenres = await fetch(`${movieApiBaseUrl}/v1/genre/list`, {
      method: "GET",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ctx.req.cookies.token}`
      }
  });
  if (responseListGenres.status === 200) {
    listGenres = await responseListGenres.json();
  }

  return { props: { genresInMovie, listGenres } };
};

export default DynamicCreateGenre;