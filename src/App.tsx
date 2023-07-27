import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import AdminPage from "./containers/AdminPage/AdminPage";
import PizzasPage from "./containers/PizzasPage/PizzasPage";
import PizzaAdd from "./containers/PizzaAdd/PizzaAdd";

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={(
          <AdminPage/>
      )}>
          <Route path="dishes" element={
              <PizzasPage/>
          }/>
      </Route>
      <Route path="/admin/new-pizza" element={(
          <PizzaAdd/>
      )}/>
    </Routes>
  );
};

export default App;
