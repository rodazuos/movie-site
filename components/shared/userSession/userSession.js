import { useContext } from "react";
import SessionContext from "../SessionContext";

const useUserSession = () => useContext(SessionContext);

export default useUserSession;
