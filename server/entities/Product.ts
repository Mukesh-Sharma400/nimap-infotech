import { Category } from "./Category";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    categoryId!: number;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: "CASCADE" })
    @JoinColumn({ name: "categoryId" })
    category!: Category;
}
