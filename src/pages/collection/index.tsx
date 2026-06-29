import type { FC } from "react";
import { Helmet } from "react-helmet-async";

import { CollectionView } from "@/features/collection/view";

const CollectionPage: FC = () => (
  <>
    <Helmet>
      <title>Ksahlos Photography - Collection</title>
    </Helmet>

    <CollectionView />
  </>
);

export default CollectionPage;
