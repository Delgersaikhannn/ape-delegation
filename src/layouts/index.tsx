import { VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "./header.layout";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <VStack
      w="100%"
      minH="100vh"
      bg="black"
      fontFamily="'Roboto Condensed', sans-serif"
    >
      <Header />
      {children}
    </VStack>
  );
};

export default Layout;
