import Stack from "@mui/material/Stack";
import Layout from "../../shared/Layout";
import Text from "../../shared/Text";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import getConfig from 'next/config';

const Profile = (props) => {
    const { userData } = props;
    const [userProfile, setUserProfile] = useState(userData);

    const [message, setMessage] = useState('');

    const handleUpdateProfile = async (event) => {
        setMessage('');
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const bodyData = {};
        formData.forEach((value, key) => bodyData[key] = value);
        bodyData.id = userProfile.id;
        const response = await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData),
        });
        if (response.status === 200) {
           return setMessage('Atualizado com sucesso.');
        }
        setMessage('Erro ao atualizar perfil.')
    }
        

    return <Layout>
        <form type="submit" onSubmit={handleUpdateProfile}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={4} display="flex" alignItems="center">
                    <Text size="medium" color="primary">Meu Perfil</Text>
                    <Button type="submit" variant="contained" >Atualizar</Button>
                    {message.length > 0 && <Text size="medium" color="primary">{message}</Text>}
                </Stack>

                <TextField type="input" label='Tipo de Perfil' value={userProfile.typeAccountDescription} />
                <TextField type="input" label='CPF' value={userProfile.cpf} />
                <TextField type="input" label='Nome' value={userProfile.name} name='name' onChange={(event) => setUserProfile({...userProfile, name: event.target.value})} />
            </Stack>
        </form>
    </Layout>
}

export default Profile;