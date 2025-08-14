const express = require("express");
const router = express.Router();
const sampleGrants = require("../data/sampleGrants");

router.post("/", (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Category is required." });
  }

  const results = sampleGrants.filter((grant) =>
    grant.category.toLowerCase() === category.toLowerCase()
  );

  res.json({ results });
});

module.exports = router;
