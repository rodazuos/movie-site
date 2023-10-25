/* eslint-disable @next/next/no-img-element */
import Stack from "@mui/material/Stack";
import Layout from "../../../shared/Layout";
import Text from "../../../shared/Text";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import CardMovie from "./CastCard";
import { useState } from "react";
import userSession from "../../../shared/userSession";
import { useRouter } from "next/router";

const Details = (props) => {
  const { dataMovie } = props;
  const { typeAccount } = userSession();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [value, setValue] = useState(dataMovie.userVote);

  const handleVoteMovie = async (vote) => {
    const body = {
      id: dataMovie.id,
      vote,
    };
    const response = await fetch("/api/movies/vote", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      setValue(vote);
      return router.reload();
    }
    setMessage("Erro ao votar no filme.");
  };

  return (
    <Layout>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Stack>
            <img
              src={dataMovie.poster}
              width={400}
              height={500}
              alt={dataMovie.title}
            />
          </Stack>
          <Stack spacing={2}>
            <Stack>
              <Text size="large" color="primary">
                {dataMovie.title}
              </Text>
              <Text>
                <span>Título Original: </span>
                {dataMovie.originalTitle}
              </Text>
            </Stack>
            <Stack direction="row" spacing={1}>
              {dataMovie.genres.map((genre) => (
                <Chip key={genre.description} label={genre.description} />
              ))}
            </Stack>
            <Stack>
              <Stack direction="row" spacing={1}>
                <Text weight="bold"> Ano de lançamento: </Text>
                <Text> {dataMovie.releaseYear} </Text>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Text weight="bold"> Faixa etária: </Text>
                <Text> {dataMovie.ageGroup} </Text>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Text weight="bold"> Duração: </Text>
                <Text> {dataMovie.duration} </Text>
              </Stack>
            </Stack>
            <Stack>
              <Text weight="bold"> Descrição </Text>
              <Text> {dataMovie.description}</Text>
            </Stack>
            <Stack
              border={1}
              padding={2}
              borderColor="#1976d2"
              borderRadius={1}
              maxWidth="fit-content"
            >
              <Text size="large" color="primary">
                Nota / Média Geral
              </Text>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Text size="extralarge" color="secondary">
                  {" "}
                  {dataMovie.averageVote.toFixed(1)}{" "}
                </Text>
                <Rating
                  name="average-vote-movie"
                  value={dataMovie.averageVote}
                  max={4}
                  readOnly
                  precision={0.5}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack>
                <Text color="primary" size="large">
                  Sua nota
                </Text>
                <Rating
                  name="vote-movie"
                  value={value}
                  onChange={(event, newValue) => {
                    handleVoteMovie(newValue);
                  }}
                  max={4}
                  readOnly={typeAccount == 1 ? true : false}
                />
              </Stack>
              {message.length > 0 && (
                <Text size="medium" color="primary">
                  {message}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} sx={{ flexFlow: "row wrap" }}>
          {dataMovie.cast.map((cast) => (
            <CardMovie key={cast.id + cast.name} cast={cast} />
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Details;
