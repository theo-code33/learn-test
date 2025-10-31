import { describe, expect, test } from "@jest/globals";
import { Ingredient } from "../Ingredient/Ingredient";

describe("Classe Ingredient", () => {

    test("ajouter augmente la quantité", () => {
        const ingr = new Ingredient("œil de grenouille");
        expect(ingr.getQuantite()).toBe(0);

        ingr.ajouter(3);
        expect(ingr.getQuantite()).toBe(3);

        ingr.ajouter(2);
        expect(ingr.getQuantite()).toBe(5);
    });

    test("retirer diminue la quantité", () => {
        const ingr = new Ingredient("larme de brume funèbre", 5);
        ingr.retirer(2);
        expect(ingr.getQuantite()).toBe(3);

        ingr.retirer(3);
        expect(ingr.getQuantite()).toBe(0);
    });

    test("retirer plus que le stock déclenche une erreur", () => {
        const ingr = new Ingredient("croc de troll", 2);
        expect(() => ingr.retirer(3)).toThrow("Stock insuffisant");
    });

    test("ajouter une quantité négative déclenche une erreur", () => {
        const ingr = new Ingredient("pincée de poudre de lune", 1);
        expect(() => ingr.ajouter(-1)).toThrow("Quantité négative");
    });

    test("retirer une quantité négative déclenche une erreur", () => {
        const ingr = new Ingredient("radicelle de racine hurlante", 1);
        expect(() => ingr.retirer(-1)).toThrow("Quantité négative");
    });

    test("normalisation des noms singulier/pluriel", () => {
        const ingr1 = new Ingredient("yeux de grenouille");
        const ingr2 = new Ingredient("œil de grenouille");
        expect(ingr1.nom).toBe("œil de grenouille");
        expect(ingr2.nom).toBe("œil de grenouille");

        const ingr3 = new Ingredient("larmes de brume funèbre");
        const ingr4 = new Ingredient("larme de brume funèbre");
        expect(ingr3.nom).toBe("larme de brume funèbre");
        expect(ingr4.nom).toBe("larme de brume funèbre");
    });

    test("toString renvoie la bonne chaîne", () => {
        const ingr = new Ingredient("fragment d'écaille de dragonnet", 4);
        expect(ingr.toString()).toBe("4 fragment d'écaille de dragonnet");
    });

    test("initialisation avec quantité personnalisée", () => {
        const ingr = new Ingredient("goutte de sang de citrouille", 7);
        expect(ingr.getQuantite()).toBe(7);
    });

});