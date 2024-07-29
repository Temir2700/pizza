import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import ClientModal from "../../containers/ClientModal/ClientModal";
import { clearObject, setShow } from "../../store/cartSlice";

const Cart = () => {
  const cartDishes = useAppSelector((state) => state.cart.cart);
  const showState = useAppSelector((state) => state.cart.show);
  const dispatch = useAppDispatch();

  const sum = cartDishes.reduce((acc, value) => {
    return acc + value.amount * value.pizza.price;
  }, 0);

  let modal: React.ReactNode = null;

  if (showState) {
    modal = <ClientModal />;
  }

  const onCheckout = () => {
    dispatch(setShow(true));
    dispatch(clearObject());
  };
  return (
    <>
      <div className="cart">
        <div>
          Total: <strong>{sum}</strong> KGS
        </div>
        <div>
          <button className="btn btn-checkout" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
      {modal}
    </>
  );
};

export default Cart;
