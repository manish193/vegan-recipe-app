import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListRecipe from "./components/ListRecipe";
import AddRecipe from "./components/AddRecipe";
import UpdateRecipe from "./components/UpdateRecipe";
import Mainrecipe from "./components/Mainrecipe";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path ='/' exact component={ListRecipe} />
        <Route path ='/add' component = { AddRecipe } />
        <Route path ='/update' component = { UpdateRecipe } />
        <Route path ='/recipe' component = { Mainrecipe } />
      </div>
    </Router>
  );
}

export default App;
