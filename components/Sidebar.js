import { Avatar } from "@chakra-ui/avatar";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { ArrowLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebaseconfig";
import getOtherEmail from "../utils/getOtherEmail";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  }

  const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    if (!chatExists(input) && (input != user.email)) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] })
    }
  }

  const deleteChat = async (chatId, e) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "chats", chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const chatList = () => {
    return (
      chats?.filter(chat => chat.users.includes(user.email))
      .map(
        chat => 
          <Flex key={Math.random()} p={3} align="center" _hover={{bg: "gray.100", cursor: "pointer"}} onClick={() => redirect(chat.id)}>
            <Avatar src="" marginEnd={3} />
            <Text flex={1}>{getOtherEmail(chat.users, user)}</Text>
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={(e) => deleteChat(chat.id, e)}
              _hover={{ bg: "red.100" }}
            />
          </Flex>
      )
    )
  }

  return (
    <Flex
      // bg="blue.100"
      h="100%"
      w="300px"
      borderEnd="1px solid" borderColor="gray.200"
      direction="column"
    >

      <Flex
        // bg="red.100"
        h="81px" w="100%"
        align="center" justifyContent="space-between"
        borderBottom="1px solid" borderColor="gray.200"
        p={3}
      >

        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text>{user.displayName}</Text>
        </Flex>

        <Menu>
          <MenuButton
            as={IconButton}
            size="sm"
            isRound
            icon={<ArrowLeftIcon />}
          />
          <MenuList>
            <MenuItem
              onClick={() => signOut(auth)}
              _hover={{ bg: "red.100", color: "red.700" }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>

      </Flex>

      <Button m={5} p={4} onClick={() => newChat()}>New Chat</Button>

      <Flex overflowX="scroll" direction="column" sx={{scrollbarWidth: "none"}} flex={1} >
        {chatList()}
      </Flex>

    </Flex>

  )
}