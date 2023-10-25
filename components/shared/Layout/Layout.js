import Navbar from "../Navbar";
import MainContent from "./MainContent";
import styles from "../../../styles/Layout.module.css";

const Layout = (props) => {
  const { children } = props;

  return (
    <layout className={styles.Layout}>
      <Navbar />
      <MainContent>{children}</MainContent>
    </layout>
  );
};

export default Layout;
