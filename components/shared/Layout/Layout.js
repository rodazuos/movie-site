import Navbar from "../Navbar";
import MainContent from "./MainContent";
import styles from "../../../styles/Layout.module.css";
import SessionContext from "../SessionContext";

const Layout = (props) => {
  const { children, userData } = props;

  return (
    <layout className={styles.Layout}>
      <SessionContext.Provider value={userData}>
        <Navbar />
        <MainContent>{children}</MainContent>
      </SessionContext.Provider>
    </layout>
  );
};

export default Layout;
