import { useLocation } from "react-router-dom";
import { useRequest } from "~/hooks/useRequest";
import Layout from "~/layouts/layout";

const MovieSlug = () => {
  const { search } = useLocation();

  const movieID = new URLSearchParams(search).get("movie");

  const { data } = useRequest(`/3/discover/movie/${movieID}`, {}, movieID);

  console.log(data, "HERE");

  return <Layout>hello</Layout>;
};

export default MovieSlug;
