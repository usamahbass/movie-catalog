import { useEffect, useState } from "react";
import {
  Box,
  GridItem,
  Grid,
  Heading,
  Text,
  MenuGroup,
  MenuItem,
  MenuList,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Check as CheckIcon } from "react-feather";
import { useLocation } from "react-router-dom";
import {
  addMoviesToFavorite,
  getMoreMovies,
  getMovies,
} from "~/redux/app/action";
import MovieCard from "~/components/card";
import Layout from "~/layouts/layout";
import InfiniteScroll from "react-infinite-scroll-component";
import FallbackCard from "~/components/fallback/_card";
import Head from "~/components/head";
import MovieSlug from "~/views/movie-slug";

const LoaderMovies = () => {
  return (
    <Box
      mt="5"
      gap="3rem"
      templateColumns="repeat(auto-fit, minmax(14rem, 1fr))"
      as={Grid}
    >
      {Array.from(new Array(12)).map(() => (
        <GridItem>
          <FallbackCard />
        </GridItem>
      ))}
    </Box>
  );
};

const HomePages = () => {
  const { search } = useLocation();
  const { loading, movies, favorite } = useSelector((state) => state.app);

  const toast = useToast();
  const [hasMore, setHasMore] = useState(false);

  const movieQueryParam = new URLSearchParams(search).get("movie");

  const fetchMoreArticle = async () => {
    if (movies?.results?.length === movies?.total_results) {
      setHasMore(false);
    }

    const newPage = movies?.page + 1;

    dispatch(getMoreMovies(newPage));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies(1));
  }, []);

  useEffect(() => {
    if (movies) {
      if (movies?.results.length !== movies?.total_results) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [movies]);

  if (movieQueryParam) {
    return <MovieSlug />;
  }

  return (
    <Layout>
      <Head title="Home" />
      <Box>
        <Heading
          textAlign="center"
          mb="10"
          fontWeight={700}
          letterSpacing=".5px"
        >
          New Movies
        </Heading>
        {loading ? (
          <LoaderMovies />
        ) : movies?.results?.length > 0 ? (
          <Box
            overflow="hidden !important"
            hasMore={hasMore}
            loader={<LoaderMovies />}
            dataLength={movies?.results?.length}
            next={fetchMoreArticle}
            as={InfiniteScroll}
          >
            <Grid
              gap="2rem"
              templateColumns="repeat(auto-fit, minmax(16rem, 1fr))"
            >
              {movies?.results?.map((movie) => (
                <GridItem>
                  <MovieCard {...movie}>
                    <MenuList>
                      <MenuGroup
                        letterSpacing=".5px"
                        title="Add to favorite category"
                      >
                        {favorite?.length > 0 ? (
                          favorite?.map((fav) => {
                            const disabledIsClick = favorite
                              .find((isFav) => isFav.id === fav.id)
                              .movies.some((elem) => elem.id === movie.id);

                            return (
                              <MenuItem
                                display="flex"
                                key={fav.name}
                                isDisabled={disabledIsClick}
                                justifyContent="space-between"
                                onClick={() => {
                                  dispatch(addMoviesToFavorite(fav, movie));
                                  toast({
                                    title:
                                      "Movie has been stored to favorite list !",
                                    status: "success",
                                    isClosable: true,
                                    position: "top",
                                  });
                                }}
                              >
                                <Text>{fav.name}</Text>

                                {disabledIsClick && (
                                  <Icon
                                    w={5}
                                    h={5}
                                    strokeWidth={3}
                                    color="success.700"
                                    as={CheckIcon}
                                  />
                                )}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <Box p="5" textAlign="center">
                            nothing list, please create favorite category list.
                          </Box>
                        )}
                      </MenuGroup>
                    </MenuList>
                  </MovieCard>
                </GridItem>
              ))}
            </Grid>
          </Box>
        ) : (
          <div>tidak ada data.</div>
        )}
      </Box>
    </Layout>
  );
};

export default HomePages;
