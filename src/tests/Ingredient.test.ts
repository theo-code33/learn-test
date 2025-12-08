import { describe, expect, test } from "@jest/globals";
import { Ingredient } from "../Ingredient/Ingredient";

describe("Classe Ingredient", () => {

    // cas usuels
    test("augmenter la quantité", () => {
        const ingr = new Ingredient("œil de grenouille");
        expect(ingr.getQuantity()).toBe(0);

        ingr.add(3);
        expect(ingr.getQuantity()).toBe(3);

        ingr.add(2);
        expect(ingr.getQuantity()).toBe(5);
    });

    test("retirer diminue la quantité", () => {
        const ingr = new Ingredient("larme de brume funèbre", 5);
        ingr.remove(2);
        expect(ingr.getQuantity()).toBe(3);

        ingr.remove(3);
        expect(ingr.getQuantity()).toBe(0);
    });

       test("normalisation des noms singulier/pluriel", () => {
        const ingr1 = new Ingredient("yeux de grenouille");
        const ingr2 = new Ingredient("œil de grenouille");
        expect(ingr1.name).toBe("œil de grenouille");
        expect(ingr2.name).toBe("œil de grenouille");

        const ingr3 = new Ingredient("larmes de brume funèbre");
        const ingr4 = new Ingredient("larme de brume funèbre");
        expect(ingr3.name).toBe("larme de brume funèbre");
        expect(ingr4.name).toBe("larme de brume funèbre");
    });

    test("toString renvoie la bonne chaîne", () => {
        const ingr = new Ingredient("fragment d'écaille de dragonnet", 4);
        expect(ingr.toString()).toBe("4 fragment d'écaille de dragonnet");
    });

    test("initialisation avec quantité personnalisée", () => {
        const ingr = new Ingredient("goutte de sang de citrouille", 7);
        expect(ingr.getQuantity()).toBe(7);
    });

    // cas d'erreurs
    test("retirer plus que le stock déclenche une erreur", () => {
        const ingr = new Ingredient("croc de troll", 2);
        expect(() => ingr.remove(3)).toThrow("Insufficient Stock");
    });

    test("ajouter une quantité négative déclenche une erreur", () => {
        const ingr = new Ingredient("pincée de poudre de lune", 1);
        expect(() => ingr.add(-1)).toThrow("Negative quantity");
    });

    test("retirer une quantité négative déclenche une erreur", () => {
        const ingr = new Ingredient("radicelle de racine hurlante", 1);
        expect(() => ingr.remove(-1)).toThrow("Negative quantity");
    });
});