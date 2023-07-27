import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import AdminPage from "./containers/AdminPage/AdminPage";
import PizzasPage from "./containers/PizzasPage/PizzasPage";

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
    </Routes>
  );
};

export default App;
