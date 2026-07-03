import { HomeView } from "@/features/home/view";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const Homepage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Ksahlos Photography - Home</title>
        <meta name="description" content="Ksahlos Photography - Home" />ß
      </Helmet>

    <HomeView/>
    </>
  );
};
export default Homepage;
