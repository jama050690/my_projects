app.post("/signup", (req, res) => {
  const { username, email, password, gender = "male" } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields required", success: false });
  }

  if (users[username]) {
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  }

  const newUser = {
    id: generateID(),
    username,
    email,
    password,
    gender,
  };

  users[username] = newUser;
  saveUsers();
  res.status(201).json({
    message: "Registered successfully",
    user: newUser,
    success: true,
  });
});
