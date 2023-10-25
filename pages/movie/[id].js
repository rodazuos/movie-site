import dynamic from 'next/dynamic';
import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

const DynamicCreateMovie = dynamic(() => import('../../components/pages/Movie/Create'), {
    ssr: false,
});

export async function getServerSideProps(ctx) {
    let dataMovie = {}
    const { id } = ctx.params;
    if (!isNaN(parseInt(id))) {
        const response = await fetch(`${movieApiBaseUrl}/v1/movie/${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ctx.req.cookies.token}`
            }
        });
        if (response.status === 200) {
            dataMovie = await response.json();
            const durationHM = dataMovie.duration.split('h')
            dataMovie.hours = parseInt(durationHM?.[0]) || 0;
            dataMovie.minutes = parseInt(durationHM?.[1]) || 0;
        }
    }

    return { props: { dataMovie } };
};

export default DynamicCreateMovie;