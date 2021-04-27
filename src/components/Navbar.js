import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light" >
        <b>
          <Link to="/" className="navbar-brand">
           Vegan Recipe Book
          </Link>
        </b>
        <form className="form-inline">
          <button className="btn btn-outline-success" type="button">
          <Link to="/" className="navbar-brand">
            List Recipe
          </Link>
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
          <Link to="/add" className="navbar-brand">
            Add Recipe
          </Link>
          </button>
        </form>
      </nav>
    );
  }
}

export default Navbar;
