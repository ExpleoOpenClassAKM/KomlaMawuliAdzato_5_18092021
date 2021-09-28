//Ici la classe pour "recipes"
class Recipe {
    constructor (name, time, description) {
      this.name = name;
      this.time = time;
      this.description = description;  
      this.ingredients = [];
      this.appliances = [];
      this.ustensils = [];
    }
    //Ici on crée une méthode pour ajouter des instances "ingredients" à la classe "Recipe"
    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    //Ici on crée une méthode pour ajouter des instances "appliances" à la classe "Recipe"
    addAppliance(appliance) {
        this.appliances.push(appliance);
    }

    //Ici on crée une méthode pour ajouter des instances "ustensils" à la classe "Recipe"
    addUstensil(ustensil) {
        this.ustensils.push(ustensil);
    }
}

//Ici la classe "Ingredient"
class Ingredient {
    constructor(name, quantity, unit = '') {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}

//Ici la classe "Appliance"
class Appliance {
    constructor(name) {
        this.name = name;
    }
}

//Ici la classe "Ustensil"
class Ustensil {
    constructor(name) {
        this.name = name;
    }
}
