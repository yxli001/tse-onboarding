import { body } from "express-validator";

const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("username cannot be empty");

const makeProfilePictureURLValidator = () =>
  body("profilePictureURL")
    .optional()
    .if(body("profilePictureURL").exists({ values: "null" }))
    .isString()
    .withMessage("profilePictureURL must be a string")
    .bail()
    .isURL()
    .withMessage("profilePictureURL must be a valid URL");

// establishes a set of rules that the body of the task creation route must follow
export const createUser = [makeNameValidator(), makeProfilePictureURLValidator()];
