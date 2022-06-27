const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
router.get("/", async (req, res) => {
  try {
    const dbData = await Category.findAll({
      // be sure to include its associated Products
      include: {
        model: Product,
      },
    });

    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get("/:id", async (req, res) => {
  try {
    const dbData = await Category.findOne({
      where: { id: req.params.id },
      // be sure to include its associated Products
      include: { model: Product },
    });

    if (!dbData) {
      res.status(404).json({ message: "No category found with this ID" });
      return;
    }

    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const dbResponse = await Category.create({
      category_name: req.body.category_name,
    });

    // send response to user
    res.json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const dbResponse = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );

    // validates category actually exists
    // dbResponse returns an array with the number of lines changed. If zero, then falsy
    if (!dbResponse[0]) {
      res.status(404).json({ message: "No category found with this ID" });
      return;
    }

    res.json({
      message: `Category with ID #${req.params.id} successfully updated`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const dbResponse = Category.destroy({
      where: { id: req.params.id },
    });

    // validates category actually exists
    if (!dbResponse) {
      res.status(404).json({ message: "No category found with this ID" });
      return;
    }

    res.json({
      message: `Category with ID #${req.params.id} successfully deleted`,
    });
  } catch (err) {
    console.log(err);
    res.json(500).json(err);
  }
});

module.exports = router;
