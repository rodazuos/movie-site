import Stack from "@mui/material/Stack";
import Layout from "../../shared/Layout";


const Home = (props) => {
    const { userData } = props;

    return <Layout userData={userData}>
        Cadastrar Filmes
    </Layout>
}

export default Home;