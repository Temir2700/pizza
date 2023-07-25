interface IPizza {
    id: string;
    image: string;
    title: string;
    price: number;
}
export interface IApiPizza {
    [id: string]: IPizza;
}