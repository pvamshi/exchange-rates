import { ChakraProvider } from "@chakra-ui/react";
import Converter from "./Converter";
export default function App() {
  return (
    <ChakraProvider>
      <Converter />
    </ChakraProvider>
  );
}
