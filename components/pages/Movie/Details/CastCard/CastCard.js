/* eslint-disable @next/next/no-img-element */
import Paper from "@mui/material/Paper";
import Text from "../../../../shared/Text";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

const CardMovie = (props) => {
  const { cast } = props;

  return (
    <Paper elevation={3} sx={{ padding: "8px", width: "400px" }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          alt="Foto Perfil"
          src={cast.photo}
          sx={{
            width: 64,
            height: 64,
          }}
        />
        <Stack>
          <Text weight="bold">{cast.description}</Text>
          <Text>{cast.name}</Text>
        </Stack>
        <Stack>
          <Text weight="bold">Personagem</Text>
          <Text>{cast.characterName || "-"}</Text>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CardMovie;
