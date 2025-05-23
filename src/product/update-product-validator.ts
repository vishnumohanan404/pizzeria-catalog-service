import { body } from "express-validator";

export default [
    body("name")
        .exists()
        .withMessage("Product name is required")
        .isString()
        .withMessage("Product name must be a string")
        .isLength({ min: 3 })
        .withMessage("Category name must be at least 3 characters long"),
    body("description").exists().withMessage("Description is required"),
    body("priceConfiguration")
        .exists()
        .withMessage("Price configuration is required"),
    body("attributes").exists().withMessage("Attributes are required"),
    body("tenantId").exists().withMessage("Tenant ID are required"),
    body("categoryId").exists().withMessage("Category ID are required"),
];
