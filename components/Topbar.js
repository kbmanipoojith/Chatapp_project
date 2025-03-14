import { Flex, Heading, Avatar, IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

export default function Topbar({email}) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
      h="81px" w="100%"
      align="center"
      p={5}
      justify="space-between"
    >
      <Flex align="center">
        <Avatar src="" marginEnd={3} />
        <Heading size="lg" color={colorMode === "light" ? "gray.700" : "white"}>{email}</Heading>
      </Flex>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        aria-label="Toggle color mode"
        variant="ghost"
      />
    </Flex>
  );
}