export type CollectionCategory = {
  title: string;
  image: string;
  slug: string;
};

export const collectionCategories: CollectionCategory[] = [
  {
    title: "Minimal",
    image: "/images/categories/minimal.jpg",
    slug: "minimal",
  },
  {
    title: "Contemporary",
    image: "/images/categories/contemporary.jpg",
    slug: "contemporary",
  },
  {
    title: "Black & White",
    image: "/images/categories/black-and-white.jpg",
    slug: "black-and-white",
  },
];
