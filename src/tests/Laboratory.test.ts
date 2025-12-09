import { test } from "@jest/globals"
import { Laboratory } from "../Laboratory/Laboratory";

describe('Classe Laboratory', () => {
  test("Obtenir la quantité d'une substance connue", () => {
    const laboratory = new Laboratory();
    const quantity = laboratory.getQuantity("eau distillée");
    expect(quantity).toBe(0);
  })
})