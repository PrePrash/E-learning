import { userService } from "../services/user.service.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id); // user.id comes from auth middleware
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    await userService.deleteProfile(req.user.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

export const getme = async(req, res)=> {
  try {
    const userId = req.user.id;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
