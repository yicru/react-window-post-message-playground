import { Grid, Heading, Text } from "@chakra-ui/react";
import { useWindowMessageListener } from "../hooks/useWindowMessage";

export default function ChildPage() {
  const { message } = useWindowMessageListener();

  return (
    <Grid gap={4} p={4}>
      <Heading>Child</Heading>

      <Text>
        {message?.message
          ? String(message.message)
          : "メッセージを待っています"}
      </Text>
    </Grid>
  );
}
