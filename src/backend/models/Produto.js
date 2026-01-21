export default class Product {
    constructor({id, title, price, category, description, image}) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description ?? null;
        this.image = image ?? null;

        this.validate();
    }

    validate() {
        if (!this.title || this.title.length < 3) {
            throw new Error("Nome do produto inválido");
        }

        if (this.price <= 0) {
            throw new Error("Preço deve ser maior que zero");
        }

        if (!this.category) {
            throw new Error("Categoria obrigatória");
        }
    }
}