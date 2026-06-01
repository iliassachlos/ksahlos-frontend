import { NotFoundView } from "@/features/404/views";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const NotFoundPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Ksahlos - Page Not Found</title>
        <meta name="description" content="Ksahlos - Page Not Found" />
      </Helmet>

      <NotFoundView />
    </>
  );
};

export default NotFoundPage;
