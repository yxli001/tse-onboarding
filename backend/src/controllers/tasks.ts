import { RequestHandler } from "express";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find().sort({ createdAt: -1 }).populate("assignee").exec();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
