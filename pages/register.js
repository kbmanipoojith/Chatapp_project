import Head from "next/head";
import { useState } from "react";
import { ChatIcon, ViewIcon, ViewOffIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack, Input, InputGroup, InputRightElement, Text, Flex, useColorMode, IconButton } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setErrorMessage("All fields are required");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: username
        });
        
        // Store user data in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username,
          email,
          createdAt: new Date().toISOString(),
          photoURL: userCredential.user.photoURL || "",
        });
        
        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const message = error.code === "auth/email-already-in-use" 
        ? "Email already in use" 
        : error.code === "auth/weak-password"
        ? "Password should be at least 6 characters"
        : "Registration failed";
      setErrorMessage(message);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const goToLogin = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <Center h="100vh" position="relative" bgGradient={colorMode === "light" ? "linear(to-br, blue.50, purple.50)" : "linear(to-br, gray.900, purple.900)"}>
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          position="absolute"
          top="4"
          right="4"
          aria-label="Toggle color mode"
        />

        <Stack
          align="center"
          align="center"
          bgColor={colorMode === "light" ? "blue.50" : "gray.700"}
          p={8}
          rounded="xl"
          spacing={6}
          boxShadow="xl"
          width="350px"
          className="holographic-card"
          border="1px"
          borderColor={colorMode === "light" ? "blue.500" : "gray.600"}
        >
          <Box
            bgGradient="linear(to-r, blue.400, purple.500)"
            w="fit-content"
            p={4}
            rounded="full"
            boxShadow="lg"
          >
            <ChatIcon w="50px" h="50px" color="white" />
          </Box>

          <Text fontSize="2xl" fontWeight="bold" bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text">Register</Text>

          <form onSubmit={handleRegister} style={{ width: "100%" }}>
            <Stack spacing={4} width="100%">
              <Input
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <InputGroup>
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={togglePasswordVisibility}
                    size="sm"
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>

              <Button
                type="submit"
                bgGradient="linear(to-r, blue.400, blue.600)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                  transform: "scale(1.02)"
                }}
                _active={{
                  bgGradient: "linear(to-r, blue.600, purple.700)"
                }}
                isLoading={loading}
                transition="all 0.2s"
              >
                Register
              </Button>
            </Stack>
          </form>

          <Button
            width="100%"
            onClick={() => signInWithGoogle("", {prompt: "select_account"})}
            leftIcon={<Box as="span" fontSize="1.5em">G</Box>}
            variant="outline"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
            _hover={{
              bg: colorMode === "light" ? "gray.50" : "gray.600",
              transform: "scale(1.02)"
            }}
            transition="all 0.2s"
          >
            Sign Up with Google
          </Button>

          <Flex width="100%" justifyContent="center">
            <Text>Already have an account?</Text>
            <Text
              ml={2}
              color="blue.500"
              cursor="pointer"
              onClick={goToLogin}
              fontWeight="bold"
            >
              Login
            </Text>
          </Flex>

          {(error || errorMessage) && (
            <Text color="red.500">
              {errorMessage || (error && error.message)}
            </Text>
          )}
        </Stack>
      </Center>
    </>
  );
}