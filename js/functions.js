//====> Variables pour stocker toute notre recette
let allRecipes = [];
let allRecipesObjects = [];

//====> Variables pour les filtres
let allElementsFilters = [];
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


let activeFilters = [];  //===> Filtres actifs

function displayFilters() {
    
    //====> Fait la liaison entre: 
    // "allElementsFilters[0] (allAppliancesFilters)
    // "allElementsFilters[1] (allIngredientsFilters)
    // "allElementsFilters[2] (allUstensilsFilters)
    // et leurs conteneurs respectifs
    let arrayConfig = [
        "allAppliances",  //=======> 0
        "allIngredients",  //=======> 1
        "allUstensils"   //=======> 2
    ]
    
    //====> Bouclage sur le tableau de config pour y mettre tous les filtres
    arrayConfig.forEach(function(containerName, index) {

        //==> Récupération du containeur du filtre courant
        let container = document.getElementById(containerName);
        
        //==> Vidage du conteneur courant de son contenu
        container.textContent = "";

        //==> Ajout de chaque valeur du filtre créé plus haut
        allElementsFilters[index].forEach(function(OneElement) {
            let elementToAdd = document.createElement("div");
            elementToAdd.classList.add("col-4") //Classe de la "div" de l'élément (à modifier "col-4")
            elementToAdd.textContent = OneElement;
            if (activeFilters.includes(OneElement) === false) {
                elementToAdd.classList.add("pointer") //===> Pointer l'élément au survol de la sourcis
                elementToAdd.addEventListener("click", function() {
                    activeFilters.push(OneElement)
                    addFilter(OneElement, index) // Ajout le nouvel élément dans le "Badge"
                })
            } else {
                elementToAdd.classList.add("line-through") //===> Barre l'élément s'il est déjà sélectionné
            }
            container.appendChild(elementToAdd) //Crée l'élément
        })
    })
};

//Créer des évenements pour les filtres
//=====> Cacher les éléments au départ
let ingredientsHidden = true;
let appliancesHidden = true;
let ustensilsHidden = true;

//=====> Fonction liée aux évenements des filtres
function createEventsForFilters() {

    //Ouvre la liste des ingredients
    document.getElementById("displayIngredients").addEventListener("click", function() {
        ingredientsHidden = !ingredientsHidden;
        document.getElementById("allIngredients").hidden = ingredientsHidden;
        document.getElementById("displayIngredients-hidden").style.display = "block";
        document.getElementById("displayAllIngredients-list").style.display = "block";
    });

    //Ferme la liste des ingredients
    document.getElementById("ingredientsList-closeChevron").addEventListener("click", function() {
        document.getElementById("displayIngredients-hidden").style.display = "none";
        document.getElementById("displayAllIngredients-list").style.display = "none";
    });

    //Ouvre la liste des appareils
    document.getElementById("displayAppliances").addEventListener("click", function() {
        appliancesHidden = !appliancesHidden;
        document.getElementById("allAppliances").hidden = appliancesHidden;
        document.getElementById("displayAppliances-hidden").style.display = "block";
        document.getElementById("displayAllAppliances-list").style.display = "block"
    });

    //Ferme la liste des appareils
    document.getElementById("appliancesList-closeChevron").addEventListener("click", function() {
        document.getElementById("displayAppliances-hidden").style.display = "none";
        document.getElementById("displayAllAppliances-list").style.display = "none";
    });

    //Ouvre la liste des ustensils
    document.getElementById("displayUstensils").addEventListener("click", function() {
        ustensilsHidden = !ustensilsHidden;
        document.getElementById("allUstensils").hidden = ustensilsHidden;
        document.getElementById("displayUstensils-hidden").style.display = "block";
        document.getElementById("displayAllUstensils-list").style.display = "block"
    });

    //Ferme la liste des ustensils
    document.getElementById("ustensilsList-closeChevron").addEventListener("click", function() {
        document.getElementById("displayUstensils-hidden").style.display = "none";
        document.getElementById("displayAllUstensils-list").style.display = "none";
    });
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
    getValidRecipes();
}

//====> Réinitialise les filtres
function removeFilter(filteredElement, typeOfElement) {

    totalFiltersClicked -= 1;

    let type = [
        "appliances", //====> 0
        "ingredients", //====> 1
        "ustensils" //====> 2
    ];

    allRecipes.forEach(function(OneRecipe) {
        if (type[typeOfElement] === "appliances") {
            OneRecipe.appliances.forEach(function(OneAppliance) {
                if (filteredElement === OneAppliance.name) {
                    OneRecipe.hasFilters -= 1;
                }
            })
        }

        if (type[typeOfElement] === "ingredients") {
            OneRecipe.ingredients.forEach(function(OneIngredient) {
                if (filteredElement === OneIngredient.name) {
                    OneRecipe.hasFilters -= 1;
                }
            })
        }

        if (type[typeOfElement] === "ustensils") {
            OneRecipe.ustensils.forEach(function(OneUstensil) {
                if (filteredElement === OneUstensil.name) {
                    OneRecipe.hasFilters -= 1;
                }
            })
        }
    })
    getValidRecipes();
}


function getValidRecipes(input = false) {

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
    })
    allRecipes = validRecipes;
    displayRecipes();
    getFilters();
}

//====> Déploit la recette
function displayRecipes() {

    let container = document.getElementById("recipes");
    container.innerHTML = "";
    allRecipes.forEach(function(OneRecipe) {

        let template = 
        `
                <div class="thumbCard"> <!--Affiche la carte-->
                    <div class="thumbCard__img"></div>
                    <div class="thumbCard__description">
                        <div class="thumbCard__description--header">
                            <div class="thumbCard__title"><h3>${OneRecipe.name}</h3></div>
                            <div class="thumbCard__time">
                                <i class="far fa-clock"></i>
                                <span>10 min</span>
                            </div>
                        </div>
                        <div class="thumbCard__description--footer">
                            <label for="thumb Card list Of Condiments" class="thumbCard__listOfCondiments">
                                ${OneRecipe.description}
                            </label>
                            <label for="thumb Card how To Use" class="thumbCard__howToUse">
                                
                            </label>
                        </div>
                    </div>
                </div>
        
        `
        container.innerHTML += template;
    })
}

//=====> Ajout de filtres
function addFilterBox(name, type) {

    //Ajout de couleurs au tag
    let colors = [
        "success",
        "primary",
        "danger"
    ]

    let container = document.getElementById("activeFilters");
    let template = 
    `
        <div class="rounded mb-2 col-4 col-sm-3 col-lg-2 border border-dark mr-1 bg-${colors[type]} text-white" id="box-${name}">
                        <div class="row">
                            <div class="col-10 box-display" >
                                ${name}
                            </div>
                            <div class="col-2 p-0 m-auto pointer removeElement" id="remove-${name}">
                                <i class="far fa-times-circle"></i>
                            </div>
                        </div>
                    </div>
    
    `
 
    /*
    `
    <div class="ingredientBadge">
            <span class="ingredientBadge__designation" id="ingredientBadge">${name}</span>
            <i class="ingredientBadge__closeBtn far fa-times-circle" id="ingredientBadge-closeBtn remove-${name}"></i>
        </div>
    `
    */

    //==================
    container.insertAdjacentHTML('beforeend', template)
    let cross = document.getElementById("remove-" + name);

    cross.addEventListener("click", function() {
        let box = document.getElementById("box-", + name)
        box.remove();
        activeFilters.forEach(function(oneFilter, index) {
            if (oneFilter === name) {
                activeFilters.splice(index, 1);
            }
        });
        removeFilter(name, type)
    })
}

function getInputEvent(e) {
    document.getElementById("input-search").addEventListener("input", function() {
        getValidRecipes(this.value)
    })
}


