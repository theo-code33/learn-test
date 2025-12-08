export class Ingredient {
    public name: string;
    private quantity: number;

    constructor(name: string, quantity = 0) {
        this.name = this.parseName(name);
        this.quantity = quantity;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public add(qte: number) {
        if (qte < 0) throw new Error("Negative quantity");
        this.quantity += qte;
    }

    public remove(qte: number) {
        if (qte < 0) throw new Error("Negative quantity");
        if (qte > this.quantity) throw new Error("Insufficient Stock");
        this.quantity -= qte;
    }

    private parseName(name: string): string {
        name = name.toLowerCase().trim();
        if (name.startsWith("yeux de grenouille")) return "œil de grenouille";
        if (name.startsWith("œil de grenouille")) return "œil de grenouille";
        if (name.startsWith("larmes de brume funèbre") || name.startsWith("larme de brume funèbre"))
            return "larme de brume funèbre";
        if (name.startsWith("radicelles de racine hurlante") || name.startsWith("radicelle de racine hurlante"))
            return "radicelle de racine hurlante";
        if (name.startsWith("pincées de poudre de lune") || name.startsWith("pincée de poudre de lune"))
            return "pincée de poudre de lune";
        if (name.startsWith("crocs de troll") || name.startsWith("croc de troll"))
            return "croc de troll";
        if (name.startsWith("fragments d'écaille de dragonnet") || name.startsWith("fragment d'écaille de dragonnet"))
            return "fragment d'écaille de dragonnet";
        if (name.startsWith("gouttes de sang de citrouille") || name.startsWith("goutte de sang de citrouille"))
            return "goutte de sang de citrouille";
        return name;
    }

    public toString(): string {
        return `${this.quantity} ${this.name}`;
    }
}