import { Product, SubstanceQuantity } from "../types/laboratory.types";

export class Laboratory {
  private quantities: Map<string, number> = new Map();
  private dictionary: Map<string, Array<Product>> = new Map();

  constructor(knownSubstances: Array<string>, dictionary: Map<string, Array<Product>>) {
    if (!Array.isArray(knownSubstances) || knownSubstances.length === 0) {
      throw new Error("Aucune substance connue fournie");
    }

    const baseSubstances = new Set<string>();

    knownSubstances.forEach((substance) => {
      const normalized = this.normalizeSubstanceName(substance);
      if (!normalized) {
        throw new Error(`Substance invalide : ${substance}`);
      }
      baseSubstances.add(normalized);

      if (!this.quantities.has(normalized)) {
        this.quantities.set(normalized, 0);
      }
    });

    const productNames = new Set<string>();
    dictionary?.forEach((_ingredients, product) => {
      const normalizedProduct = this.normalizeSubstanceName(product);
      if (!normalizedProduct) {
        throw new Error(`Produit invalide : ${product}`);
      }
      productNames.add(normalizedProduct);
    });

    const allowedNames = new Set<string>([...baseSubstances, ...productNames]);

    dictionary?.forEach((ingredients, product) => {
      const normalizedProduct = this.normalizeSubstanceName(product)

      const normalizedIngredients = ingredients.map((ingredient) => {
        const normalizedIngredient = this.normalizeSubstanceName(ingredient.name);
        if (!allowedNames.has(normalizedIngredient)) {
          throw new Error(`Substance inconnue dans la réaction : ${ingredient.name}`);
        }
        if (typeof ingredient.quantity !== "number" || ingredient.quantity <= 0) {
          throw new Error(`Quantité invalide dans la réaction : ${ingredient.name}`);
        }
        return { name: normalizedIngredient, quantity: ingredient.quantity };
      });

      this.dictionary.set(normalizedProduct, normalizedIngredients);

      if (!this.quantities.has(normalizedProduct)) {
        this.quantities.set(normalizedProduct, 0);
      }
    });
  }

  private normalizeSubstanceName(substance: string): string {
    return substance.trim().toLowerCase();
  }

  private ensureKnown(substance: string, originalLabel: string): void {
    if (!this.quantities.has(substance)) {
      throw new Error(`Substance inconnue : ${originalLabel}`);
    }
  }

  public getQuantity(substance: string): number {
    const normalize = this.normalizeSubstanceName(substance);
    this.ensureKnown(normalize, substance);
    return this.quantities.get(substance) || 0;
  }

  public add(substance: SubstanceQuantity): void {
    const parts = substance.trim().split(" ");
    let quantity = parseFloat(parts[0]);
    let name: string;

    if (isNaN(quantity) || quantity <= 0) {
      throw new Error(`Quantité invalide dans : ${substance}`);
    } else {
      name = this.normalizeSubstanceName(parts.slice(1).join(" "))
    }

    const normalize = this.normalizeSubstanceName(name);
    this.ensureKnown(normalize, name);
    const currentQuantity = this.quantities.get(normalize) ?? 0;
    const newQuantity = currentQuantity + quantity;
    this.quantities.set(normalize, newQuantity);
  }
}