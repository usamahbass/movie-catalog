import { Skeleton, Flex, Box } from "@chakra-ui/react";

const FallbackCard = () => {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        w="full"
        borderWidth="1px"
        rounded="lg"
        shadow="sm"
        h="365px"
        position="relative"
      >
        <Box>
          <Skeleton
            borderTopRadius="lg"
            w="full"
            h="250px"
            objectFit="cover"
          />
        </Box>

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Skeleton w="230px" h="20px">
              Venom: Let There Be Carnaged
            </Skeleton>
          </Flex>

          <Flex mt="3" justifyContent="space-between" alignContent="center">
            <Skeleton w="130px" h="15px">
              Venom: Let There Be Carnaged
            </Skeleton>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default FallbackCard;
