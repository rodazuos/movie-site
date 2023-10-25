import Stack from "@mui/material/Stack";
import Layout from "../../../shared/Layout";
import Text from "../../../shared/Text";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Switch from '@mui/material/Switch';
import { useState } from "react";
import { cpfIsvalid } from "../../../utils/isValid";

const Create = (props) => {
    const { user } = props;
    const [ userData, setUserData ] = useState(user);
    const router = useRouter();

    const [message, setMessage] = useState('');

    const { id } = router.query;
    const isNew = isNaN(parseInt(id));

    const handleUpsert = async (event) => {
        event.preventDefault();

        if (!cpfIsvalid(userData.cpf)) {
            return setMessage('CPF inválido!');
        }

        if (!userData.isActive) {
            return handleDeleteUser();
        }

        const form = event.target;
        const formData = new FormData(form);
        const bodyData = {};
        formData.forEach((value, key) => bodyData[key] = value);
        bodyData.active = userData.isActive;

        if (!isNew) {
            bodyData.id = id;
        }
        
        const response = await fetch('/api/user', {
            method: isNew ? 'POST' : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData),
        });
        if (response.status === 200) {
            if (isNew) {
                return router.push('/users');
            }
           return setMessage('Atualizado com sucesso.');
        } else if (response.status === 409) {
            return setMessage('Usuário já cadastrado.');
        }
        setMessage(`Erro ao ${isNew ? 'criar' : 'atualizar'} usuário.`)
    }

    const handleDeleteUser = async () => {
        const response = await fetch(`/api/user?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return router.push('/users');
        }
        setMessage('Erro ao inativar usuário.');
    }

    return <form method="POST" onSubmit={handleUpsert}>
        <Layout>
            <Stack spacing={4}>
                <Stack direction='row' alignItems="center" spacing={4}>
                    <Text size="medium" color="primary">Cadastro de Usuário</Text>
                    <Button type="submit" variant="contained">{isNew ? 'Salvar' : 'Atualizar'}</Button>
                    {message.length > 0 && <Text size="medium" color="primary">{message}</Text>}
                </Stack>
                <Stack spacing={2} sx={{ maxWidth: "500px"}}>
                    <TextField 
                        select 
                        SelectProps={{
                            native: true,
                        }} 
                        label='Tipo de Conta'
                        name="typeAccount"
                        sx={{ minWidth: '200px'}}
                        size="small"
                        value={userData.typeAccount}
                        onChange={event => setUserData({ ...userData, typeAccount: event.target.value }) }
                    >
                        <option key='1' value={1}>Administrador</option>
                        <option key='2' value={2}>Usuário</option>
                    </TextField>
                    <TextField 
                        type="input"
                        label="CPF"
                        name="cpf"
                        size="small"
                        value={userData.cpf}
                        onChange={event => setUserData({ ...userData, cpf: event.target.value }) }
                        inputProps={{
                            maxLength: 11,
                        }}
                        required
                    />
                    <TextField type="input" label='Nome' name="name" size="small" value={userData.name} onChange={event => setUserData({ ...userData, name: event.target.value }) } required />
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Text size="medium" color="primary">Ativo</Text>
                        <Switch
                            checked={userData.isActive}
                            onChange={event => setUserData({ ...userData, isActive: event.target.checked }) }
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Stack>
                </Stack>
            </Stack>

        </Layout>
    </form>
}

export default Create;