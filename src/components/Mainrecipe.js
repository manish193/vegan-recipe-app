import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import "./static/home.css";
export default class ListRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: "",
      Ingredients: [],
      Instructions: [],
      photo: "",
    };
  }
  componentDidMount() {
    axios("http://localhost:5000/" + this.props.location.pathname.slice(8))
      .then((response) => {
        this.setState({
          Title: response.data.Title,
          Ingredients: [...response.data.Ingredients],
          Instructions: [...response.data.Instructions],
          photo: response.data.photo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteRecipe(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(console.log(response.data));
    });
    alert("Recipe deleted!!!");
    window.location.reload();
  }

  render() {
    console.log("/images/" + this.state.photo);
    return (
      <div className="main">
        <Paper variant="outlined" square>
          <h1>{this.state.Title}</h1>
          <img src={"/images/" + this.state.photo} alt="Not Available" />
          <div className="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {this.state.Ingredients.map((p, index) => {
                return (
                  <li key={index}>
                    {p.IngredientAmount} {p.IngredientName}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="instructions">
          <ol>
              <h2>Instructions</h2>
              {this.state.Instructions.map((p, index) => {
                return <li key={index}>{p}</li>;
              })}
            
          </ol>
          </div>
          <a
            className="card-link"
            href="/"
            onClick={() => {
              this.deleteRecipe(this.props.location.pathname.slice(8));
            }}
          >
            {" "}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>{" "}
          </a>
          <Link to={"/update/" + this.props.location.pathname.slice(8)}>
            {" "}
            <Button variant="contained" color="primary">
              Update
            </Button>{" "}
          </Link>
        </Paper>
      </div>
    );
  }
}
