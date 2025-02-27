export const signUp = async (req, res) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    fullname,
    gender,
    phoneNumber,
    profilePic,
  } = req.body;
  try {
    

  } catch (error) {}
};
//  id SERIAL PRIMARY KEY,
//     username VARCHAR(20) NOT NULL UNIQUE,
//     email VARCHAR(255) NOT NULL,
//     passsword VARCHAR(20) NOT NULL,
//     fullname VARCHAR(255) DEFAULT '',
//     gender VARCHAR(255) DEFAULT 'Male',
//     phoneNumber VARCHAR(12) DEFAULT '',
//     profilePic TEXT DEFAULT '',
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
