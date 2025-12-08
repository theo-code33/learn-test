import { Officine } from "../Officine/Officine";
import { RECIPES } from "../utils/contants";

describe('Classe Officine', () => {
  // cas usuels
  test("Ajouter des ingrédients au stock", () => {
    const officine = new Officine({});
    officine.add("3 yeux de grenouille");
    expect(officine.quantity("yeux de grenouille")).toBe(3);

    officine.add("2 yeux de grenouille");
    expect(officine.quantity("yeux de grenouille")).toBe(5);
  })

  test("Préparer une potion avec des ingrédients en stock", () => {
    const officine = new Officine(RECIPES);
    officine.add("2 larmes de brume funèbre");
    officine.add("1 goutte de sang de citrouille");
    
    officine.prepare("fiole de glaires purulentes");
    expect(officine.quantity("fiole de glaires purulentes")).toBe(1);
    expect(officine.quantity("larmes de brume funèbre")).toBe(0);
    expect(officine.quantity("goutte de sang de citrouille")).toBe(0);
  })

  test("Préparer une potion sans ingrédients en stock", () => {
    const officine = new Officine(RECIPES);

    officine.prepare("fiole de glaires purulentes");
    expect(officine.quantity("fiole de glaires purulentes")).toBe(0);
  })

  test("Afficher les stocks d'ingrédients", () => {
    const officine = new Officine(RECIPES);
    
  })

  test("Préparer une potion avec des ingrédients qui doivent être produit", () => {
    const officine = new Officine(RECIPES);
    // Add ingredients for 1 fiole de glaires purulentes
    officine.add("2 larmes de brume funèbre");
    officine.add("1 goutte de sang de citrouille");

    const produced = officine.prepare("1 fiole de glaires purulentes");
    expect(produced).toBe(1);

    // Now add ingredients for 1 baton de pâte sépulcrale
    officine.add("3 radicelles de racine hurlante");
    // We already have 1 fiole de glaires purulentes in stock from previous preparation

    const producedBaton = officine.prepare("1 baton de pâte sépulcrale");
    expect(producedBaton).toBe(1);
    expect(officine.quantity("baton de pâte sépulcrale")).toBe(1);
    expect(officine.quantity("fiole de glaires purulentes")).toBe(0);
    expect(officine.quantity("radicelles de racine hurlante")).toBe(0);
  })
})