const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
router.get("/", async (req, res) => {
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

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
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

    // validates category actually exists
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

// create a new tag
router.post("/", async (req, res) => {
  try {
    const dbResponse = await Tag.create({ tag_name: req.body.tag_name });

    // send response to user
    res.json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const dbResponse = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );

    // validates tag actually exists
    // dbResponse returns an array with a count of number of lines changed. If zero then falsy
    if (!dbResponse[0]) {
      res.status(404).json({ message: "No tag found with this ID" });
      return;
    }

    res.json({ message: `Tag with ID #${req.params.id} successfully updated` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const dbResponse = await Tag.destroy({
      where: { id: req.params.id },
    });

    // validates tag actually exists
    if (!dbResponse) {
      res.status(404).json({ message: "No Tag found with this ID" });
      return;
    }

    res.json({
      message: `Tag with ID #${req.params.id} successfully deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
