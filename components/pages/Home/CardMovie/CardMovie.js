/* eslint-disable @next/next/no-img-element */
import Paper from "@mui/material/Paper";
import Text from "../../../shared/Text";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";

const CardMovie = (props) => {
  const { dataMovie } = props;
  const router = useRouter();

  const handleOpenDetails = (id) => {
    router.push(`/movie/details/${id}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: "8px", minWidth: "250px", maxWidth: "250px" }}
    >
      <Stack spacing={2} alignItems="center">
        <Stack sx={{ minHeight: "40px" }}>
          <Text size="medium" color="primary" align="center">
            {dataMovie.title}{" "}
          </Text>
        </Stack>
        <img
          src={dataMovie.poster}
          alt={dataMovie.title}
          width={180}
          height={250}
        />
        <Rating
          name="average-vote-movie"
          value={dataMovie.averageVote}
          max={4}
          readOnly
          precision={0.5}
        />
        <Button onClick={() => handleOpenDetails(dataMovie.id)}>
          Detalhes
        </Button>
      </Stack>
    </Paper>
  );
};

export default CardMovie;
