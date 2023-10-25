import Stack from "@mui/material/Stack";
import Layout from "../../../shared/Layout";
import Text from "../../../shared/Text";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
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
import { useState } from "react";

import deleteImage from "../../../../public/icons/delete.png";
import Image from "next/image";

const CreateGenre = (props) => {
  const { genresInMovie, listGenres } = props;
  const router = useRouter();
  const { idMovie } = router.query;
  const [message, setMessage] = useState("");

  const handleDeleteGenre = async (id) => {
    const response = await fetch(`/api/movies/genre?id=${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return router.reload();
    }
    setMessage("Erro ao deletar gênero.");
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const bodyData = {};
    formData.forEach((value, key) => (bodyData[key] = value));
    bodyData.idMovie = idMovie;

    const response = await fetch("/api/movies/genre", {
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
      return setMessage("Gênero já cadastrado.");
    }
    setMessage("Erro ao adicionar gênero.");
  };

  return (
    <form method="POST" onSubmit={handleCreate}>
      <Layout>
        <Stack spacing={4}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Text size="medium" color="primary">
              Vincular Gênero ao Filme
            </Text>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" spacing={4}>
              <FormControl sx={{ minWidth: "200px" }}>
                <InputLabel id="select-genre-label" size="small">
                  Gênero
                </InputLabel>
                <Select
                  labelId="select-genre"
                  id="select-genre-id"
                  label="Elenco"
                  size="small"
                  name="idGenre"
                >
                  {listGenres.map((genre, idx) => (
                    <MenuItem key={idx} value={genre.id}>
                      {genre.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained">
                Adicionar
              </Button>
              {message.length > 0 && (
                <Text size="medium" color="primary">
                  {message}
                </Text>
              )}
            </Stack>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#e6ddff" }}>
                    <TableCell sx={{ fontWeight: 600 }}>Gênero</TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600 }}>
                      Excluir
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {genresInMovie.map((row) => (
                    <TableRow
                      key={row.description}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.description}
                      </TableCell>
                      <TableCell align="left">
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteGenre(row.id)}
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

export default CreateGenre;
