export interface IPizza {
  id: string;
  image: string;
  title: string;
  price: number;
}
export interface IApiPizza {
  [id: string]: IPizza;
}

export type TApiPizza = Omit<IPizza, "id">;

export interface IPizzaMutation {
  image: string;
  title: string;
  price: string;
}

export interface ICartPizza {
  pizza: IPizza;
  amount: number;
}

export interface IOrder {
  [id: string]: number;
}

export interface IApiOrder {
  [id: string]: IOrder;
}

export interface IOrderPizzas {
  title: string;
  amount: string;
  price: number;
  id: string;
}
