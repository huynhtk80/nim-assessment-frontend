import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const [orderInfo, setOrderInfo] = useState(undefined);
  const { id } = useParams();

  const getData = async () => {
    const response = await fetch(`/api/orders/${id}`);

    const data = await response.json();
    setOrderInfo(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!orderInfo)
    return (
      <div className="page">Unable to confirm Order. Please try again.</div>
    );

  return (
    <div className="page">
      <OrderConfirmation order={orderInfo} />
    </div>
  );
}

export default ConfirmationPage;
