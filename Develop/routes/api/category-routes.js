const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
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

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
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

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
