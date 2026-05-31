import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const NotFoundPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Ksahlos - Page Not Found</title>
      </Helmet>

      <div>404 - Page Not Found</div>
    </>
  );
};

export default NotFoundPage;
