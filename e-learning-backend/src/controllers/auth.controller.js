import { registerUser, loginUser } from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
      successResponse(res, user, "User registered successfully", 201);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, role } = await loginUser(req.body);
     successResponse(res, { token, role }, "Login successful");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
