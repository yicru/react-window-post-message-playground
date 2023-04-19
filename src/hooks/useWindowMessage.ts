import { useEffect, useState } from "react";

type Message = {
  message: string;
};

type MessageWithIdentifier = Message & {
  identifier: "app";
};

const isAppMessageEvent = (
  event: MessageEvent<MessageWithIdentifier | unknown>
): event is MessageEvent<Message> => {
  const isSameOrigin = event.origin === window.location.origin;

  const { data: message } = event;

  const isAppMessage =
    typeof message === "object" &&
    message !== null &&
    "identifier" in message &&
    (message as MessageWithIdentifier).identifier === "app";

  return isSameOrigin && isAppMessage;
};

const typedPostMessage = (target: Window, message: MessageWithIdentifier) => {
  target.postMessage(message, "*");
};

export const useWindowMessageSender = () => {
  const sendMessage = (target: Window, message: Message) => {
    typedPostMessage(target, {
      identifier: "app",
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
