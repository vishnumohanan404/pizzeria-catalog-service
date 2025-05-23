import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { ProductService } from "./product-service";
import { Product } from "./product-types";
import { FileStorage } from "../common/types/storage";
import { v4 as uuidv4 } from "uuid";
import { UploadedFile } from "express-fileupload";

export class ProductController {
    constructor(
        private productService: ProductService,
        private storage: FileStorage,
    ) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const image = req.files!.image as UploadedFile;
        const imageName = uuidv4();
        await this.storage.upload({
            filename: imageName,
            fileData: image.data.buffer,
        });

        const {
            name,
            description,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublish,
            // image,
        } = req.body;
        const product = {
            name,
            description,
            priceConfiguration: JSON.parse(priceConfiguration as string),
            attributes: JSON.parse(attributes as string),
            tenantId,
            categoryId,
            image: imageName,
            isPublish,
        };
        // todo: add proper request body types
        const newProduct = await this.productService.createProduct(
            product as unknown as Product,
        );
        res.json({ id: newProduct._id });
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }
        const { productId } = req.params;

        let imageName: string | undefined;
        let oldImage: string | undefined;
        if (req.files?.image) {
            oldImage = await this.productService.getProductImage(productId);
            const image = req.files.image as UploadedFile;
            imageName = uuidv4();
            await this.storage.upload({
                filename: imageName,
                fileData: image.data.buffer,
            });
            await this.storage.delete(oldImage!);
        }

        const {
            name,
            description,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublish,
            // image,
        } = req.body;
        const product = {
            name,
            description,
            priceConfiguration: JSON.parse(priceConfiguration as string),
            attributes: JSON.parse(attributes as string),
            tenantId,
            categoryId,
            image: imageName ? imageName : (oldImage as string),
            isPublish,
        };
        await this.productService.updatedProduct(productId, product);
        res.json({ id: productId });
    };
}
