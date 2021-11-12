import {
  Box,
  Flex,
  Image,
  IconButton,
  Menu,
  MenuButton,
  Tooltip,
} from "@chakra-ui/react";
import { Heart as HeartIcon, X as CloseIcon } from "react-feather";
import { createImageURL } from "~/utils/helper";
import PropTypes from "prop-types";
import Rating from "./rating";

const MovieCard = ({
  children,
  title,
  vote_count,
  vote_average,
  poster_path,
  isFavorite,
  handleRemoveMovie,
}) => {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        w="full"
        borderWidth="1px"
        rounded="lg"
        shadow="sm"
        position="relative"
      >
        <Box>
          <Image
            alt={title}
            w="full"
            h="250px"
            roundedTop="lg"
            fallbackSrc="https://via.placeholder.com/300"
            objectFit="cover"
            src={createImageURL(poster_path)}
          />

          {isFavorite ? (
            <Tooltip placement="right" label="Remove from favorite" hasArrow>
              <IconButton
                position="absolute"
                top="0"
                right="0"
                variant="solid"
                colorScheme="danger"
                margin=".1rem"
                onClick={handleRemoveMovie}
                icon={<CloseIcon />}
              />
            </Tooltip>
          ) : (
            <Menu placement="left-start">
              <MenuButton
                as={IconButton}
                position="absolute"
                top="0"
                right="0"
                variant="solid"
                colorScheme="danger"
                margin=".1rem"
                icon={<HeartIcon />}
              />
              {children}
            </Menu>
          )}
        </Box>

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="md"
              as="h4"
              lineHeight="tight"
              textAlign="center"
              isTruncated
              w="230px"
            >
              {title}
            </Box>
          </Flex>

          <Flex mt="3" justifyContent="space-between" alignContent="center">
            <Rating numReviews={vote_count} rating={vote_average} />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

MovieCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  vote_count: PropTypes.number,
  vote_average: PropTypes.number,
  poster_path: PropTypes.string,
  isFavorite: PropTypes.bool,
  handleRemoveMovie: PropTypes.func,
};

export default MovieCard;
