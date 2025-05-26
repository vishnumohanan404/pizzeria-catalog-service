import mongoose from "mongoose";

export interface Product {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    priceConfiguration: string;
    attributes: string[];
    tenantId: string;
    categoryId: string;
    image: string;
    isPublish: boolean;
}

export interface Filter {
    tenantId?: string;
    categoryId?: mongoose.Types.ObjectId;
    isPublish?: boolean;
    search?: string;
}

export interface PaginateQuery {
    page?: number;
    limit?: number;
}
