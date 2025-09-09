import { body } from "express-validator";

const validationSchema = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3 }),
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isLength({ min: 2 })
      .withMessage("price must be at least more than 9 dollars"),
  ];
};
export default validationSchema;
