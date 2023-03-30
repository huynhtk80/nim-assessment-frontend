import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorState, setErrorState] = useState({
    name: false,
    phone: false,
    address: false
  });
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();

  const validPhone = () => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      setPhone(`(${match[1]})${match[2]}-${match[3]}`);
      return true;
    }
    return false;
  };

  function formatPhoneNumber() {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]})${match[2]}-${match[3]}`;
    }
    return phone;
  }

  const validate = () => {
    let valid = true;
    let errors = {
      name: false,
      phone: false,
      address: false
    };
    let eMessage = {
      name: "",
      phone: "",
      address: ""
    };

    if (!name) {
      valid = false;
      errors = { ...errors, name: true };
      eMessage = { ...eMessage, name: "Name is required" };
    }

    if (!phone) {
      valid = false;
      errors = { ...errors, phone: true };
      eMessage = { ...eMessage, phone: "Phone Number is required" };
    }

    if (phone && !validPhone()) {
      valid = false;
      errors = { ...errors, phone: true };
      eMessage = { ...eMessage, phone: "Phone Number requires 10 digits" };
    }

    if (!address) {
      valid = false;
      errors = { ...errors, address: true };
      eMessage = { ...eMessage, address: "Address is required" };
    }

    setErrorState(errors);
    setErrorMsg(eMessage);

    return valid;
  };

  const placeOrder = async () => {
    if (validate()) {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone: formatPhoneNumber(phone),
          address,
          items: order
        })
      });
      if (response.status === 200) {
        const data = await response.json();
        navigate(`/order-confirmation/${data.id}`);
      }
    }
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name{" "}
              <span className={styles.errorMsg}>
                {errorState.name && errorMsg.name}
              </span>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone{" "}
              <span className={styles.errorMsg}>
                {errorState.phone && errorMsg.phone}
              </span>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                value={phone}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address{" "}
              <span className={styles.errorMsg}>
                {errorState.address && errorMsg.address}
              </span>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>

          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
