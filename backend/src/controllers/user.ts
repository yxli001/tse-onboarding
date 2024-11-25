import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import UserModel from "src/models/user";
import validationErrorParser from "src/util/validationErrorParser";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const results = validationResult(req);
    validationErrorParser(results);

    const { name, profilePictureURL } = req.body;
    const user = await UserModel.create({ name, profilePictureURL });

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
