/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { AppDataSource } from "../utils/database";

const categoryRepository = AppDataSource.getRepository(Category);

export const getAllCategories = async (_: Request, res: Response) => {
    const categories = await categoryRepository.find();
    res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = categoryRepository.create({ name });
    await categoryRepository.save(category);
    res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response): Promise<any> => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: 'Category ID and name are required.' });
    }

    try {
        // Find the existing category by its ID
        const category = await categoryRepository.findOne({ where: { id } });

        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        // Update the category's name
        category.name = name;

        // Save the updated category
        await categoryRepository.save(category);

        // Return the updated category in the response
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the category.' });
    }
};


export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    await categoryRepository.delete(id);
    res.status(204).send();
};
