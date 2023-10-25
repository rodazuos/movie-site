import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useRouter } from "next/router";

const Menu = (props) => {
  const { icon, text, link, openMenu } = props;
  const router = useRouter();

  const handleRoute = (pathURI) => {
    router.push(pathURI);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      style={{ cursor: "pointer", borderRadius: "4px" }}
      onClick={() => handleRoute(link)}
      justifyContent={!openMenu ? "center" : "left"}
      padding={0.5}
    >
      <Image
        src={icon.src}
        width={openMenu ? 24 : 32}
        height={openMenu ? 24 : 32}
        alt={text}
      />
      {openMenu && <Typography>{text}</Typography>}
    </Stack>
  );
};

export default Menu;
