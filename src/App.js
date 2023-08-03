import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Booking from "./components/booking/booking";
import Ticket from "./components/ticket/ticket";
import { AuthProvider } from "./context/context";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/ticket" component={Ticket} />
            <Route path="/booking/:id" component={Booking} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
