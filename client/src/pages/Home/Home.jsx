import appAxios from "@/utils/AppAxios";
import { Tag } from "antd";
import React from "react";
import TagsHome from "./TagsHome";
import Container from "@/components/Container";
import { CardSkeleton } from "./Cards";
const Cards = React.lazy(() => import("./Cards"));

export default function Home() {
  const [tags, setTags] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  const { CheckableTag } = Tag;

  React.useEffect(() => {
    appAxios.get("/api/tag").then(({ data }) =>
      setTags(() => {
        const arrayTags = data.map((item) => item.name);
        return arrayTags;
      })
    );
  }, []);

  React.useEffect(() => {
    appAxios.get(`/api/product?tags=${selectedTags}`).then(({ data }) => setProducts(data.data));
  }, [selectedTags]);

  return (
    <Container>
      <h6 className="py-2 mt-4">Home</h6>
      <TagsHome CheckableTag={CheckableTag} selectedTags={selectedTags} handleChange={handleChange} tags={tags} />
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 mt-5">
        <React.Suspense fallback={<CardSkeleton />}>
          <Cards products={products} />
        </React.Suspense>
      </div>
    </Container>
  );
}
