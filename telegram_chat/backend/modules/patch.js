app.patch("/users/:username", (req, res) => {
  const { username } = req.params;
  const { requester, email, password, gender } = req.body;

  if (username !== requester) {
    return res.status(403).json({
      message: "Faqat o‘z profilingizni o‘zgartira olasiz",
    });
  }

  if (!users[username]) {
    return res.status(404).json({ message: "User topilmadi" });
  }

  if (email) users[username].email = email;
  if (password) users[username].password = password;
  if (gender) users[username].gender = gender;

  saveUsers();

  res.json({
    message: "Profil yangilandi",
    user: users[username],
  });
});
