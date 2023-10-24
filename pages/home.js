import dynamic from 'next/dynamic';

const DynamicHome = dynamic(() => import('../components/pages/Home'), {
  ssr: false,
});

export default DynamicHome;
