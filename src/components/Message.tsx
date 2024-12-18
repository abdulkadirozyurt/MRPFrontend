import React, { useEffect } from "react";
import { Button, message, Space } from "antd";

export default function Message({
  result,
  alertMessage,
}: {
  result: "info" | "success" | "error" | "warning";
  alertMessage: string;
}) {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: result,
      content: alertMessage,
    });
  };

  const error = () => {
    messageApi.open({
      type: result,
      content: alertMessage,
    });
  };

  const warning = () => {
    messageApi.open({
      type: result,
      content: alertMessage,
    });
  };

  useEffect(() => {
    messageApi.open({
      type: result,
      content: alertMessage,
    });
  }, [result, alertMessage, messageApi]);

  return <>{contextHolder}</>;
}
