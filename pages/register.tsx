import { useRouter } from "next/router";
import { useEffect } from "react";
import RegisterContainer from "../containers/registerContainer";
import { useStore } from "../store";

const RegisterPage = () => {
  const { isLoggedIn, user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role === "admin") {
        router.push("/");
      } else if (user.role === "client") {
        router.push("/client");
      }
    }
  }, [isLoggedIn]);

  return <RegisterContainer />;
};
export default RegisterPage;
