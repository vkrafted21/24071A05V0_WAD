import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username } = req.body;

  // Normally check DB here
  const user = { name: username };

  const token = jwt.sign(user, "secretKey", { expiresIn: "1h" });

  res.json({ token });
});

export default router;