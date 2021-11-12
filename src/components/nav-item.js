import { Flex, useColorModeValue, Badge, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const NavItem = ({ children, icon, active, onClickIcon, count, ...rest }) => {
  const colorNav = useColorModeValue("#000", "gray.400");
  const hoverBg = useColorModeValue("gray.100", "gray.900");
  const hoverColor = useColorModeValue("gray.900", "gray.200");
  const borderColor = useColorModeValue("#1176BC", "#03225A");

  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      w="full"
      cursor="pointer"
      borderRightRadius="md"
      bg="transparent"
      color={colorNav}
      borderLeft={active ? `3px solid ${borderColor}` : "none"}
      _hover={{
        bg: hoverBg,
        color: hoverColor,
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      <Text letterSpacing=".5px" fontWeight={600}>
        {children}
        <Badge position="relative" bottom="10px" left="5px">
          {count}
        </Badge>
      </Text>
    </Flex>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  icon: PropTypes.node,
  count: PropTypes.number,
};

export default NavItem;
