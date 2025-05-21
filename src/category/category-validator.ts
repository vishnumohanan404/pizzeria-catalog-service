import { body } from "express-validator";

export default [
    body("name")
        .exists()
        .withMessage("Category name is required")
        .isString()
        .withMessage("Category name must be a string")
        .isLength({ min: 3 })
        .withMessage("Category name must be at least 3 characters long"),
    body("priceConfiguration")
        .exists()
        .withMessage("Price configuration is required")
        .isString(),
    body("priceConfiguration.*.priceType")
        .exists()
        .withMessage("Price type is required")
        .custom((value: "base" | "additional") => {
            const validKeys = ["base", "additional"];
            if (!validKeys.includes(value)) {
                throw new Error(`Invalid price type: ${value}`);
            }
            return true;
        }),
    body("attributes").exists().withMessage("Attributes are required"),
];
