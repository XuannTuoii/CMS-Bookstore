import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginContainer from "../containers/loginContainer";
import { useStore } from "../store";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { isLoggedIn } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return <LoginContainer />;
};
export default LoginPage;
