import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import AdminPage from "./containers/AdminPage/AdminPage";

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={(
          <AdminPage/>
      )}/>
    </Routes>
  );
};

export default App;
