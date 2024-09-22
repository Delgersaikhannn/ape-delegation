import { MAXW } from "@/utils/globals";
import { Text, VStack } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <VStack maxW={MAXW} color="white">
      <Text>All Delegates</Text>
    </VStack>
  );
};

export default HomePage;
