import Stack from "@mui/material/Stack";
import Layout from "../../shared/Layout";


const Home = (props) => {
    const { userData } = props;

    return <Layout userData={userData}>
        Buscar Filmers
    </Layout>
}

export default Home;