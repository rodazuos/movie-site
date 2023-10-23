import styles from "../../../../styles/MainContent.module.css";

const MainContent = (props) => {
  const { children } = props;

  return <main className={styles.Main}>{children}</main>;
}

export default MainContent;