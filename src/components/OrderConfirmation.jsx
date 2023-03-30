import React from "react";
import styles from "./styles/Order.module.css";

function OrderConfirmation({ order }) {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div>
          <h2>Thank you for your order</h2>
          <h3>Name: {order?.name} </h3>
          <h4>Address: {order?.address}</h4>
          <h4>Order Id: {order?.id}</h4>
        </div>
        <div className={styles.order}>
          <ul>
            {order?.items.map((item) => (
              <li key={item.item.id}>
                <div className={styles.item}>
                  <p>{item.item.name}</p>
                  <div className={styles.quantity}>
                    <p>${item.item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3>
            Total: $
            {order &&
              (
                order.items.reduce(
                  (total, item) => total + item.item.price * item.quantity,
                  0
                ) * 1.05
              ).toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
