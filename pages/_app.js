import { ChakraProvider, Spinner, Center } from "@chakra-ui/react";
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from "../components/Login";
import { auth } from "../firebaseconfig";
import theme from "../theme";
import "../styles/holographic.css";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider theme={theme}>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    )
  }

  if (!user) {
    const isRegisterPage = Component.name === "Register";
    return (
      <ChakraProvider theme={theme}>
        {isRegisterPage ? <Component {...pageProps} /> : <Login />}
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
