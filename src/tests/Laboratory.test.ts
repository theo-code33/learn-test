import { test } from "@jest/globals"
import { Laboratory } from "../Laboratory/Laboratory";

describe('Classe Laboratory', () => {
  test("Obtenir la quantité d'une substance connue", () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);
    const quantity = laboratory.getQuantity("eau distillée");
    expect(quantity).toBe(0);
  })

  test("Obtenir la quantité d'une substance inconnue", () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);
    expect(() => {
      laboratory.getQuantity("potion magique");
    }).toThrow("Substance inconnue : potion magique");
  })

  test('Obtenir la quantité d\'une substance connue avec des majuscules', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);
    const quantity = laboratory.getQuantity("Eau Distillée");
    expect(quantity).toBe(0);
  })

  test('Ajouter une quantité à une substance connue et vérifier la quantité', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);
    
    laboratory.add("5 eau distillée");

    const quantity = laboratory.getQuantity("eau distillée");
    expect(quantity).toBe(5);
  })

  test('Ajouter une quantité à une substance inconnue', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);
    laboratory.add("3 potion magique");

    const quantity = laboratory.getQuantity("potion magique");
    expect(quantity).toBe(3);
  })

  test('Ajouter une quantité invalide à une substance', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);
    expect(() => {
      // @ts-ignore
      laboratory.add("eau distillée")
    }).toThrow("Quantité invalide dans : eau distillée");
  })

  test('Ajouter une quantité négative à une substance', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);
    expect(() => {
      laboratory.add("-5 eau distillée")
    }).toThrow("Quantité invalide dans : -5 eau distillée");
  })

  test('Ajouter une quantité de zéro à une substance', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);
    expect(() => {
      laboratory.add("0 eau distillée")
    }).toThrow("Quantité invalide dans : 0 eau distillée");
  })

  test('Ajouter une liste de susbtances réactionnel avec des quantités à une substance', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);

    laboratory.add("1 eau distillée", [
      "5 alcool éthylique",
      "2 acide sulfurique"
    ]);
    
    const distilledWaterQuantity = laboratory.getQuantity("eau distillée");

    expect(distilledWaterQuantity).toBe(1);
  })

  test('Ajouter une liste de susbtances réactionnel avec une quantité invalide à une substance', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);

    expect(() => {
      laboratory.add("1 eau distillée", [
        // @ts-ignore
        "alcool éthylique",
        "2 acide sulfurique"
      ]);
    }).toThrow("Quantité invalide dans : alcool éthylique");
  })

  test('Ajouter une liste de susbtances réactionnel avec une quantité négative à une substance', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);

    expect(() => {
      laboratory.add("1 eau distillée", [
        "-5 alcool éthylique",
        "2 acide sulfurique"
      ]);
    }).toThrow("Quantité invalide dans : -5 alcool éthylique");
  })

  test('Ajouter une liste de susbtances réactionnel avec une quantité zéro à une substance', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);

    expect(() => {
      laboratory.add("1 eau distillée", [
        "0 alcool éthylique",
        "2 acide sulfurique"
      ]);
    }).toThrow("Quantité invalide dans : 0 alcool éthylique");
  })

  test('Réaliser une substance avec des substances réactionnelles déjà existantes', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ]);

    laboratory.add("10 alcool éthylique");
    laboratory.add("5 acide sulfurique");

    laboratory.add("1 eau distillée", [
      "5 alcool éthylique",
      "2 acide sulfurique"
    ]);

    const createdDistilledWater = laboratory.make("eau distillée");
    
    expect(createdDistilledWater).toBe(2);
  })
})