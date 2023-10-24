
import dynamic from 'next/dynamic';
import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

const DynamicCreateUser = dynamic(() => import('../../components/pages/Users/Create'), {
  ssr: false,
});

export async function getServerSideProps(ctx) {
    let user = {}
    const { id } = ctx.params;
    if (!isNaN(id)) {
        const response = await fetch(`${movieApiBaseUrl}/v1/user/${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ctx.req.cookies.token}`
            }
        });
        if (response.status === 200) {
            user = await response.json();
        }
    }

    return { props: { user } };
}

export default DynamicCreateUser;