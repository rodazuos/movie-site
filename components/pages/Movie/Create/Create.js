import Stack from "@mui/material/Stack";
import Layout from "../../../shared/Layout";
import Text from "../../../shared/Text";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import dayjs from "dayjs";
import Switch from '@mui/material/Switch';

const Create = (props) => {
    const { dataMovie } = props;
    const router = useRouter();

    const dateMovie = dayjs().set("year", dataMovie.releaseYear);
    const [movieData, setMovieData] = useState(dataMovie);
    const [year, setYear] = useState(dateMovie);
    const [message, setMessage] = useState('');

    const { id } = router.query;
    const isNew = isNaN(parseInt(id));

    const handleUpsert = async (event) => {
        event.preventDefault();

        if (!movieData.isActive) {
            return handleDeleteUser();
        }

        const form = event.target;
        const formData = new FormData(form);
        const bodyData = {};
        formData.forEach((value, key) => bodyData[key] = value);

        const body = {
            title: bodyData.title,
            originalTitle: bodyData.originalTitle,
            releaseYear: dayjs(year).format('YYYY'),
            ageGroup: bodyData.ageGroup,
            duration: `${bodyData.hours || 0} h ${bodyData.minutes} min`,
            description: bodyData.description,
            poster: bodyData.poster,
            active: movieData.isActive
        };

        if (!isNew) {
            body.id = id;
        }

        const response = await fetch('/api/movies', {
            method: isNew ? 'POST' : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        if (response.status === 200) {
            if (isNew) {
                return router.push('/movie');
            }
           return setMessage('Atualizado com sucesso.');
        } else if (response.status === 409) {
            return setMessage('Filme já cadastrado.');
        }
        setMessage(`Erro ao ${isNew ? 'criar' : 'atualizar'} filme.`)
    }

    const handleDeleteUser = async () => {
        const response = await fetch(`/api/movies?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return router.push('/movie');
        }
        setMessage('Erro ao inativar filme.');
    }

    return <form method="POST" onSubmit={handleUpsert}>
        <Layout>
            <Stack spacing={4}>
                <Stack direction='row' alignItems="center" spacing={4}>
                    <Text size="medium" color="primary">Cadastro de Filme</Text>
                    <Button type="submit" variant="contained">{isNew ? 'Salvar' : 'Atualizar'}</Button>
                    {message.length > 0 && <Text size="medium" color="primary">{message}</Text>}
                </Stack>
                <Stack spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TextField 
                            type="input"
                            label='Ttulo'
                            name="title"
                            size="small"
                            required 
                            value={movieData.title}
                            onChange={event => setMovieData({ ...movieData, title: event.target.value })}
                        />
                        <TextField 
                            type="input"
                            label='Ttulo Original'
                            name="originalTitle"
                            size="small"
                            value={movieData.originalTitle}
                            onChange={event => setMovieData({ ...movieData, originalTitle: event.target.value })}
                        />
                        <Stack direction="row" spacing={4}>
                            <DatePicker 
                                label={'Ano'} 
                                views={['year']} 
                                size="small"
                                value={year}
                                onChange={(newValue) => setYear(newValue)}
                                required
                            />
                            <TextField 
                                select 
                                SelectProps={{
                                    native: true,
                                }} 
                                label='Faixa Etária'
                                name="ageGroup"
                                sx={{ minWidth: '120px'}}
                                size="small"
                                required
                                value={movieData.ageGroup}
                                onChange={event => setMovieData({ ...movieData, ageGroup: event.target.value })}
                            >
                                {[...Array(18).keys()].map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </TextField>
                            <TextField 
                                type="input"
                                label='Horas de duração'
                                name="hours"
                                size="small"
                                required
                                value={movieData.hours}
                                onChange={event => setMovieData({ ...movieData, hours: event.target.value })}
                            />
                            <TextField
                                type="input"
                                label='Minutos de duração'
                                name="minutes"
                                size="small"
                                required
                                value={movieData.minutes}
                                onChange={event => setMovieData({ ...movieData, minutes: event.target.value })}
                            />
                        </Stack>
                        <TextField 
                            multiline
                            minRows={5}
                            maxRows={5}
                            type="input"
                            label='Descrição'
                            name="description"
                            required
                            value={movieData.description}
                            onChange={event => setMovieData({ ...movieData, description: event.target.value })}
                        />
                        <TextField
                            type="input"
                            label='Url do Poster'
                            name="poster"
                            size="small"
                            required
                            value={movieData.poster}
                            onChange={event => setMovieData({ ...movieData, poster: event.target.value })}
                        />
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Text size="medium" color="primary">Ativo</Text>
                            <Switch
                                checked={movieData.isActive}
                                onChange={event => setMovieData({ ...movieData, isActive: event.target.checked }) }
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Stack>
            </Stack>

        </Layout>
    </form>
}

export default Create;