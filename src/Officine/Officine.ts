import { Ingredient } from "../Ingredient/Ingredient";

type Recipes = Record<string, string[]>;

export class Officine {
    private stock: Map<string, Ingredient> = new Map();
    private recipes: Recipes;

    constructor(recipes: Recipes) {
        this.recipes = recipes;
    }

    public add(search: string) {
        const { name, quantity } = this.parseQuantityAndName(search);
        const ingr = this.stock.get(name) || new Ingredient(name);
        ingr.add(quantity);
        this.stock.set(name, ingr);
    }

    public quantity(name: string): number {
        const normalize = new Ingredient(name).name;
        return this.stock.get(normalize)?.getQuantity() ?? 0;
    }

    public prepare(search: string): number {
        const { name: potionName, quantity: quantityWished } = this.parseQuantityAndName(search);

        if (!this.recipes[potionName]) throw new Error(`Recipes unknown : ${potionName}`);
        const recipes = this.recipes[potionName];

        let maxPossible = Infinity;

        // Count how many we can produce based on stock
        for (const ingrStr of recipes) {
            const { name: ingrName, quantity: qte } = this.parseQuantityAndName(ingrStr);
            const inStock = this.quantity(ingrName);
            maxPossible = Math.min(maxPossible, Math.floor(inStock / qte));
        }

        const toProduce = Math.min(maxPossible, quantityWished);
        if (toProduce === 0) return 0;

        // Remove ingredients from stock
        for (const ingrStr of recipes) {
            const { name: ingrName, quantity: qte } = this.parseQuantityAndName(ingrStr);
            const ingr = this.stock.get(ingrName)!;
            ingr.remove(qte * toProduce);
        }

        // Add the produced potion to stock
        const potion = this.stock.get(potionName) || new Ingredient(potionName);
        potion.add(toProduce);
        this.stock.set(potionName, potion);

        return toProduce;
    }

    private parseQuantityAndName(search: string): { name: string; quantity: number } {
        const parts = search.trim().split(" ");
        let quantity = parseInt(parts[0]);
        let name: string;

        if (isNaN(quantity)) {
            quantity = 1;
            name = search;
        } else {
            name = parts.slice(1).join(" ");
        }

        const normalise = new Ingredient(name).name;
        return { name: normalise, quantity };
    }

    public printStock() {
        console.log("--- Current Stock ---");
        for (const ingredient of this.stock.values()) {
            console.log(ingredient.toString());
        }
        console.log("-------------------");
    }
}
