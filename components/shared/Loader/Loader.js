import Image from "next/image";

const Loader = (props) => {
  const { size } = props;

  let width = 20;
  let height = 20;

  if (size == "small") {
    width = 16;
    height = 16;
  } else if (size == "large") {
    width = 24;
    height = 24;
  }

  return (
    <Image src="/loading.gif" width={width} height={height} alt="Loader" />
  );
};

export default Loader;
