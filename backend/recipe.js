const router = require("express").Router();
let Recipe = require("./models/recipe.model");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/").get((req, res) => {
  Recipe.find()
    .then((recipe) => res.json(recipe))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(upload.single("photo"), (req, res) => {
  const Title = req.body.Title;

  const Ingredients = JSON.parse(req.body.Ingredients);
  const Instructions = JSON.parse(req.body.Instructions);
  var photo = "b4d8ded8-c7da-4ff2-bb08-e286f08e3bd9-1619546472964.jpg";
  if (req.file) photo = req.file.filename;

  const newRecipe = new Recipe({
    Title,
    Ingredients,
    Instructions,
    photo,
  });

  newRecipe
    .save()
    .then(() => res.json("Recipe added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get((req, res) => {
  Recipe.findById(req.params.id)
    .then((Recipe) => res.json(Recipe))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("Recipe deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post(upload.single("photo"), (req, res) => {
  Recipe.findById(req.params.id)
    .then((Recipe) => {
      /* console.log(Recipe);
      console.log(req.body);
      Recipe.Title = req.body.Title;
     Recipe.Ingredients = JSON.parse(req.body.Ingredients);
      Recipe.Instructions = JSON.parse(req.body.Instructions);
      Recipe.photo = req.file.filename;
      console.log(req.body.Ingredients) */
      Recipe.Title = req.body.Title;

      Recipe.Ingredients = JSON.parse(req.body.Ingredients);
      Recipe.Instructions = JSON.parse(req.body.Instructions);
      Recipe.photo = req.body.photo
      if(req.file)
       Recipe.photo  = req.file.filename;
    
      
      Recipe.save()
        .then(() => res.json("Recipe updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
