/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//====> Variables pour stocker toute notre recette
let allRecipesObjects = [];

//====> Variables pour les filtres
let allElementsFilters = [];
let totalFiltersClicked = 0;

//===> Filtres actifs
let activeFilters = [];

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
        allRecipesObjects.push(OneNewRecipeObject);
    }); 
}

//=========================================================
//Fonction pour les filtres: "ingredients", "appareils", "ustensiles"

function getFilters() {

    let allIngredientsFilters = [];
    let allAppliancesFilters = [];
    let allUstensilsFilters = [];

    allRecipesObjects.forEach(function(OneRecipe) {
        if (OneRecipe.toDisplay === true) {
            //Filtre pour tous les noms d'ingredients
            OneRecipe.ingredients.forEach(function(OneIngredient) {
                if (allIngredientsFilters.includes(OneIngredient.name) === false) {
                    allIngredientsFilters.push(OneIngredient.name)
                }
                //Trie les ingredients par ordre alphabétique
                return allIngredientsFilters.sort()
            });
            

            //Filtre pour tous les noms de plats
            OneRecipe.appliances.forEach(function(OneAppliance) {
                if (allAppliancesFilters.includes(OneAppliance.name) === false) {
                    allAppliancesFilters.push(OneAppliance.name)
                }
                //Trie les appareils par ordre alphabétique
                return allAppliancesFilters.sort()
            });
            

            //Filtre pour tous les noms d'ustensiles
            OneRecipe.ustensils.forEach(function(OneUstensil) {
                if (allUstensilsFilters.includes(OneUstensil.name) === false) {
                    allUstensilsFilters.push(OneUstensil.name)
                }
                //Trie les ustensils par ordre alphabétique
                return allUstensilsFilters.sort()
            });
        }
        
    })
    //Filtres contenant tous les éléments filtrés
    allElementsFilters = [allAppliancesFilters, allIngredientsFilters, allUstensilsFilters];
    displayFilters();
}

function displayFilters(allElementsFiltersCopy = []) {
    
    //====> Fait la liaison entre: 
    // "allElementsFilters[0] (allAppliancesFilters)
    // "allElementsFilters[1] (allIngredientsFilters)
    // "allElementsFilters[2] (allUstensilsFilters)
    // et leurs conteneurs respectifs
    let arrayConfiguration = [
        "allAppliances",  //=======> 0
        "allIngredients",  //=======> 1
        "allUstensils"   //=======> 2
    ]

    let filtersTabToUse = allElementsFilters; //Tableau par défaut

    if (allElementsFiltersCopy.length > 0) { //Tableau à utilisé si l'input de la recherche spécifique n'est pas vide
        filtersTabToUse = allElementsFiltersCopy
    }

    //====> Bouclage sur le tableau de config pour y mettre tous les filtres
    arrayConfiguration.forEach(function(containerName, index) {

        //==> Récupération du containeur du filtre courant
        let container = document.getElementById(containerName);
        
        //==> Vidage du conteneur courant de son contenu
         container.textContent = ""; 
        
        //==> Ajout de chaque valeur du filtre créé plus haut
        filtersTabToUse[index].forEach(function(OneElement) {
            let elementToAdd = document.createElement("div");
            elementToAdd.classList.add("recipesOneElement-Div") //Classe de la "div" de l'élément
            elementToAdd.textContent = OneElement;
            if (activeFilters.includes(OneElement) === false) {
                elementToAdd.classList.add("pointer") //===> Pointer l'élément au survol de la sourcis
                elementToAdd.addEventListener("click", function() {
                    //Ajoute un "tag"
                    activeFilters.push(OneElement);
                    addFilter(OneElement, index);
                })
            } else {
                elementToAdd.classList.add("line-through") //===> Barre l'élément s'il est déjà sélectionné
            }
            container.appendChild(elementToAdd) //Ajoute le nouvel élément à la liste
        })
    })
}
//Créer des évenements pour les filtres
//=====> Cacher les éléments au départ
// let ingredientsHidden = true;
// let appliancesHidden = true;
// let ustensilsHidden = true;

//=====> Fonction liée aux évenements des filtres
function createEventsForFilters() {

    //Ouvre la liste des ingredients
    document.getElementById("displayIngredients").addEventListener("click", function() {
        // ingredientsHidden = !ingredientsHidden;
        // document.getElementById("allIngredients").hidden = ingredientsHidden;
        document.getElementById("displayIngredients-hiddenElt").style.display = "block";
        document.getElementById("displayIngredients").style.display = "none"
    });

    //Ferme la liste des ingredients
    document.getElementById("ingredientsList-closeChevron").addEventListener("click", function() {
        document.getElementById("displayIngredients-hiddenElt").style.display = "none";
        document.getElementById("displayIngredients").style.display = "flex";
    });

    //Ouvre la liste des appareils
    document.getElementById("displayAppliances").addEventListener("click", function() {
        // appliancesHidden = !appliancesHidden;
        // document.getElementById("allAppliances").hidden = appliancesHidden;
        document.getElementById("displayAppliances-hiddenElt").style.display = "block";
        document.getElementById("displayAppliances").style.display = "none"
    });

    //Ferme la liste des appareils
    document.getElementById("appliancesList-closeChevron").addEventListener("click", function() {
        document.getElementById("displayAppliances-hiddenElt").style.display = "none";
        document.getElementById("displayAppliances").style.display = "flex";
    });

    //Ouvre la liste des ustensils
    document.getElementById("displayUstensils").addEventListener("click", function() {
        // ustensilsHidden = !ustensilsHidden;
        // document.getElementById("allUstensils").hidden = ustensilsHidden;
        document.getElementById("displayUstensils-hiddenElt").style.display = "block";
        document.getElementById("displayUstensils").style.display = "none";
    });

    //Ferme la liste des ustensils
    document.getElementById("ustensilsList-closeChevron").addEventListener("click", function() {
        document.getElementById("displayUstensils-hiddenElt").style.display = "none";
        document.getElementById("displayUstensils").style.display = "flex";
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

    allRecipesObjects.forEach(function(OneRecipe) {
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

//Récupère les recettes valides avec la version "FOR"
function getValidRecipes(input = false) {
    let counterFor = 0; //Compteur pour calculer le nombre d'itérations pour la boucle "for"

    //Met en Majuscule la saisie de l'user 
    if (input !== false) {   
        input = input.toUpperCase();
    }

    for (let i = 0; i < allRecipesObjects.length; i++) {
        counterFor = counterFor + 1;
        let OneRecipe = allRecipesObjects[i];
        OneRecipe.toDisplay = false;
        if (input !== false) { 
            OneRecipe.hasInput = false;
            let recipeName = OneRecipe.name.toUpperCase(); //Nom des recettes en majuscule
            let recipeDescription = OneRecipe.description.toUpperCase(); //Description des recettes en majuscule
            //Recherche par le nom                                 
            if (recipeName.includes(input)) { 
                OneRecipe.hasInput = true;
                // validRecipes.push(OneRecipe);
            } else
            //Recherche dans la description
            if (recipeDescription.includes(input)) { 
                OneRecipe.hasInput = true;
                // validRecipes.push(OneRecipe)
            } else
            //Atteindre la liste des ingredients
            if (OneRecipe.ingredients.map((OneIngredient) => (OneIngredient.name.toUpperCase())).join().includes(input)) {
                OneRecipe.hasInput = true;
                // validRecipes.push(OneRecipe)
            }
        }
    }
    
    let totalValidRecipes = 0; //Toutes les recettes valides (vide au départ)
    for (let i = 0; i < allRecipesObjects.length; i++) {
        counterFor = counterFor + 1;
        let OneRecipe = allRecipesObjects[i];
        if (((OneRecipe.hasInput && input !== false) || (input === false)) && (OneRecipe.hasFilters === totalFiltersClicked)) {
            totalValidRecipes += 1;
            allRecipesObjects[i].toDisplay = true;
        }
    }
    console.log("Nombre de tours de boucles :", counterFor + " tours");

    //================================================================================
    //======== Paramétrage du message d'info sur le résultat de la recherche =========
    
    //Les couleurs pour le resultat de la recherche
    let validRecipesResultColors = [
        "#b5dbf1", // "$cd-color-validRecipesFund"
        "#ebdb97" // "$cd-color-noValidRecipesFund"
    ]

    //Affichage du nombre des recettes trouvées
    if (input.length < 3) {
        document.getElementById("getValidRecipesCount").style.display = "none"
    } else {
        if (totalValidRecipes !== 0) {
            document.getElementById("showValidRecipesCount").innerText = totalValidRecipes + " recette(s) correspond(ent) à votre recherche"
            document.getElementById("getValidRecipesCount").style.display = "block"
            document.getElementById("getValidRecipesCount").style.background = validRecipesResultColors[0] // $cd-color-validRecipesFund 
        } 
        else
        if (totalValidRecipes === 0) {
            document.getElementById("showValidRecipesCount").innerText = "Aucune recette ne correspond à votre critère… vous pouvez chercher: " + 
                                                                        "« tarte aux pommes », " + "« poisson », etc.";
            document.getElementById("getValidRecipesCount").style.display = "block"
            document.getElementById("getValidRecipesCount").style.background = validRecipesResultColors[1] // $cd-color-noValidRecipesFund  
        }
    }
    
    //==========> appelle d'autres fonctions
    displayRecipes();
    getFilters();
}

//=====> Ferme la boîte de message du nombre de recettes trouvées
let closeValidRecipesCountCross = document.getElementById("getValidRecipesCount-closeCross");
closeValidRecipesCountCross.addEventListener("click", function() {
    document.getElementById("getValidRecipesCount").style.display = "none";
})

//=====================================================================================
//=== Fonction pour la recherche spécifique "Ingredients"; "Appareils"; "Ustensils" ===
function specificElementsSearch(input, type) {
    let allSearchElementsFilters = [];
    input = input.toUpperCase(); //Gestion de la saisie en majuscules

    allElementsFilters[type].forEach(function(OneSearchElement) {
        let searchElementUpper = OneSearchElement.toUpperCase() //Transforme les éléments en majuscule

        if (searchElementUpper.includes(input)) {
            allSearchElementsFilters.push(OneSearchElement)
        }
    })

    if (input === "") {
        allSearchElementsFilters = allElementsFilters[type]
    }
    allElementsFiltersCopy = allElementsFilters;
    allElementsFiltersCopy[type] = allSearchElementsFilters;
    displayFilters(allElementsFiltersCopy)
}

//====> Déploit la recette
function displayRecipes() {

    let container = document.getElementById("menuCards");
    container.innerHTML = "";

    allRecipesObjects.forEach(function(OneRecipe) {
        
        if (OneRecipe.toDisplay === true) {
            let template = 
                `<div class="thumbCard">
                    <div class="thumbCard__img"></div>
                    <div class="thumbCard__description">
                        <div class="thumbCard__description--header">
                            <div class="thumbCard__title"><span>${OneRecipe.name}<sapn></div>
                            <div class="thumbCard__time">
                                <i class="far fa-clock"></i>
                                <span>${OneRecipe.time} min</span>
                            </div>
                        </div>
                        <div class="thumbCard__description--footer">
                            <label for="listOfCondiments" class="thumbCard__listOfCondiments">
                                <ul class="content">
                                ${OneRecipe.ingredients
                            .map(
                                (OneIngredient) =>
                                    `<li class="thumbCard__listOfCondiments"><b>${OneIngredient.name} : </b> 
                                    ${OneIngredient.quantity} ${OneIngredient.unit}</li>`
                                )
                            .join("")}
                                </ul>
                            </label>
                            
                            <label for="description" class="thumbCard__howToUse">
                                ${OneRecipe.description}
                            </label>
                        </div>
                    </div>
                </div>
                `
        container.innerHTML += template;
        }
    })
}

//=====> Ajout de filtres
function addFilterBox(name, type) {

    //Ajout de couleurs au tag
    let colors = [
        "tagAppliance",   //===> $cd-color-appliance: #68D9A4;
        "tagIngredient",   //===> $cd-color-ingredient: #3282F7;
        "tagUstensil"    //===> $cd-color-ustensil: #ED6454;
    ]

    let container = document.getElementById("activeFilters");
    let template = 
                    `<div class="Badge__${colors[type]}" id="Badge__${colors[type]}--${name}"> 
                        <div class="Badge__${colors[type]}--name">${name}</div>
                        <i class="Badge__${colors[type]}--closeCross far fa-times-circle" id="remove-${name}"></i>
                    </div>
                    `;

    container.insertAdjacentHTML('beforeend', template)
    let cross = document.getElementById("remove-" + name);

    cross.addEventListener("click", function() {
        let box = document.getElementById("Badge__" + colors[type] + "--" + name)
        box.remove();
        activeFilters.forEach(function(OneFilter, index) {
            if (OneFilter === name) {
                activeFilters.splice(index, 1);
            }
        });
        removeFilter(name, type)
    })
} 

//================================================================================
//=================== Recherche par l'input de l'utilisateur =====================
//************** Recherche par la barre de recherche principale ******************
function getMainInputEvent() {
    document.getElementById("input-search").addEventListener("input", function(event) {
        event.preventDefault()
        getValidRecipes(this.value)
    })
}

//================================================================================
//*********** Recherche spécifique dans la liste des Ingredients *****************
function getSpecificIngredientsInputEvent() {
    document.getElementById("input-ingredient").addEventListener("input", function(event) {
        event.stopPropagation();
        getFilters();
        specificElementsSearch(this.value, 1);
     })
}

//================================================================================
//========== Recherche spécifique dans la liste des Appareils ==================
function getSpecificAppliancesInputEvent() {
    document.getElementById("input-appliance").addEventListener("input", function(event) {
        event.stopPropagation();
        getFilters();
        specificElementsSearch(this.value, 0)
    })
}

//================================================================================
//========== Recherche spécifique dans la liste des Ustensils ==================
function getSpecificUstensilsInputEvent() {
    document.getElementById("input-ustensil").addEventListener("input", function(event) {
        event.stopPropagation();
        getFilters();
        specificElementsSearch(this.value, 2)
    })
}