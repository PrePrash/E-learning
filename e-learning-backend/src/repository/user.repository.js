import User from "../models/User.js";

export const findUserByEmail = (email) => User.findOne({ email });
export const createUser = (userData) => User.create(userData);
export const findById =  async (id) => {
    return await User.findById(id).select("-password")
      .populate("badges");;
  };

export const findAll=  async () => {
    return await User.find();
  };

export const  updateById = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
  };

export const  deleteById=  async (id) => {
    return await User.findByIdAndDelete(id);
  };