import { LoginView } from "@/features/login/view";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const LoginPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Ksahlos Photography - Login</title>
        <meta name="description" content="Ksahlos Photography - Login" />
      </Helmet>

      <LoginView />
    </>
  );
};
export default LoginPage;
