import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const PhotosPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Ksahlos Photography - Photos</title>
        <meta name="description" content="Ksahlos Photography - Photos" />
      </Helmet>

      <div>Photos</div>
    </>
  );
};

export default PhotosPage;
