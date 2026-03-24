import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.get("/",(req,res)=>{
    res.send("api is running")
})