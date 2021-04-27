import axios from "axios";
import React, { useState, useEffect } from "react";
import "./static/AddRecipe.css";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function UpdateRecipe(props) {
  const [Ingredients, setIngredients] = useState([
    { IngredientName: "", IngredientAmount: "" },
  ]);
  const [photo, setPhoto] = useState("");
  const [Title, setTitle] = useState("");
  const [Instructions, setInstructions] = useState([""]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/" + props.location.pathname.slice(8))
      .then((response) => {
        setIngredients(response.data.Ingredients);
        setTitle(response.data.Title);
        setInstructions(response.data.Instructions);
        setPhoto(response.data.Photo);
      });
  }, [props.location.pathname]);

  const onSubmit = (e) => {
    e.preventDefault();


    var neA = JSON.stringify(Ingredients);
    var k = JSON.parse(neA);
    console.log(neA, k);
  
    const formData = new FormData();
    formData.set("photo", photo);
    formData.set("Instructions", JSON.stringify(Instructions));
    formData.set("Title", Title);
    formData.append("Ingredients",   neA);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    axios
      .post(
        "http://localhost:5000/update/" + props.location.pathname.slice(8),
        formData
      )
      .then((res) => {
        console.log(res.data);
      });
    alert("Recipe updated!!!");
    window.location  ='/'
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...Ingredients];
    list[index][name] = value;
    setIngredients(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...Ingredients];
    list.splice(index, 1);
    setIngredients(list);
  };

  const handleAddClick = () => {
    setIngredients([
      ...Ingredients,
      { IngredientName: "", IngredientAmount: "" },
    ]);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeInstructions = (e, i) => {
    const list = [...Instructions];
    list[i] = e.target.value;
    setInstructions(list);
  };

  const handleRemoveClick1 = (index) => {
    const list = [...Instructions];
    list.splice(index, 1);
    setInstructions(list);
  };

  const handleAddClick1 = () => {
    setInstructions([...Instructions, ""]);
  };
  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const classes = useStyles();

  return (
    <div className="container">
      <div className="body1">
          <h1>Update Recipe</h1>
          <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={handlePhoto}
            />
            <div className="form-group">
              <label className="title">Title: </label>
              <input
                type="text"
                required
                className="form-control"
                value={Title}
                onChange={(e) => onChangeTitle(e)}
              />
            </div>

            <div className="form-group">
              <label>Enter The Ingredient Here: </label>
              {Ingredients.map((x, i) => {
                return (
                  <div className="row g-3" key={i}>
                    <div className="col-auto">
                      <input
                        key={i}
                        type="text"
                        required
                        name="IngredientName"
                        className="form-control col-md-6 "
                        placeholder="Enter Ingredient Name"
                        value={x.IngredientName}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </div>
                    <div className="col-auto">
                      <input
                        key={i}
                        className="form-control"
                        name="IngredientAmount"
                        placeholder="Enter Ingredient  Amount"
                        value={x.IngredientAmount}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </div>
                    <div className="col-auto">
                      <div>
                        {Ingredients.length !== 1 && (
                          <button
                            className="mr10"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </button>
                        )}
                        {Ingredients.length - 1 === i && (
                          <button onClick={handleAddClick}>Add</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <label>Enter Instructions to make the dish: </label>

            {Instructions.map((x, i) => {
              return (
                <div className="from-group" key={i}>
                  <div className="col-auto">
                    <textarea
                      key={i}
                      type="text"
                      required
                      name="Instructions"
                      className="form-control col-md-6 "
                      placeholder={"Enter step " + (i + 1)}
                      value={x}
                      onChange={(e) => onChangeInstructions(e, i)}
                      rows="2"
                    />
                  </div>
                  <div className="col-auto">
                    {Instructions.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveClick1(i)}
                      >
                        Remove
                      </button>
                    )}
                    {Instructions.length - 1 === i && (
                      <button onClick={handleAddClick1}>Add</button>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="form-group">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Update Recipe
              </Button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default UpdateRecipe;
