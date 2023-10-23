import Stack from "@mui/material/Stack";
import Layout from "../../shared/Layout";

import MoviesImage from "../../../public/movies.png";
import Image from "next/image";

const Home = (props) => {
    const { userData } = props;

    return <Layout userData={userData}>
        <Stack display='flex' alignItems='center' justifyContent='center' height='100%'>
            <Stack maxWidth='400px' maxHeight='300px'>
                <Image src={MoviesImage.src} width={400} height={300}  alt="Filmes" />
            </Stack>
        </Stack>
    </Layout>
}

export default Home;