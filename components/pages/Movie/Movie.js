import Stack from "@mui/material/Stack";
import Layout from "../../shared/Layout";
import Text from "../../shared/Text";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";

import Image from "next/image";
import EditarImage from "../../../public/icons/editar.png";
import CastImage from "../../../public/icons/cast.png";
import GenreImage from "../../../public/icons/genre.png";

const Movie = (props) => {
    const { userData } = props;
    const router = useRouter();

    const [data,setData] = useState({
        data: [],
        total: 0,
        page: 0
    })

    const [searchTitle, setSearchTitle] = useState('');

    const handleChangePage = async (newPage, search = false) => {
        let page = 1;
        if (newPage) {
            page = newPage.page + 1;
        }

        let urlFetch = `/api/movies/list?page=${page}`;
        if (search && searchTitle !== '') {
            urlFetch = urlFetch + `&title=${searchTitle}`;
        }

        const response = await fetch(urlFetch);
        const result = await response.json();
        setData(result)
    };
    
    useEffect(() => {
        handleChangePage();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'title',
          headerName: 'Titulo',
          width: 500,
          editable: false,
        },
        {
          field: 'averageVote',
          headerName: 'Nota',
          width: 110,
          editable: false,
        },
        {
            field: 'isActive',
            headerName: 'Ativo',
            width: 110,
            editable: false,
            valueFormatter: (params) => params.value === true ? 'Sim' : 'Não',
        },
        {
            field: 'edit',
            headerName: 'Editar',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    router.push(`/movie/${params.id}`);
                }
                return <span style={{ cursor: 'pointer' }}>
                        <Image src={EditarImage.src} width={24} height={24} onClick={onClick} alt="Editar Filme" />
                    </span>;
            }
        },
        {
            field: 'genre',
            headerName: 'Gêneros',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    router.push(`/movie/genre/${params.id}`);
                }
                return <span style={{ cursor: 'pointer' }}>
                        <Image src={GenreImage.src} width={24} height={24} onClick={onClick} alt="Adicionar Gênero" />
                    </span>;
            }
        },
        {
            field: 'cast',
            headerName: 'Elenco',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    router.push(`/movie/cast/${params.id}`);
                }
                return <span style={{ cursor: 'pointer' }}>
                        <Image src={CastImage.src} width={24} height={24} onClick={onClick} alt="Gerenciar Elenco" />
                    </span>;
            }
        }
    ];

    return <Layout userData={userData}>
        <Stack spacing={2}>
            <Stack display='flex' direction='row' justifyContent='space-between'>
                <Stack direction="row" spacing={4} display="flex" alignItems="center">
                    <Text size="medium" color="primary">Cadastro de Filmes</Text>
                    <Button variant="contained" onClick={() => router.push('/movie/new')}>Novo</Button>
                </Stack>
                <Stack direction="row" spacing={4} display="flex" alignItems="center">
                    <TextField type="input" label='Busca por Título' name="search-title-movie" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                    <Button variant="contained" onClick={() => handleChangePage(null, true)}>Buscar</Button>
                </Stack>
            </Stack>
            <Stack>
                <DataGrid
                    rows={data.data}
                    rowCount={data.total}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: data.page,
                                pageSize: 10,
                            },
                        },
                    }}
                    paginationMode='server'
                    pageSizeOptions={[10]}
                    onPaginationModelChange={handleChangePage}
                    disableColumnFilter
                    disableColumnMenu
                />
            </Stack>
        </Stack>
    </Layout>
}

export default Movie;