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

  public add(substance: string, quantity: number): void {
    const normalize = substance.trim().toLowerCase();
    const isKnown = this.knownSubstances.includes(normalize);
    if(!isKnown) {
      this.substancesQuantities.set(normalize, quantity);
      this.knownSubstances.push(normalize);
    } else {
      const currentQuantity = this.substancesQuantities.get(normalize) || 0;
      const newQuantity = currentQuantity + quantity;
      this.substancesQuantities.set(normalize, newQuantity);
    }
  }
}