import appAxios from "@/utils/AppAxios";
import { Pagination, Tag } from "antd";
import React from "react";
import TagsHome from "./TagsHome";
import Container from "@/components/Container";
import { CardSkeleton } from "./Cards";
import { useSelector } from "react-redux";
const Cards = React.lazy(() => import("./Cards"));

export default function Home() {
  const [tags, setTags] = React.useState([]);
  const query = useSelector((state) => state.query);
  const [products, setProducts] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };
  const { CheckableTag } = Tag;

  React.useEffect(() => {
    setLoading(true);
  }, [query, selectedTags, currentPage]);

  React.useEffect(() => {
    appAxios.get("/api/tag").then(({ data }) =>
      setTags(() => {
        const arrayTags = data.map((item) => item.name);
        return arrayTags;
      })
    );
  }, []);

  React.useEffect(() => {
    appAxios
      .get(`/api/product?tags=${selectedTags}&category=${query.categories}&q=${query.q}&skip=${(currentPage - 1) * 10}`)
      .then(({ data }) => {
        setProducts(data.count === 0 ? null : data.data);
        setTotalPage(data.count);
        if (data.count <= 10) {
          setCurrentPage(1);
        }
        setLoading(false);
      });
  }, [selectedTags, query, currentPage]);

  return (
    <Container>
      <h6 className="py-2 mt-4">Home</h6>
      <TagsHome CheckableTag={CheckableTag} selectedTags={selectedTags} handleChange={handleChange} tags={tags} />
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 mt-5">
        <React.Suspense fallback={<CardSkeleton />}>
          <Cards products={products} loading={loading} />
        </React.Suspense>
      </div>
      {products !== null && (
        <Pagination
          className="mt-5"
          current={currentPage}
          total={totalPage}
          defaultPageSize={10}
          onChange={(value) => setCurrentPage(value)}
        />
      )}
    </Container>
  );
}
