//Variables pour stocker toute notre recette
let allRecipes = [];
let allRecipesObjects = [];

//===========================================================
//Ici on crée une fonction pour récupérer tous les éléments du fichier "recipes" qu'on va stocker dans "allRecipes"
function createRecipesObject() {

    //On boucle sur l'ensemble des recettes du fichier recipes.js
    recipes.forEach(function(OneRecipe) {

        //Instanciation de la recette
        let OneNewRecipeObject = new Recipe(OneRecipe.name, OneRecipe.time, OneRecipe.description);

        //Ajout des ingredients à notre recette
        OneRecipe.ingredients.forEach(function(OneIngredient) {
            let OneIngredientObject = new Ingredient(OneIngredient.ingredient, OneIngredient.quantity, OneIngredient.unit);
            OneNewRecipeObject.addIngredient(OneIngredientObject);
        });

        //Ajout des plats à notre recette
        let OneApplianceObject = new Appliance(OneRecipe.appliance);
        OneNewRecipeObject.addAppliance(OneApplianceObject);

        //Ajout des ustensiles à notre recette
        OneRecipe.ustensils.forEach(function(OneUstensil) {
            let OneUstensilObject = new Ustensil(OneUstensil);
            OneNewRecipeObject.addUstensil(OneUstensilObject);
        })
        
        //Ici on vient stocker toute notre recette dans "allRecipes"
        allRecipes.push(OneNewRecipeObject);
    });
    allRecipesObjects = allRecipes;
}

//=========================================================
//Fonction pour les filtres: "ingredients", "appareils", "ustensiles"
