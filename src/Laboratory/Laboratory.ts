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

  private addReactionSubstances(substance: string, reactionSubstances: Array<SubstanceQuantity>): void {
    const normalize = substance.trim().toLowerCase();
    const normalizeNewReactionSubstances = reactionSubstances.map((reactionSubstance) => {
      const reactionParts = reactionSubstance.trim().split(" ");
      let reactionQuantity = parseInt(reactionParts[0]);

      if (isNaN(reactionQuantity) || reactionQuantity <= 0) {
        throw new Error(`Quantité invalide dans : ${reactionSubstance}`);
      }
      return reactionSubstance.trim().toLowerCase() as SubstanceQuantity;
    });
    const haveReactionSubstances = this.dictionary.get(normalize);
    if(haveReactionSubstances) {
      const updatedReactionSubstances = haveReactionSubstances.concat(normalizeNewReactionSubstances);
      this.dictionary.set(normalize, updatedReactionSubstances);
    } else {
      this.dictionary.set(normalize, normalizeNewReactionSubstances);
    }
  }

  public add(substance: SubstanceQuantity, reactionSubstances?: Array<SubstanceQuantity>): void {
    const parts = substance.trim().split(" ");
    let quantity = parseInt(parts[0]);
    let name: string;

    if (isNaN(quantity) || quantity <= 0) {
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
        this.addReactionSubstances(normalize, reactionSubstances);
      }
    } else {
      const currentQuantity = this.substancesQuantities.get(normalize) || 0;
      const newQuantity = currentQuantity + quantity;
      this.substancesQuantities.set(normalize, newQuantity);
      if(reactionSubstances && reactionSubstances.length > 0) {
        this.addReactionSubstances(normalize, reactionSubstances);
      }
    }
  }

  public make(substance: string): number {
    const normalize = substance.trim().toLowerCase();
    const isKnown = this.knownSubstances.includes(normalize);
    let createdQuantity = 0;
    let canMake = true;
    if (!isKnown) {
      throw new Error(`Substance inconnue : ${substance}`);
    }
    
    const reactionSubstances = this.dictionary.get(normalize);
    if (!reactionSubstances || reactionSubstances.length === 0) {
      throw new Error(`Aucune réaction définie pour : ${substance}`);
    }

    do {
      for (const reactionSubstance of reactionSubstances) {
        const parts = reactionSubstance.trim().split(" ");
        let quantity = parseInt(parts[0]);
        let name = parts.slice(1).join(" ").trim().toLowerCase();

        const currentQuantity = this.substancesQuantities.get(name) || 0;
        if (currentQuantity < quantity) {
          canMake = false;
          break;
        }
      }

      if (canMake === true) {
        for (const reactionSubstance of reactionSubstances) {
          const parts = reactionSubstance.trim().split(" ");
          let quantity = parseInt(parts[0]);
          let name = parts.slice(1).join(" ").trim().toLowerCase();

          const currentQuantity = this.substancesQuantities.get(name) || 0;
          this.substancesQuantities.set(name, currentQuantity - quantity);
        }
        createdQuantity += 1;
      }
    } while (canMake === true);

    const currentQuantity = this.substancesQuantities.get(normalize) || 0;
    this.substancesQuantities.set(normalize, currentQuantity + createdQuantity);

    return createdQuantity;
  }
}