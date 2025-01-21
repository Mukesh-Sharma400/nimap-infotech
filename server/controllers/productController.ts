/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Product } from "../entities/Product";
import { AppDataSource } from "../utils/database";

const productRepository = AppDataSource.getRepository(Product);

export const getProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

        if (page <= 0 || pageSize <= 0) {
            return res.status(400).json({ message: "Page and pageSize must be positive integers." });
        }

        const skip = (page - 1) * pageSize;

        const [products, total] = await productRepository.findAndCount({
            relations: ["category"],
            skip,
            take: pageSize,
            order: { id: "ASC" },
        });

        res.json({
            data: products,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const createProduct = async (req: Request, res: Response) => {
    const { name, categoryId } = req.body;
    const product = productRepository.create({ name, categoryId });
    await productRepository.save(product);
    res.status(201).json(product);
};


export const updateProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, categoryId } = req.body;

        const product = await productRepository.findOne({ where: { id: parseInt(id, 10) } });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = name;
        product.categoryId = categoryId;

        await productRepository.save(product);

        return res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await productRepository.delete(id);
    res.status(204).send();
};
