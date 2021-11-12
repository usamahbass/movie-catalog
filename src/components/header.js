import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  IconButton,
  Container,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { Heart as WhiteListIcon, Film as Filmicon } from "react-feather";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const colorIcon = useColorModeValue("black", "#D1221F");

  return (
    <Box component="header" bg={useColorModeValue("white", "gray.900")}>
      <Container maxW="6xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link to="/">
            <Icon fontSize="2xl" as={Filmicon} />
          </Link>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <Link to="/favorite">
                <Tooltip placement="bottom" label="Favorit" hasArrow>
                  <IconButton
                    bg="transparent"
                    icon={
                      <WhiteListIcon
                        color={pathname === "/favorite" ? "#D1221F" : colorIcon}
                        fill={
                          pathname === "/favorite" ? "#D1221F" : "transparent"
                        }
                      />
                    }
                  />
                </Tooltip>
              </Link>
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
