app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = Object.values(users).find(
    (u) => u.email === email
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.json({
    message: "Login successful",
    user,
  });
});