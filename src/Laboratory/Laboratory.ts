export class Laboratory {
  private knownSubstances: Array<string> = [];
  private substancesQuantities: Map<string, number> = new Map();

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
}