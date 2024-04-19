$(document).ready(function() {
    
    //get the recipes from sessionStorage
    const recipes = JSON.parse(sessionStorage.getItem('recipes'));

    //create a new recipe card with the recipe information
    $.each(recipes, function (index, recipe) { 
        const recipeCard = `
        <div class="recipeCard" id=${recipe.id}>
                <div class="recipeImg">
                    <img src=${recipe.main_image || "./images/icon.svg"} id="card_image">
                </div>
                <div class="recipeInfo">
                    <p class="recipeTitle">${recipe.title}</p>
                    <div class="recipeIcons">
                        <div class="cardInnerInfo">
                            <span class="fa-regular fa-clock" aria-hidden="false"></span>
                            <span>${recipe.prep_time}</span>
                        </div>
                        <div class="cardInnerInfo">
                            <span class="fa-solid fa-kitchen-set" aria-hidden="true"></span>
                            <span>${recipe.difficulty}</span>
                        </div>
                        <div class="cardInnerInfo">
                            <span class="fa-solid fa-bowl-food" aria-hidden="true"></span>
                            <span>${recipe.servings}</span>
                        </div>
                    </div>         
                </div>
            </div>`
        $('.results_inner_cnt').append(recipeCard)
    });

    //redirect to the recipe 
    $(document).on('click', '.recipeCard', function() {
        const recipeID = $(this).attr('id');
        window.location.href = '/syntagi.html?id='+ recipeID;
    })
});