import {
  Button,
  IconButton,
  Box,
  Flex,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PlusCircle, Trash } from "react-feather";
import { Row, Col } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  addFavorite,
  removeFavorite,
  removeMoviesFromFavorite,
  setIsFavorite,
} from "~/redux/app/action";
import Head from "~/components/head";
import NavItem from "~/components/nav-item";
import Layout from "~/layouts/layout";
import CustomAlertDialog from "~/components/custom-alert-dialog";
import WarningIcon from "~/icons/warning";
import MovieCard from "~/components/card";

const FavoritePages = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { favorite, isFavorite } = useSelector((state) => state.app);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm();

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteMoviesFromFav,
    onOpen: onOpenDeleteMoviesFromFav,
    onClose: onCloseDeleteMoviesFromFav,
  } = useDisclosure();

  const [dataPick, setDataPick] = useState(null);

  useEffect(() => {
    if (favorite?.length) {
      dispatch(setIsFavorite(favorite[0]));
    }
  }, []);

  return (
    <Layout>
      <Box>
        <Head title="Favorite" />

        <Heading
          textAlign="center"
          mb="10"
          fontWeight={700}
          letterSpacing=".5px"
        >
          Favorite Movies
        </Heading>

        <Row>
          <Col sm={12} md={4}>
            <Button
              mb="10"
              leftIcon={<PlusCircle size="1.2rem" />}
              colorScheme="primary"
              onClick={onOpenAdd}
            >
              Add Favorite List
            </Button>
            {favorite?.map((fav) => (
              <Flex
                mb="3"
                key={fav.name}
                alignItems="center"
                justifyContent="space-between"
              >
                <NavItem
                  count={fav?.movies?.length}
                  onClick={() => dispatch(setIsFavorite(fav))}
                  active={JSON.stringify(fav) === JSON.stringify(isFavorite)}
                >
                  {fav.name}
                </NavItem>
                <IconButton
                  size="sm"
                  variant="ghost"
                  colorScheme="danger"
                  icon={<Trash />}
                  onClick={() => {
                    onOpenDelete();
                    setDataPick(fav);
                  }}
                />
              </Flex>
            ))}
          </Col>

          <Col sm={12} md={8}>
            {isFavorite ? (
              isFavorite?.movies?.length > 0 ? (
                <Row>
                  {isFavorite?.movies?.map((isFav) => (
                    <Box mb="5" sm={12} md={4} as={Col}>
                      <MovieCard
                        {...isFav}
                        isFavorite
                        handleRemoveMovie={() => {
                          onOpenDeleteMoviesFromFav();
                          setDataPick(isFav);
                        }}
                      />
                    </Box>
                  ))}
                </Row>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w="full"
                  letterSpacing=".5px"
                >
                  Tidak ada data disini !
                </Box>
              )
            ) : null}
          </Col>
        </Row>

        <CustomAlertDialog
          isOpen={isOpenDeleteMoviesFromFav}
          onClose={onCloseDeleteMoviesFromFav}
          title="Delete Movie from Favorite ?"
          leftButton="Cancel"
          colorSchemeLeftButton="info"
          rightButton="Delete"
          colorSchemeRightButton="danger"
          handleAction={() => {
            dispatch(removeMoviesFromFavorite(isFavorite, dataPick));
            toast({
              title: "Movie has been removed from favorite list !",
              status: "success",
              isClosable: true,
            });
            onCloseDeleteMoviesFromFav();
          }}
        >
          Are you sure? You can't undo this action afterwards.
        </CustomAlertDialog>

        {/* REMOVE MOVIE LIST FAV */}

        <CustomAlertDialog
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          title="Delete Movie List ?"
          leftButton="Cancel"
          colorSchemeLeftButton="info"
          rightButton="Delete"
          colorSchemeRightButton="danger"
          handleAction={() => {
            dispatch(removeFavorite(dataPick));
            toast({
              title: "Movie List has been removed !",
              status: "success",
              isClosable: true,
            });
            onCloseDelete();
          }}
        >
          Are you sure? You can't undo this action afterwards.
        </CustomAlertDialog>

        {/* ADD MOVIE LIST FAV */}

        <CustomAlertDialog
          isOpen={isOpenAdd}
          title="Add Movie List"
          leftButton="Cancel"
          colorSchemeLeftButton="danger"
          rightButton="Add"
          colorSchemeRightButton="primary"
          onClose={() => {
            onCloseAdd();
            resetForm();
          }}
          handleAction={handleSubmit((values) => {
            const datas = { ...values, movies: [] };
            dispatch(addFavorite(datas));
            toast({
              title: "Movie List has been added !",
              status: "success",
              isClosable: true,
            });
            resetForm();
            onCloseAdd();
          })}
        >
          <FormControl isInvalid={errors?.name}>
            <InputGroup>
              <Input
                placeholder="Movie List Name"
                {...register("name", { required: true })}
              />
              <InputRightElement>
                {errors?.name && <WarningIcon />}
              </InputRightElement>
            </InputGroup>

            {errors?.name && (
              <FormErrorMessage fontSize="sm">
                Enter movie list name
              </FormErrorMessage>
            )}
          </FormControl>
        </CustomAlertDialog>
      </Box>
    </Layout>
  );
};

export default FavoritePages;
