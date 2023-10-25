import dynamic from "next/dynamic";

const DynamicMovie = dynamic(() => import("../../components/pages/Movie"), {
  ssr: false,
});

export default DynamicMovie;
