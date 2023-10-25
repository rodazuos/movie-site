import Stack from "@mui/material/Stack";
import Layout from "../../../shared/Layout";
import Text from "../../../shared/Text";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import deleteImage from "../../../../public/icons/delete.png";
import cameraImage from "../../../../public/icons/camera.png";
import Image from "next/image";

const CreateCast = (props) => {
  const { castInMovie, listTypeCasts } = props;
  const router = useRouter();
  const { idMovie } = router.query;
  const [message, setMessage] = useState("");

  const handleDelete = async (id) => {
    const response = await fetch(`/api/movies/cast?id=${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return router.reload();
    }
    setMessage("Erro ao remover pessoa do elenco.");
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const bodyData = {};
    formData.forEach((value, key) => {
      if (value.trim().length > 0) {
        return (bodyData[key] = value);
      }
    });
    bodyData.idMovie = idMovie;

    const response = await fetch("/api/movies/cast", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    if (response.status === 200) {
      return router.reload();
    } else if (response.status === 409) {
      return setMessage("Pessoa já cadastrada no elenco.");
    }
    setMessage("Erro ao adicionar pessoa ao elenco.");
  };

  return (
    <form method="POST" onSubmit={handleCreate}>
      <Layout>
        <Stack spacing={4}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Text size="medium" color="primary">
              Cadastro de Elenco
            </Text>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" spacing={4}>
              <FormControl sx={{ minWidth: "200px" }}>
                <InputLabel id="select-cast" size="small">
                  Elenco
                </InputLabel>
                <Select
                  labelId="select-cast"
                  id="select-cast-id"
                  label="Elenco"
                  size="small"
                  name="idCastProfile"
                >
                  {listTypeCasts.map((cast, idx) => (
                    <MenuItem key={idx} value={cast.id}>
                      {cast.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="input"
                label="Nome"
                sx={{ minWidth: "300px" }}
                size="small"
                name="name"
              />
              <TextField
                type="input"
                label="Nome do Personagem"
                sx={{ minWidth: "300px" }}
                size="small"
                name="characterName"
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                type="input"
                label="Url da Foto"
                size="small"
                sx={{ minWidth: "700px" }}
                name="photo"
              />
              <Button type="submit" variant="contained" size="small">
                Adicionar
              </Button>
              {message.length > 0 && (
                <Text size="medium" color="primary">
                  {message}
                </Text>
              )}
            </Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Função no Elenco</TableCell>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="left">Nome do Personagem</TableCell>
                    <TableCell align="left">Foto</TableCell>
                    <TableCell align="left">Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {castInMovie.map((row) => (
                    <TableRow
                      key={row.name + row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.description}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.character_name}</TableCell>
                      <TableCell align="left">
                        {row.photo ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => window.open(row.photo)}
                          >
                            <Image
                              src={cameraImage.src}
                              width={16}
                              height={16}
                              alt="Ver foto"
                            />
                          </span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(row.id)}
                        >
                          <Image
                            src={deleteImage.src}
                            width={16}
                            height={16}
                            alt="Excluir Gênero"
                          />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Layout>
    </form>
  );
};

export default CreateCast;
