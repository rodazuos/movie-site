import getConfig from "next/config";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import MediaQuery from "react-responsive";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Text from "../../shared/Text";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/Login.module.css";
import { cpfIsvalid } from "../../utils/isValid";

const Login = () => {
  const router = useRouter();
  const { responsiveBreakpoint } = getConfig().publicRuntimeConfig;
  const currentYear = new Date().getUTCFullYear().toString();

  const [loading, setLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState(false);

  const validForm = (formData) => {
    setLoading(true);
    if (!cpfIsvalid(formData.cpf) || formData.password.trim().length == 0) {
      new Error("Dados inválidos!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const bodyData = {};
    formData.forEach((value, key) => (bodyData[key] = value));
    try {
      await validForm(bodyData);
      const response = await fetch("/api/auth", {
        method: form.method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      if (response.status === 200) {
        const result = await response.json();
        Cookies.set("token", result.token);
        Cookies.set("firstAccess", result.firstAccess);
        router.push("/home");
        return true;
      } else {
        setErrorAuth(true);
        setLoading(false);
      }
    } catch (error) {
      setErrorAuth(true);
      setLoading(false);
    }
  };

  return (
    <MediaQuery maxWidth={responsiveBreakpoint}>
      {(matches) => (
        <form method="POST" onSubmit={handleSubmit}>
          <div className={matches ? styles.ContainerMobile : styles.Container}>
            <div className={styles.Background}></div>
            <Paper
              className={matches ? styles.PaperMobile : styles.Paper}
              elevation={3}
            >
              <Text size={matches ? "large" : "extralarge"} color="primary">
                Gestão de Filmes
              </Text>
              <span
                className={matches ? styles.SeparatorButton : styles.Separator}
              >
                {errorAuth && !loading && (
                  <Text size={matches ? "small" : "medium"} color="error">
                    Informações inválidos!
                  </Text>
                )}
              </span>
              {loading ? (
                <Stack spacing={2} alignItems={"center"}>
                  <CircularProgress
                    size={30}
                    sx={{ color: "var(--color-brand-primary)" }}
                  />
                  <Text size="medium" color="primary">
                    Fazendo login...
                  </Text>
                </Stack>
              ) : (
                <div className={styles.Login}>
                  <Stack spacing={2}>
                    <TextField
                      type="input"
                      id="cpf"
                      name="cpf"
                      label="CPF"
                      required
                      error={errorAuth}
                      onChange={() => {
                        setErrorAuth(false);
                      }}
                      inputProps={{
                        maxLength: 11,
                      }}
                    />
                    <TextField
                      id="password"
                      name="password"
                      label="Senha"
                      type="password"
                      required
                      error={errorAuth}
                      onChange={() => {
                        setErrorAuth(false);
                      }}
                    />
                  </Stack>
                  <span className={styles.SeparatorButton}></span>
                  <Button type="submit" variant="contained">
                    ENTRAR
                  </Button>
                </div>
              )}
              <div className={styles.FooterLogin}>
                <Text size="small" color="primary">
                  Copyright © {currentYear}
                </Text>
              </div>
            </Paper>
          </div>
        </form>
      )}
    </MediaQuery>
  );
};

export default Login;
