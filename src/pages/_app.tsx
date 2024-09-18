import Layout from "@/layouts";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Web3Provider } from "@/utils/web3Provider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3Provider>
  );
}
