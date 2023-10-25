import Stack from "@mui/material/Stack";
import Layout from "../../shared/Layout";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Text from "../../shared/Text";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "./CardMovie";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

const ENUM_SEARCH_TYPE = {
  director: "Diretor",
  actor: "Ator",
  title: "Titulo do Filme",
  genre: "Gênero",
};

const Home = (props) => {
  const { listMovies } = props;

  const [showcaseMovies, setShowcaseMovies] = useState(listMovies);
  const [searchFilters, setSearchFilters] = useState([]);

  const handleDelete = (searchType) => {
    const newArray = searchFilters.filter(
      (filter) => filter.searchType !== searchType
    );
    setSearchFilters(newArray);
  };

  const handleAddFilter = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const filter = {};
    formData.forEach((value, key) => {
      filter[key] = value;
    });

    filter.searchFilter = `${ENUM_SEARCH_TYPE[filter.searchType]}:${
      filter.searchFilter
    }`;

    const removeEqualFilter = searchFilters.filter(
      (sFilter) => sFilter.searchType !== filter.searchType
    );
    const newArray = Array.from(removeEqualFilter);
    newArray.push(filter);
    setSearchFilters(newArray);
  };

  const handleSearchMovies = async () => {
    let urlFetch = `/api/movies/list`;
    if (searchFilters.length > 0) {
      urlFetch = urlFetch + "?";

      searchFilters.forEach((filters) => {
        urlFetch =
          urlFetch +
          `&${filters.searchType}=${filters.searchFilter.split(":")[1]}`;
      });
    }

    const response = await fetch(urlFetch);
    const result = await response.json();
    setShowcaseMovies(result);
  };

  return (
    <form method="POST" onSubmit={handleAddFilter}>
      <Layout>
        <Stack spacing={2}>
          <Text size="large" color="primary">
            Vitrine de filmes
          </Text>
          <Stack
            direction="row"
            border={1}
            borderColor="#c5c5c5"
            padding={2}
            borderRadius={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={4}>
              <FormControl>
                <FormLabel id="search-type-label">Tipo de Pesquisa</FormLabel>
                <RadioGroup row name="searchType">
                  <FormControlLabel
                    value="director"
                    control={<Radio />}
                    label="Diretor"
                  />
                  <FormControlLabel
                    value="actor"
                    control={<Radio />}
                    label="Ator"
                  />
                  <FormControlLabel
                    value="title"
                    control={<Radio />}
                    label="Título do filme"
                  />
                  <FormControlLabel
                    value="genre"
                    control={<Radio />}
                    label="Gênero"
                  />
                </RadioGroup>
              </FormControl>

              <Stack direction="row" alignItems="center">
                <TextField
                  type="input"
                  label="Busca..."
                  size="small"
                  name="searchFilter"
                  required
                  sx={{ minWidth: "300px" }}
                />
                <Button type="submit" variant="contained" color="secondary">
                  Adicionar
                </Button>
              </Stack>

              <Stack direction="row" gap={2} sx={{ flexFlow: "row wrap" }}>
                {searchFilters.map((filter) => (
                  <Chip
                    key={filter.searchType}
                    label={filter.searchFilter}
                    variant="outlined"
                    onDelete={() => handleDelete(filter.searchType)}
                  />
                ))}
              </Stack>
            </Stack>
            <Button variant="contained" onClick={handleSearchMovies}>
              Buscar
            </Button>
          </Stack>
          <Stack
            display="flex"
            direction="row"
            gap={2}
            sx={{ flexFlow: "row wrap" }}
          >
            {showcaseMovies.data.map((movie) => (
              <Card key={movie.title} dataMovie={movie} />
            ))}
          </Stack>
        </Stack>
      </Layout>
    </form>
  );
};

export default Home;
