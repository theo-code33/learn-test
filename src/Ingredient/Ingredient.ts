export class Ingredient {
    public nom: string;
    private quantite: number;

    constructor(nom: string, quantite = 0) {
        this.nom = this.normaliserNom(nom);
        this.quantite = quantite;
    }

    public getQuantite(): number {
        return this.quantite;
    }

    public ajouter(qte: number) {
        if (qte < 0) throw new Error("Quantité négative");
        this.quantite += qte;
    }

    public retirer(qte: number) {
        if (qte < 0) throw new Error("Quantité négative");
        if (qte > this.quantite) throw new Error("Stock insuffisant");
        this.quantite -= qte;
    }

    private normaliserNom(nom: string): string {
        nom = nom.toLowerCase().trim();
        if (nom.startsWith("yeux de grenouille")) return "œil de grenouille";
        if (nom.startsWith("œil de grenouille")) return "œil de grenouille";
        if (nom.startsWith("larmes de brume funèbre") || nom.startsWith("larme de brume funèbre"))
            return "larme de brume funèbre";
        if (nom.startsWith("radicelles de racine hurlante") || nom.startsWith("radicelle de racine hurlante"))
            return "radicelle de racine hurlante";
        if (nom.startsWith("pincées de poudre de lune") || nom.startsWith("pincée de poudre de lune"))
            return "pincée de poudre de lune";
        if (nom.startsWith("crocs de troll") || nom.startsWith("croc de troll"))
            return "croc de troll";
        if (nom.startsWith("fragments d'écaille de dragonnet") || nom.startsWith("fragment d'écaille de dragonnet"))
            return "fragment d'écaille de dragonnet";
        if (nom.startsWith("gouttes de sang de citrouille") || nom.startsWith("goutte de sang de citrouille"))
            return "goutte de sang de citrouille";
        return nom;
    }

    public toString(): string {
        return `${this.quantite} ${this.nom}`;
    }
}