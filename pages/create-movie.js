import CreateMovie from '../components/pages/CreateMovie';
import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

export async function getServerSideProps({req, res}) {
    const response = await fetch(`${movieApiBaseUrl}/v1/user/myProfile`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.cookies.token}`
        }
    });

    let userData = {}
    if (response.status === 200) {
        userData = await response.json();
    }

    return { props: { userData } }
  }

export default CreateMovie;