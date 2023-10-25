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

const Users = () => {
  const router = useRouter();

  const [data, setData] = useState({
    data: [],
    total: 0,
    page: 0,
  });

  const [searchName, setSearchName] = useState("");

  const handleChangePage = async (newPage) => {
    let page = 1;
    if (newPage) {
      page = newPage.page + 1;
    }

    let urlFetch = `/api/user/list?page=${page}`;
    if (searchName && searchName !== "") {
      urlFetch = urlFetch + `&name=${searchName}`;
    }

    const response = await fetch(urlFetch);
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    handleChangePage();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nome",
      width: 500,
      editable: false,
    },
    {
      field: "typeAccountDescription",
      headerName: "Tipo de Conta",
      width: 110,
      editable: false,
    },
    {
      field: "isActive",
      headerName: "Ativo",
      width: 110,
      editable: false,
      valueFormatter: (params) => (params.value === true ? "Sim" : "Não"),
    },
    {
      field: "edit",
      headerName: "Editar",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          router.push(`/users/${params.id}`);
        };
        return (
          <span style={{ cursor: "pointer" }}>
            <Image
              src={EditarImage.src}
              width={24}
              height={24}
              onClick={onClick}
              alt="Editar Usuário"
            />
          </span>
        );
      },
    },
  ];

  return (
    <Layout>
      <Stack spacing={2}>
        <Stack display="flex" direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={4} display="flex" alignItems="center">
            <Text size="medium" color="primary">
              Cadastro de Usuários
            </Text>
            <Button
              variant="contained"
              onClick={() => router.push("/users/new")}
            >
              Novo
            </Button>
          </Stack>
          <Stack direction="row" spacing={4} display="flex" alignItems="center">
            <TextField
              type="input"
              label="Busca por Nome"
              name="search-name-user"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => handleChangePage(null, true)}
            >
              Buscar
            </Button>
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
            paginationMode="server"
            pageSizeOptions={[10]}
            onPaginationModelChange={handleChangePage}
            disableColumnFilter
            disableColumnMenu
          />
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Users;
