import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { deleteOrder, fetchOrders } from "../../store/cartThunk";
import { fetchPizzas } from "../../store/pizzaThunk";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IOrderPizzas } from "../../types";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const allOrders = useAppSelector((state) => state.cart.allOrders);
  const items = useSelector((state: RootState) => state.pizzas.items);
  let newOrders: IOrderPizzas[][] = [];
  const sum: number[] = [];

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchPizzas());
  }, [dispatch]);

  allOrders.forEach((ord) => {
    const orderPizzas: IOrderPizzas[] = [];

    Object.keys(ord).map((key) => {
      orderPizzas.push({
        title: items.filter((pizza) => pizza.id === key)[0]?.title,
        price: items.filter((pizza) => pizza.id === key)[0]?.price,
        amount: ord[key].toString(),
        id: ord.id.toString(),
      });
    });
    newOrders.push(orderPizzas);
  });

  newOrders.forEach((order) => {
    let num = 0;

    order.forEach((ord) => {
      if (ord.price) {
        num += ord.price;
      }
    });

    sum.push(num);
  });

  let totalSum: number = 0;

  for (let i = 0; i < sum.length; i++) {
    totalSum += sum[i];
  }

  const removeOrder = async (id: string) => {
    if (window.confirm("Do you want to delete order?")) {
      await dispatch(deleteOrder(id));
      await dispatch(fetchOrders());
    }
  };

  return (
    <div>
      <h2 className="order-title">Orders. Total: {totalSum} KGS</h2>
      {newOrders.map((oneOrd, id) => (
        <div className="pizza-item order-item" key={id}>
          {oneOrd.map(
            (order, id2) =>
              order.title && (
                <div key={id2}>
                  <div>
                    {order.title} x {order.amount}
                  </div>
                  <div className="order-item-right">{order.price} KGS</div>
                </div>
              )
          )}
          <button className="btn" onClick={() => removeOrder(oneOrd[0].id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
