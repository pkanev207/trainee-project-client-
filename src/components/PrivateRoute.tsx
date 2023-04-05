import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/auth-slice";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children }: { children: any }) => {
  const { token } = useSelector(selectAuth);
  return token ? children : <LoadingToRedirect />;
};

export default PrivateRoute;
