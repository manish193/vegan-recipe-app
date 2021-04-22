const router = require('express').Router();
let Recipe = require('./models/recipe.model');
router.route('/').get((req, res) => {
  Recipe.find()
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const Title = req.body.Title;
  const Ingredients = req.body.Ingredients;
  const Instructions = req.body.Instructions;

  const newRecipe = new Recipe({
    Title,
    Ingredients,
    Instructions,
  });

  newRecipe.save()
  .then(() => res.json('Recipe added!'))
  .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/:id').get((req, res) => {
  Recipe.findById(req.params.id)
    .then(Recipe => res.json(Recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json('Recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Recipe.findById(req.params.id)
    .then(Recipe => {
      Recipe.username = req.body.username;
      Recipe.description = req.body.description;
      Recipe.duration = Number(req.body.duration);
      Recipe.date = Date.parse(req.body.date);

      Recipe.save()
        .then(() => res.json('Recipe updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;