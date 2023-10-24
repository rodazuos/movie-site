
import dynamic from 'next/dynamic';

const DynamicMovie = dynamic(() => import('../../components/pages/Users'), {
  ssr: false,
});

export default DynamicMovie;