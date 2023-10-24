import dynamic from 'next/dynamic';
import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

const DynamicSearchMovie = dynamic(() => import('../components/pages/SearchMovie'), {
  ssr: false,
});

export async function getServerSideProps(ctx) {
    const response = await fetch(`${movieApiBaseUrl}/v1/user/myProfile`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ctx.req.cookies.token}`
        }
    });

    let userData = {}
    if (response.status === 200) {
        userData = await response.json();
    }

    return { props: { userData } }
}

export default DynamicSearchMovie;