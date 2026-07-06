import { deleteById, findAll, findById, updateById } from "../repository/user.repository.js";

export const userService = {
  getProfile: async (userId) => {
    const user = await findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  },

  updateProfile: async (userId, data) => {
    const user = await updateById(userId, data);
    if (!user) throw new Error("User not found or update failed");
    return user;
  },

  deleteProfile: async (userId) => {
    const user = await deleteById(userId);
    if (!user) throw new Error("User not found or delete failed");
    return user;
  },

  getAllUsers: async () => {
    return await findAll();
  },

  getUserById: async (id) => {
    const user = await findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }
};
