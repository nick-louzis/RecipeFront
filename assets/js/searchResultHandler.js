$(document).ready(function() {

    // Get all categories
     $.get("http://localhost:8080/food/categories/all", function(data){
        console.log(data);
     }).done(function(data){
        const options= $('#filter_inner');
        $.each(data,function(index, category){
            const option = `<option value="${category.id}">${category.name}</option>`
            options.append(option);
        })
     })


    
    //get the recipes from sessionStorage
    const recipes = JSON.parse(sessionStorage.getItem('recipes'));

    const createRecipeCard = function(recipe){
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
        return recipeCard;
    }
    //create a new recipe card with the recipe information
    $.each(recipes, function (index, recipe) { 
        const recipeCard = createRecipeCard(recipe);
        $('.results_inner_cnt').append(recipeCard);
    
    });

    //redirect to the recipe 
    $(document).on('click', '.recipeCard', function() {
        const recipeID = $(this).attr('id');
        window.location.href = '/syntagi.html?id='+ recipeID;
    })


    $(document).on('click', '#category_filter', function() {
        
        let filter =  $('select[name=filter_value] option:selected').val();
        // console.log(filter);
        $('.results_inner_cnt').html('');

        
        
        $.get(`http://localhost:8080/food/api/categories/single?id=${filter}`,function(recipeData){
            $('.loading-screen').show();
            $.each(recipeData, function(index, recipe){
                const recipeCard = createRecipeCard(recipe);
                $('.results_inner_cnt').append(recipeCard);
            });
            $('.loading-screen').hide();
            
        });
    });
});