export default class Product {
    constructor({id, name, price, category, description, url_image}) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.description = description;
        this.url_image = url_image;
        this.image_public_id = id;

        this.validate();
    }

    validate() {
        if (!this.name || this.name.length < 3) {
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