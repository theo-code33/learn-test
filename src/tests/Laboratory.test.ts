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
})