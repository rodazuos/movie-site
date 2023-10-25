import Profile from "./Profile";
import Menu from "./Menu";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import LeftArrowIcon from "../../../public/icons/leftArrow.png";
import RightArrowIcon from "../../../public/icons/rightArrow.png";
import HomeIcon from "../../../public/icons/home.png";
import ManagerIcon from "../../../public/icons/manager.png";
import UsersIcon from "../../../public/icons/users.png";
import userSession from "../userSession";

const Navbar = () => {
  const { typeAccount } = userSession();
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <Stack
      spacing={openMenu ? 4 : 3}
      padding={2}
      style={{ backgroundColor: "#bbc1df", overflowY: "auto" }}
      minWidth={openMenu ? "220px" : "76px"}
    >
      <Profile openMenu={openMenu} />
      <Divider />
      <Stack spacing={openMenu ? 0.5 : 1.5}>
        <Menu icon={HomeIcon} text="Home" link="/home" openMenu={openMenu} />
        {typeAccount === 1 && (
          <>
            <Menu
              icon={UsersIcon}
              text="Cadastrar usuários"
              link="/users"
              openMenu={openMenu}
            />
            <Menu
              icon={ManagerIcon}
              text="Gerenciar Filmes"
              link="/movie"
              openMenu={openMenu}
            />
          </>
        )}
      </Stack>
      <Divider />
      <Stack
        padding="2px"
        style={{ cursor: "pointer" }}
        onClick={() => setOpenMenu(!openMenu)}
        alignItems="center"
      >
        <Stack width="fit-content">
          {openMenu && (
            <Image
              src={LeftArrowIcon.src}
              width={32}
              height={32}
              alt="Esconder Menu"
            />
          )}
          {!openMenu && (
            <Image
              src={RightArrowIcon.src}
              width={32}
              height={32}
              alt="Abrir Menu"
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
