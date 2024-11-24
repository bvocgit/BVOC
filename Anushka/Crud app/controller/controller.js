import User from "../model/usermodel.js";

// Create new user
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error during user creation:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Fetch users (for testing)
export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error during fetching users:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update a user by ID
export const update = async (req, res) => {
  try {
    const { id } = req.params;  // Get user ID from URL parameter
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,  // Return the updated document
      runValidators: true,  // Ensure validation is run
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error during user update:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;  // Get user ID from URL parameter

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error during user deletion:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
