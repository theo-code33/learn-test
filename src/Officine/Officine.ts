import { Ingredient } from "../Ingredient/Ingredient";

type Recette = Record<string, string[]>;

export class Officine {
    private stock: Map<string, Ingredient> = new Map();
    private recettes: Recette;

    constructor(recettes: Recette) {
        this.recettes = recettes;
    }

    public rentrer(saisie: string) {
        const { nom, quantite } = this.parseQuantiteEtNom(saisie);
        const ingr = this.stock.get(nom) || new Ingredient(nom);
        ingr.ajouter(quantite);
        this.stock.set(nom, ingr);
    }

    public quantite(nom: string): number {
        const normalise = new Ingredient(nom).nom;
        return this.stock.get(normalise)?.getQuantite() ?? 0;
    }

    public preparer(saisie: string): number {
        const { nom: potionNom, quantite: quantiteDemandee } = this.parseQuantiteEtNom(saisie);

        if (!this.recettes[potionNom]) throw new Error(`Recette inconnue : ${potionNom}`);
        const recette = this.recettes[potionNom];

        let maxPossible = Infinity;

        // Calculer combien on peut produire selon le stock
        for (const ingrStr of recette) {
            const { nom: ingrNom, quantite: qte } = this.parseQuantiteEtNom(ingrStr);
            const enStock = this.quantite(ingrNom);
            maxPossible = Math.min(maxPossible, Math.floor(enStock / qte));
        }

        const aProduire = Math.min(maxPossible, quantiteDemandee);
        if (aProduire === 0) return 0;

        // Déduire les ingrédients
        for (const ingrStr of recette) {
            const { nom: ingrNom, quantite: qte } = this.parseQuantiteEtNom(ingrStr);
            const ingr = this.stock.get(ingrNom)!;
            ingr.retirer(qte * aProduire);
        }

        // Ajouter la potion produite
        const potion = this.stock.get(potionNom) || new Ingredient(potionNom);
        potion.ajouter(aProduire);
        this.stock.set(potionNom, potion);

        return aProduire;
    }

    private parseQuantiteEtNom(saisie: string): { nom: string; quantite: number } {
        const parts = saisie.trim().split(" ");
        let quantite = parseInt(parts[0]);
        let nom: string;

        if (isNaN(quantite)) {
            quantite = 1;
            nom = saisie;
        } else {
            nom = parts.slice(1).join(" ");
        }

        const normalise = new Ingredient(nom).nom;
        return { nom: normalise, quantite };
    }

    public afficherStock() {
        console.log("--- Stock actuel ---");
        for (const ingr of this.stock.values()) {
            console.log(ingr.toString());
        }
        console.log("-------------------");
    }
}
