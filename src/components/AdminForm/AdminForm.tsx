import React, {useState} from 'react';
import {IPizzaMutation, TApiPizza} from "../../types";
import BtnSpinner from "../Spinner/BtnSpinner";

interface Props {
    onSubmit: (newPizza: TApiPizza) => void;
    isEdit?: boolean;
    existingPizza?: IPizzaMutation;
    isLoading?: boolean;
}

const initialState = {
    image: '',
    title: '',
    price: ''
};

const AdminForm: React.FC<Props> = ({onSubmit, isEdit, existingPizza = initialState, isLoading}) => {
    const [newPizza, setNewPizza] = useState(existingPizza);

    const pizzaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const name = e.target.name;
        const value = e.target.value;

        setNewPizza(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit =  (e: React.FormEvent) => {
        e.preventDefault();

        if(newPizza.image !== ''  && newPizza.title !== '' && newPizza.price !== '') {
            onSubmit({
                ...newPizza,
                price: parseFloat(newPizza.price),
            });
        } else {
            alert('Fill the form!');
        }
    };

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <div className="select-wrap">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="input"
                    value={newPizza.title}
                    onChange={pizzaChange}
                />
            </div>
            <div className="select-wrap">
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    name="price"
                    id="price"
                    className="input"
                    value={newPizza.price}
                    onChange={pizzaChange}
                />
            </div>
            <div className="select-wrap">
                <label htmlFor="image">Image</label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    className="input"
                    value={newPizza.image}
                    onChange={pizzaChange}
                />
            </div>
            <button
                type="submit"
                className="form-btn"
                disabled={isLoading}
            >
                {isEdit ? 'Save' : 'Create'}
                {isLoading && <BtnSpinner/>}
            </button>
        </form>
    );
};

export default AdminForm;