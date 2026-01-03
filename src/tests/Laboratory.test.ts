import { test } from "@jest/globals"
import { Laboratory } from "../Laboratory/Laboratory";
import { Product } from "../types/laboratory.types";

describe('Classe Laboratory', () => {
  test("Obtenir la quantité d'une substance connue", () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ], new Map());
    const quantity = laboratory.getQuantity("eau distillée");
    expect(quantity).toBe(0);
  })

  test("Obtenir la quantité d'une substance inconnue", () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ], new Map());
    expect(() => {
      laboratory.getQuantity("potion magique");
    }).toThrow("Substance inconnue : potion magique");
  })

  test('Obtenir la quantité d\'une substance connue avec des majuscules', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ], new Map());
    const quantity = laboratory.getQuantity("Eau Distillée");
    expect(quantity).toBe(0);
  })

  test('Ajouter une quantité à une substance connue et vérifier la quantité', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ], new Map());

    laboratory.add("5 eau distillée");

    const quantity = laboratory.getQuantity("eau distillée");
    expect(quantity).toBe(5);
  })

  test('Ajouter une substance inconnue', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ], new Map());

    expect(() => laboratory.add("3 potion magique")).toThrow("Substance inconnue : potion magique");
  })

  test('Ajouter une quantité invalide à une substance', () => {
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique"
    ], new Map());
    expect(() => {
      // @ts-ignore
      laboratory.add("eau distillée")
    }).toThrow("Quantité invalide dans : eau distillée");
  })

  test('Ajouter un dictionnaire de réactions chimiques', () => {
    const dictionary = new Map<string, Array<Product>>([
      ["potion magique", [{ name: "herbe rare", quantity: 2 }, { name: "eau distillée", quantity: 1 }]],
      ["élixir de vie", [{ name: "potion magique", quantity: 3 }, { name: "alcool éthylique", quantity: 2 }]]
    ])
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique",
      "herbe rare"
    ], dictionary);

    expect(laboratory).toBeInstanceOf(Laboratory);
  })

  test('Ajouter une réaction chimique inconnue', () => {
    const dictionary = new Map<string, Array<Product>>([
      ["potion magique", [{ name: "herbe rare", quantity: 2 }, { name: "eau distillée", quantity: 1 }]],
      ["élixir de vie", [{ name: "potion magique", quantity: 3 }, { name: "eau distillée", quantity: 2 }]]
    ])
    const laboratory = new Laboratory([
      "eau distillée",
      "alcool éthylique",
      "acide sulfurique",
      "herbe rare"
    ], dictionary);

    const quantity = laboratory.getQuantity("élixir de vie");
    expect(quantity).toBe(0)
  })
})