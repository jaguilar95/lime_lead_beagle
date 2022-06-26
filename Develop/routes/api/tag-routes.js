const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const dbData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });

    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const dbData = await Tag.findOne({
      where: { id: req.params.id },
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!dbData) {
      res.status(404).json({ message: "No tag found with this ID" });
      return;
    }

    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
