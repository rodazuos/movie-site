import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import MediaQuery from "react-responsive";
import getConfig from "next/config";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import userSession from "../../userSession";
import Modal from "@mui/material/Modal";
import styles from "../../../../styles/Profile.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

import imgProfiler from "../../../../public/profile.png";
import LogoutIcon from "../../../../public/icons/logout.png";
import PasswordIcon from "../../../../public/icons/password.png";
import UserProfilerIcon from "../../../../public/icons/userProfile.png";

const Profile = (props) => {
  const { openMenu } = props;
  const { name, typeAccount } = userSession();
  const router = useRouter();
  const { responsiveBreakpoint } = getConfig().publicRuntimeConfig;

  const firstAccess = Boolean(Cookies.get("firstAccess") === "true");
  const [open, setOpen] = useState(firstAccess);

  const [newPassword, setNewPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const handleOpen = () => {
    setNewPassword(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleViewMyProfile = () => {
    router.push("/profile");
  };

  const handleChangePassword = async () => {
    if (newPassword === "") {
      setErrorPassword(true);
      return;
    }

    const body = {
      password: newPassword,
    };

    const response = await fetch("/api/updatePassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("firstAccess");
    router.push("/login");
  };

  return (
    <>
      <MediaQuery maxWidth={responsiveBreakpoint}>
        {(matches) => (
          <Stack spacing={2}>
            {openMenu && (
              <Paper elevation={2} sx={{ padding: "16px 8px" }}>
                <Stack alignItems="center" spacing={2}>
                  <Avatar
                    alt="Foto Perfil"
                    src={imgProfiler.src}
                    sx={{
                      width: matches ? 64 : 90,
                      height: matches ? 64 : 90,
                    }}
                  />
                  {!matches && (
                    <Stack paddingX={4} spacing={1}>
                      <Typography
                        textAlign="center"
                        noWrap
                        style={{ fontWeight: "600" }}
                      >
                        {name}
                      </Typography>
                      {typeAccount === 1 && (
                        <Typography
                          textAlign="center"
                          noWrap
                          style={{ fontWeight: "600" }}
                        >
                          Admin
                        </Typography>
                      )}
                    </Stack>
                  )}
                  <Stack direction="row" spacing={2}>
                    <Stack
                      onClick={handleViewMyProfile}
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        src={UserProfilerIcon.src}
                        width={24}
                        height={24}
                        alt="Meu perfil"
                      />
                    </Stack>
                    <Stack onClick={handleOpen} style={{ cursor: "pointer" }}>
                      <Image
                        src={PasswordIcon.src}
                        width={24}
                        height={24}
                        alt="Alterar Senha"
                      />
                    </Stack>
                    <Stack onClick={handleLogout} style={{ cursor: "pointer" }}>
                      <Image
                        src={LogoutIcon.src}
                        width={24}
                        height={24}
                        alt="Logout"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            )}
            {!openMenu && (
              <>
                <Stack alignItems="center" spacing={2}>
                  <Avatar
                    alt="Foto Perfil"
                    src={imgProfiler.src}
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  />
                  <Stack
                    onClick={handleViewMyProfile}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      src={UserProfilerIcon.src}
                      width={openMenu ? 24 : 32}
                      height={openMenu ? 24 : 32}
                      alt="Meu perfil"
                    />
                  </Stack>
                  <Stack onClick={handleOpen} style={{ cursor: "pointer" }}>
                    <Image
                      src={PasswordIcon.src}
                      width={openMenu ? 24 : 32}
                      height={openMenu ? 24 : 32}
                      alt="Alterar Senha"
                    />
                  </Stack>
                  <Stack onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <Image
                      src={LogoutIcon.src}
                      width={openMenu ? 24 : 32}
                      height={openMenu ? 24 : 32}
                      alt="Logout"
                    />
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        )}
      </MediaQuery>
      <Modal open={open}>
        <Stack className={styles.Modal} spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Primeiro acesso - Alterar senha
          </Typography>

          <TextField
            id="password"
            name="password"
            label="Nova Senha"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            error={errorPassword}
            required
          />

          <Typography id="modal-modal-title">
            Ao realizar a alteração de senha, será necessário um novo login
          </Typography>

          <Stack
            direction="row"
            justifyContent={firstAccess ? "flex-end" : "space-between"}
          >
            <Button variant="contained" onClick={handleChangePassword}>
              Alterar
            </Button>
            {!firstAccess && (
              <Button variant="contained" onClick={handleClose}>
                Cancelar
              </Button>
            )}
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default Profile;
