import { useEffect, useState } from "react";
import { z } from "zod";

const IDENTIFIER = "app";

const messageSchema = z.object({
  identifier: z.literal(IDENTIFIER),
  payload: z.string(),
});

type Message = z.infer<typeof messageSchema>;

const isAppMessageEvent = (
  event: MessageEvent<Message | unknown>
): event is MessageEvent<Message> => {
  const { success } = messageSchema.safeParse(event.data);
  return success;
};

const typedPostMessage = (target: Window, message: Message) => {
  target.postMessage(message, "*");
};

export const useWindowMessageSender = () => {
  const sendMessage = (
    target: Window,
    message: Omit<Message, "identifier">
  ) => {
    typedPostMessage(target, {
      identifier: IDENTIFIER,
      ...message,
    });
  };

  return { sendMessage };
};

export const useWindowMessageListener = (callback?: () => void) => {
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const listener = (event: MessageEvent<Message | unknown>) => {
      if (!isAppMessageEvent(event)) return;

      setMessage(event.data);
      callback?.();
    };

    window.addEventListener("message", listener);

    return () => {
      window.removeEventListener("message", listener);
    };
  }, [callback]);

  return { message };
};
