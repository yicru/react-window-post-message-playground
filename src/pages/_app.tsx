import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
}
