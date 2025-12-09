import { SubstanceQuantity } from "../types/laboratory.types";

export class Laboratory {
  private knownSubstances: Array<string> = [];
  private substancesQuantities: Map<string, number> = new Map();
  private dictionary: Map<string, Array<SubstanceQuantity>> = new Map();

  constructor(knownSubstances: Array<string>) {
    this.knownSubstances = knownSubstances;
  }

  public getQuantity(substance: string): number {
    const normalize = substance.trim().toLowerCase();
    const isKnown = this.knownSubstances.includes(normalize);
    if (!isKnown) {
      throw new Error(`Substance inconnue : ${substance}`);
    }
    return this.substancesQuantities.get(substance) || 0;
  }

  public add(substance: SubstanceQuantity, reactionSubstances?: Array<SubstanceQuantity>): void {
    const parts = substance.trim().split(" ");
    let quantity = parseInt(parts[0]);
    let name: string;

    if (isNaN(quantity)) {
      throw new Error(`Quantité invalide dans : ${substance}`);
    } else {
      name = parts.slice(1).join(" ").trim().toLowerCase();
    }

    const normalize = name.trim().toLowerCase();
    const isKnown = this.knownSubstances.includes(normalize);
    if(!isKnown) {
      this.substancesQuantities.set(normalize, quantity);
      this.knownSubstances.push(normalize);
      if(reactionSubstances && reactionSubstances.length > 0) {
        const normalizeNewReactionSubstances = reactionSubstances.map((reactionSubstance) => {
          const reactionParts = reactionSubstance.trim().split(" ");
          let reactionQuantity = parseInt(reactionParts[0]);

          if (isNaN(reactionQuantity)) {
            throw new Error(`Quantité invalide dans : ${reactionSubstance}`);
          }
          return reactionSubstance.trim().toLowerCase() as SubstanceQuantity;
        });
        const existingReactions = this.dictionary.get(normalize) || [];
        this.dictionary.set(normalize, existingReactions.concat(normalizeNewReactionSubstances));
      }
    } else {
      const currentQuantity = this.substancesQuantities.get(normalize) || 0;
      const newQuantity = currentQuantity + quantity;
      this.substancesQuantities.set(normalize, newQuantity);
    }
  }
}