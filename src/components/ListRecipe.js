import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Text from './Text.js'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const List = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile
          key="Subheader"
          cols={2}
          style={{ height: "auto" }}
        ></GridListTile>
        {props.recipe.map((recipe, i) => (
          <GridListTile key={i}>
            <img src={"/images/" + recipe.photo} alt="Not Available" />
            <Link to={"recipe/" + recipe._id}>
              {" "}
              <GridListTileBar
                title={recipe.Title}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />{" "}
            </Link>
            
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
export default class ListRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        this.setState({ recipeList: response.data });
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
    return (
      <div>
        <Text/>
        <List recipe={this.state.recipeList} />
      </div>
    );
  }
}
