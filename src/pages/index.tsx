import { Link, Box, Button, Grid, Heading, Textarea } from "@chakra-ui/react";
import { useWindowMessageSender } from "../hooks/useWindowMessage";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [childPage, setChildPage] = useState<Window | null>(null);

  const { sendMessage } = useWindowMessageSender();

  const handleOnSendMessage = () => {
    if (!childPage) {
      alert("子ページが開かれていません。");
      return;
    }

    sendMessage(childPage, {
      payload: value,
    });

    setValue("");
  };

  const handleOnOpenChildPage = () => {
    const childPage = window.open("/child");
    setChildPage(childPage);
  };

  return (
    <Grid gap={4} p={4}>
      <Heading>Home</Heading>

      <Box maxW={"lg"}>
        <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
        <Button mt={2} w={"100%"} onClick={handleOnSendMessage}>
          送信
        </Button>
      </Box>

      <Link onClick={handleOnOpenChildPage}>子ページを開く</Link>
    </Grid>
  );
}
