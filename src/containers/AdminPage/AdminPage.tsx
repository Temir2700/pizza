import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const AdminPage = () => {
  return (
    <>
      <Header />
      <div className="admin-page">
        <div className="container">
          <h1 className="admin-page-title">This is an admin page!</h1>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminPage;
