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
import { Edit, PlusCircle, Trash } from "react-feather";
import { Row, Col } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  addFavorite,
  editFavorite,
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
import { METHOD_TYPE } from "~/utils/constants";

const FavoritePages = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { favorite, isFavorite } = useSelector((state) => state.app);

  const [methodType, setMethodType] = useState("create");

  const {
    register,
    handleSubmit,
    setValue,
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
  }, [dispatch]);

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
          {/* FAV LIST LEFT */}
          <Col sm={12} md={4}>
            <Button
              mb="10"
              leftIcon={<PlusCircle size="1.2rem" />}
              colorScheme="primary"
              onClick={() => {
                onOpenAdd();
                setMethodType("create");
              }}
            >
              Add Favorite Category
            </Button>
            {favorite?.length > 0 ? (
              favorite?.map((fav) => (
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
                    mr="2"
                    size="sm"
                    variant="ghost"
                    colorScheme="warning"
                    icon={<Edit />}
                    onClick={() => {
                      onOpenAdd();
                      setDataPick(fav);
                      setValue("name", fav.name);
                      setMethodType(METHOD_TYPE.EDIT);
                    }}
                  />

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
              ))
            ) : (
              <Box w="70%">
                nothing favorite category list here, please add favorite
                category...
              </Box>
            )}
          </Col>

          {/* FAVORITE CLICK LIST */}

          <Col sm={12} md={8}>
            {isFavorite ? (
              isFavorite?.movies?.length > 0 ? (
                <Box mt="5" as={Row}>
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
                </Box>
              ) : (
                <Box
                  w="full"
                  mt="20"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  letterSpacing=".5px"
                >
                  there is no movie here, please add movie to favorite category{" "}
                  {isFavorite?.name}...
                </Box>
              )
            ) : null}
          </Col>
        </Row>

        <CustomAlertDialog
          isOpen={isOpenDeleteMoviesFromFav}
          onClose={onCloseDeleteMoviesFromFav}
          title={`Delete Movie from Category ${isFavorite?.name} ?`}
          leftButton="Cancel"
          colorSchemeLeftButton="info"
          rightButton="Delete"
          colorSchemeRightButton="danger"
          handleAction={() => {
            dispatch(removeMoviesFromFavorite(dataPick));
            toast({
              title: "Movie has been removed from category !",
              status: "success",
              position: "top",
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
          title="Delete Favorite Category ?"
          leftButton="Cancel"
          colorSchemeLeftButton="info"
          rightButton="Delete"
          colorSchemeRightButton="danger"
          handleAction={() => {
            dispatch(removeFavorite(dataPick));
            toast({
              title: "Favorite Category has been removed !",
              status: "success",
              position: "top",
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
          leftButton="Cancel"
          colorSchemeLeftButton="danger"
          rightButton={methodType === METHOD_TYPE.CREATE ? "Add" : "Edit"}
          colorSchemeRightButton="primary"
          title={
            methodType === METHOD_TYPE.CREATE
              ? "Add Favorite Category"
              : "Edit Favorite Category"
          }
          onClose={() => {
            setValue("name", "");
            onCloseAdd();
          }}
          handleAction={handleSubmit((values) => {
            if (methodType === METHOD_TYPE.CREATE) {
              const datas = { ...values, movies: [] };
              dispatch(addFavorite(datas));
              toast({
                title: "Favorite category has been added !",
                status: "success",
                position: "top",
                isClosable: true,
              });
              setValue("name", "");
              onCloseAdd();
            } else {
              dispatch(
                editFavorite({
                  ...dataPick,
                  name: values.name,
                })
              );
              toast({
                title: "Favorite category has been edited !",
                status: "success",
                position: "top",
                isClosable: true,
              });
              setValue("name", "");
              onCloseAdd();
            }
          })}
        >
          <FormControl isInvalid={errors?.name}>
            <InputGroup>
              <Input
                autoComplete="off"
                defaultValue={dataPick?.name}
                placeholder="Favorite Category List Name"
                {...register("name", { required: true })}
              />
              <InputRightElement>
                {errors?.name && <WarningIcon />}
              </InputRightElement>
            </InputGroup>

            {errors?.name && (
              <FormErrorMessage fontSize="sm">
                Enter favorite category name
              </FormErrorMessage>
            )}
          </FormControl>
        </CustomAlertDialog>
      </Box>
    </Layout>
  );
};

export default FavoritePages;
