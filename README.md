# Pizza Ordering App
This is a Pizza Ordering App, where you can order pizzas. The app is divided into admin and client sides. The admin panel is located on a separate route '/admin'. And it consists of two parts: dishes ('/admin/dishes') and orders ('/admin/orders'). In dishes, you can add a new pizza, edit an existing one, or delete it. Orders displays information about orders. 

The client panel displays a list of dishes received from the Firebase server, the cart is displayed on the right. By clicking on a pizza, it is added to the cart. When you click on the Checkout button, a modal window appears. This modal window displays a preview of the order. There, you can delete pizzas from the order, and when you click on Order, the order is sent to the server.

The code is divided into functional components, React CRUD method is realized, hooks useState, useEffect are applied, ReactJS is used.

To start the project, you need to do the following:

1) Clone the project to your Github machine with the command:
   
   `git clone git@github.com:sakutaku/Pizza-Ordering-App.git`

2) Install dependencies:

   `npm install`

3) Run the project

   `npm start`
