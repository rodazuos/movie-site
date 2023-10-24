import dynamic from 'next/dynamic';
import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

const DynamicProfile = dynamic(() => import('../components/pages/Profile'), {
  ssr: false,
});

export async function getServerSideProps(ctx) {
  let userData = {}
  
  const response = await fetch(`${movieApiBaseUrl}/v1/user/myProfile`, {
      method: "GET",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ctx.req.cookies.token}`
      }
  });
  if (response.status === 200) {
    userData = await response.json();
  }

  return { props: { userData } };
}

export default DynamicProfile;
