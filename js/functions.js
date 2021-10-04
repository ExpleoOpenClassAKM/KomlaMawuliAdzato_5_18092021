//====> Variables pour stocker toute notre recette
let allRecipes = [];
let allRecipesObjects = [];

//====> Variables pour les filtres
let allElementsFilters = [];
let activeFilters = [];  //===> Filtres actifs
let totalFiltersClicked = 0;


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

function getFilters() {

    let allIngredientsFilters = [];
    let allAppliancesFilters = [];
    let allUstensilsFilters = [];

    
    allRecipes.forEach(function(OneRecipe) {

        //Filtre pour tous les noms d'ingredients
        OneRecipe.ingredients.forEach(function(OneIngredient) {
            if (allIngredientsFilters.includes(OneIngredient.name) === false) {
                allIngredientsFilters.push(OneIngredient.name)
            }
        });
        

        //Filtre pour tous les noms de plats
        OneRecipe.appliances.forEach(function(OneAppliance) {
            if (allAppliancesFilters.includes(OneAppliance.name) === false) {
                allAppliancesFilters.push(OneAppliance.name)
            }
        });
        

        //Filtre pour tous les noms d'ustensiles
        OneRecipe.ustensils.forEach(function(OneUstensil) {
            if (allUstensilsFilters.includes(OneUstensil.name) === false) {
                allUstensilsFilters.push(OneUstensil.name)
            }
        });
        
    })
    //Filtres contenant tous les éléments filtrés
    allElementsFilters = [allAppliancesFilters, allIngredientsFilters, allUstensilsFilters];
    displayFilters();
}

function displayFilters() {
    
    //====> Fait la liaison entre: 
    // "allElementsFilters[0] (allAppliancesFilters)
    // "allElementsFilters[1] (allIngredientsFilters)
    // "allElementsFilters[2] (allUstensilsFilters)
    // et leurs conteneurs respectifs
    let arrayConfiguration = [
        "allAppliancesFilters",  //=======> 0
        "allIngredientsFilters",  //=======> 1
        "allUstensilsFilters"   //=======> 2
    ]
    
    //====> Bouclage sur le tableau de config pour y mettre tous les filtres
    arrayConfiguration.forEach(function(containerName, index) {

        //==> Récupération du containeur du filtre courant
        let container = document.getElementById(containerName);

        //==> Vidage du conteneur courant de son contenu
        container.textContent = "";

        //==> Ajout de chaque valeur du filtre créé plus haut
        allElementsFilters[index].forEach(function(OneElement) {
            let elementToAdd = document.createElement('div');
            elementToAdd.classList.add("tagDesignation") //Classe de la "div" de l'élément 
            elementToAdd.textContent = OneElement;
            if (activeFilters.includes(OneElement) === false) {
                elementToAdd.classList("pointer") //===> Pointer l'élément au survol de la sourcis
                elementToAdd.addEventListener("click", function() {
                    activeFilters.push(OneElement)
                    addFilter(OneElement, index) // Ajout le nouvel élément dans le "Badge"
                })
            } else {
                elementToAdd.classList("line-through") //===> Barre l'élément s'il est déjà sélectionné
            }
            container.appendChild(elementToAdd) //Crée l'élément
        })
    })
};


//Créer des évenements pour les filtres
//=====> Cacher les éléments au départ
let ingredientsHidden = true;
let appliancesHidden = true;
let ustensilesHidden = true;

//=====> Fonction liée aux évenements des filtres
function createEventsForFilters() {

    document.getElementById("displayIngredients").addEventListener("click", function() {
        ingredientsHidden = !ingredientsHidden;
        document.getElementById("allIngredients").hidden = ingredientsHidden;
    });

    document.getElementById("displayAppliances").addEventListener("click", function() {
        appliancesHidden = !appliancesHidden;
        document.getElementById("allAppliances").hidden = appliancesHidden;
    });

    document.getElementById("displayUstensils").addEventListener("click", function() {
        ustensilesHidden = !ustensilesHidden;
        document.getElementById("allUstensils").hidden = ustensilesHidden;
    })
}


//====> Fonction pour ajouter les filtres
function addFilter(filteredElement, typeOfElement) {

    totalFiltersClicked += 1 //Incrémentation du nombre d'éléments cliqués

    let type = [
        "appliances", //====> 0
        "ingredients", //====> 1
        "ustensils" //====> 2
    ];

    addFilterBox(filteredElement, typeOfElement)

    allRecipesObjects.forEach(function(OneRecipe) {
        if (type[typeOfElement] === "appliances") {
            OneRecipe.appliances.forEach(function(OneAppliance) {
                if (filteredElement === OneAppliance.name) {
                    OneRecipe.hasFilters += 1;
                }
            })
        }

        if (type[typeOfElement] === "ingredients") {
            OneRecipe.ingredients.forEach(function(OneIngredient) {
                if (filteredElement === OneIngredient.name) {
                    OneRecipe.hasFilters += 1;
                }
            })
        }

        if (type[typeOfElement] === "ustensils") {
            OneRecipe.ustensils.forEach(function(OneUstensil) {
                if (filteredElement === OneUstensil.name) {
                    OneRecipe.hasFilters += 1;
                }
            })
        }
    });
    getValidReceipes();
}


function removeFilter(filteredElement, typeOfElement) {

    totalFiltersClicked -= 1;

    let type = [
        "appliances", //====> 0
        "ingredients", //====> 1
        "ustensils" //====> 2
    ];

    allRecipes.forEach(function(OneRecipe) {
        if (type[OneElement] === "appliances") {
            OneRecipe.appliances.forEach(function(OneAppliance) {
                if (filteredElement === OneAppliance.name) {
                    OneRecipe.hasFilters -= 1;
                }
            })
        }

        if (type[OneElement] === "ingredients") {
            OneRecipe.ingredients.forEach(function(OneIngredient) {
                if (filteredElement === OneIngredient.name) {
                    OneRecipe.hasFilters -= 1;
                }
            })
        }

        if (type[OneElement] === "ustensils") {
            OneRecipe.ustensils.forEach(function(OneUstensil) {
                if (filteredElement === OneUstensil.name) {
                    OneRecipe.hasFilters -= 1;
                }
            })
        }
    })
    getValidReceipes();
}


function getValidReceipes(input = false) {

    let validRecipes = [];
    allRecipesObjects.forEach(function(OneRecipe) {
        if (OneRecipe.hasFilters === totalFiltersClicked) {
            if (input !== false) {
                if (OneRecipe.name.includes(input)) {
                    validRecipes.push(OneRecipe);
                }
            } else {
                validRecipes.push(OneRecipe);
            }
        }
    });
    allRecipes = validRecipes;
    displayRecipes();
    getFilters();
}

