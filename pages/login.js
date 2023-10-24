import dynamic from 'next/dynamic';

const DynamicLogin = dynamic(() => import('../components/pages/Login'), {
  ssr: false,
});

export default DynamicLogin;