const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

// Middleware
app.use(cookieParser());

app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
}));

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Session Tracking App");
});

//  Cookie Example
app.get("/set-cookie", (req, res) => {
    res.cookie("user", "Sruthi", { maxAge: 60000 }); // 1 min
    res.send("Cookie has been set");
});

app.get("/get-cookie", (req, res) => {
    res.send(`cookie value: ${req.cookies.user}`);
});

//  Session Example
app.get("/login", (req, res) => {
    req.session.username = "Sruthi";
    res.send("User logged in (session created)");
});

app.get("/profile", (req, res) => {
    if (req.session.username) {
        res.send(`Welcome ${req.session.username}`);
    } else {
        res.send("Please login first");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out successfully");
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});