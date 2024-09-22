import { MAXW } from "@/utils/globals";
import { HStack, Image, Text } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

const Paths = [
  {
    label: "MY GLIMPSES",
    path: "/my",
  },
  {
    label: "WATCH",
    path: "/watch",
  },
];
const Header = () => {
  return (
    <HStack
      w="100%"
      justifyContent="center"
      py={["40px"]}
      px={"20px"}
      pos="sticky"
      top="0"
      zIndex={2}
    >
      <HStack
        w="100%"
        justifyContent="space-between"
        color="white"
        maxW={MAXW}
        fontWeight={700}
      >
        <Image src="/ape.png" h="24px" />
        {/* <Text>NEW HERE SHORTS</Text> */}
        <HStack spacing="48px" fontSize="14px">
          {Paths?.map((el, idx) => (
            <Link key={el.path} href={el.path}>
              <Text>{el.label}</Text>
            </Link>
          ))}
          <ConnectKitButton />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Header;
