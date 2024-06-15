//Spinner Loading while loading screen
$(window).on("load", function () {

    var showLoadingScreen = true;

    // $(document).ajaxStart(function (event, jqXHR) {
    //     showLoadingScreen = true;
    //     $('.loading-screen').show();
    // });
    $(document).on("ajaxStart", function(){
        $('.loading-screen').show();
    })

    $(document).on("ajaxStop", function(){
        $('.loading-screen').hide();
    })

    // $(document).ajaxStop(function (event, jqXHR) {
    //     showLoadingScreen = false;
    //     //Hide spinner
    //     setTimeout(function(){
    //         if (showLoadingScreen) {
    //             $('.loading-screen').hide();
    //         }
    //     }, 500);
    // });
    //Hide spinner
    // setTimeout(function(){
    //     showLoadingScreen = false;
    //     $('.loading-screen').hide();
    // }, 500);
});

$(document).ready(function(){

    /* Navigation mobile menu */
    if ($(window).width() < 768) {
        $("#menu-toggle").click(function(){
            $("nav").toggleClass("open");
        });

    }
    else {
        $("#menu-toggle").hide();
    }

//SearchBar for  

$("#formSearch").submit(function(e){
    e.preventDefault()
    let title = $('#search-form').val().trim()

    if(title != ""){
        $('#alertDialog').hide();
        $.get('https://noptapi.onrender.com/food/api/v1',{ title: title }, function(data){
            console.log(data);
        
        const currentUrl = window.location.pathname;
        if (data.length<1){
            window.location.href="/error.html?title="+title;
             
    
        }else{
            // console.log(sessionStorage);
            sessionStorage.setItem('recipes', JSON.stringify(data));
            window.location.href ='/search.html'
            // console.log(sessionStorage.getItem('recipes'));
            // const recipeId = data[0].id;
            // window.location.href="/syntagi.html?id="+recipeId
        }
        addTxt(data[0])
    
        }).fail(function(error){
            console.log(error);
        });
            
    } else {
        $('#alertDialog').show();
    }
    
    
    
})   




function addTxt(recipe){
    $('.recipe-title').text(recipe.title)
}


});

$(document).on('touchstart click', '#formSearch', function() {
    $('#alertDialog').show();
});

$(document).on('input', '#formSearch', function() {
    $('#alertDialog').hide();
});


//It gets the URL Parameter which is specified when function is called
function getUrlParameter(param) {
   var sPageURL = window.location.search.substring(1),
       sURLVariables = sPageURL.split('&'),
       sParameterName,
       i;

   for (i = 0; i < sURLVariables.length; i++) {
       sParameterName = sURLVariables[i].split('=');

       if (sParameterName[0] === param) {
           return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
       }
   }
   return false;
};

/*
* Get all recipes
* It works dynamically.
* You can load dynamically the content to a specific ID given to pointToID
* You can add a specific class to the container of the generated content
* You can add a specific HREF based on the ID of the recipe.
* */
var ajaxDeferred = $.Deferred();

function getAllRecipes(pointToID = '', withClass = '', withHref = '') {
    // Fetch and display all recipes
    $.get('https://noptapi.onrender.com/food/api', function (recipes) {
        var sliderSlick = $('.photoslider_homepage__wrapper');
        sliderSlick.append('<div class="slides" id=' + pointToID + '>');
        var $recipeList = $('#' + pointToID);
        recipes.forEach(function (recipe) {
            var $sliderBoxWrapper = $('<a>', {
                class: 'photo-wrapper',
                href: withHref + recipe.id
            });

            var main_image = './images/pizza.jpg';

            if (recipe.main_image){
                main_image = recipe.main_image;
            }

            var $sliderBoxImage = $('<img>', {
                src: main_image,
                alt: '',
            });

            var $sliderBoxDescription = $('<div>', {
                class: 'photo-description',
            });

            var $sliderBoxDescriptionTitle = $('<h3>', {
                text: truncate(recipe.title, 25),
            });
            var $sliderBoxDescriptionPrepTime = $('<p>', {
                text: recipe.prep_time
            });

            //append
            $sliderBoxDescription.append($sliderBoxDescriptionTitle, $sliderBoxDescriptionPrepTime)
            $sliderBoxWrapper.append($sliderBoxImage, $sliderBoxDescription);
            $recipeList.append($sliderBoxWrapper);

           
        });

        
        makeCategories(recipes)
        // Close the container after the forEach loop
        sliderSlick.append('</div>');
        ajaxDeferred.resolve();
    });
}


//create the category section with unique category names
function makeCategories(recipes) {
    const wrapper = $('.circle-wrapper');
    const uniqueCategories = new Set();

    $.each(recipes, function(index, recipe) {
        if (recipe.category.length > 0) {
            const categoryName = recipe.category[0].name;

            if (!uniqueCategories.has(categoryName)) {
                uniqueCategories.add(categoryName);

                wrapper.append(`
                    <div class="circle">
                        <a href="./search.html">
                            <div class="home-category" style="background-image: url(${recipe.main_image || "./images/pizza.jpg"})">
                                <img src="./images/icon.svg">
                                <h3>${categoryName}</h3>
                            </div>
                        </a>
                    </div>
                `);
            }
        }
    });
}



function truncate(input, numberOfChars){
    if (input.length > numberOfChars){
        return input.substring(0,numberOfChars) + '...';
    }
    return input;
}


//progress bar
function initProgressBar() {
    /* Process bar */
    // get box count
    var count = 0;
    var checked = 0;

    function countBoxes() {
        count = $("input[type='checkbox']").length;
    }

    countBoxes();
    $(":checkbox").click(countBoxes);

    // count checks

    function countChecked() {
        checked = $("input:checked").length;

        var percentage = parseInt(((checked / count) * 100), 10);
        $(".progressbar-bar").progressbar({
            value: percentage
        });
        $(".progressbar-label").text(percentage + "%");
    }

    countChecked();
    $(":checkbox").click(countChecked);
}


//Get recipe by ID for the recipe Page
function getRecipeByID(recipeID) {
    // Fetch and display all recipes
    $.get('https://noptapi.onrender.com/food/api/recipe/' + recipeID, function (recipe) {
        console.log(recipe);
        $('title').empty().text(recipe.title);

        $('.recipe-title').text(recipe.title);

        $('.time p').text(recipe.prep_time);

        if (!recipe.difficulty){
            $('.difficulty p').text('-');
        }else{
            $('.difficulty p').text(recipe.difficulty);
        }


        var product_page_image = './images/pizza.jpg';
        if (recipe.main_image){
            product_page_image = recipe.main_image;
        }
        $("#image").show();
        $("#image").attr('src', product_page_image);



        $('.servings p').text(recipe.servings);

        if (!recipe.userID){
            $('.name p').text('Posted by Admin');
        }else {
            $('.name p').text(recipe.userID);
        }

        // console.log(recipe)

        recipe.ingredients.forEach(function (ingredient, index) {
            $('.ingredients ul').append('<li>' + ingredient + '</li>');
        });

        recipe.instructions.forEach(function (instruction, index) {
            var $processInput = $('<input>', {
                type: 'checkbox',
                id: 'check_box_' + (index+1),
                name: 'box' + (index+1)
            });
            var $processLabel = $('<label>', {
                for: 'check_box_' + (index+1),
                text: 'Βήμα ' + (index+1)
            });
            var $processText = $('<p>', {
                text: instruction
            });
            $('.start-process form').append('<div>', $processInput, $processLabel, '<br>', $processText ,'</div>');
            
        });
         

    }).fail(function() {
        alert(window.location);
        // window.location.replace("");
    });
    
}

function getRecipe(recipeID) {
    // Fetch and display all recipes
    $.get('https://noptapi.onrender.com/food/api/recipe/' + recipeID, function (recipe) {
        $('.recipe_name').text(recipe.name);
    }
    ).fail(function(error) {
        // Handle the error here
        console.error('Error:', error);
      });;}




// Add or remove Ingredients
var countIngredients = 1;
$(document).ready(function(){
    var ingredients_container = $('.display-ingredients');

    function removeIngredient(target){
        target.remove();
    }


    $(document).on("click", '.ingredients-minus', function (e) {
        console.log(e);
        removeIngredient($(this).parent());
    });

    $(document).on("click", '.ingredients-button', function (){

        var ingredients_input = $('#ingredients_input');
        var ingredients_input_value = ingredients_input.val();
        ingredients_input.removeClass('is-empty');

        if (ingredients_input_value.length === 0){
            ingredients_input.addClass('is-empty');
            return false;
        }

        var ingredient = $('<div>', {
            id: 'ingredient_id_' + countIngredients,
            class: 'ingredients-wrapper',
            text: ingredients_input_value
        });

        var ingredientRemove = $('<span>', {
            class: 'ingredients-minus',
            id: 'ingredient_remove_'+ countIngredients,
            html: '<i class="fa-solid fa-square-minus"></i>'
        });

        ingredient.append(ingredientRemove);
        ingredients_container.append(ingredient);
        ingredients_input.val('');
        countIngredients++;
    })
});




/*
* Add Instructions in Form
*
* */
function addFormInit(){
    //initialize form - clear all inputs
    $('input').val('');
    $('select').val('');
}


/*
*
* Form Validation
*
* */
function formValidation(formID){
    $('#'+formID).validate({
        rules: {
            fName: "required",
            lName: "required",
            username: {
                required: true,
                minlength: 5
            },
            password: {
                required: true,
                minlength: 6
            },
            email: "required",
            recipe_name: "required",
            category_select: "required",
            preparation_time: "required",
            difficulty: "required",
            recipe_image: "required",
        },
        messages: {
            fName: "**First Name field is required",
            lName: "**Last Name field is required",
            username: "**Username field should be at least 5 characters",
            password: "**Password field should be at least 6 characters",
            email: "**Email field is required",
            recipe_name: "** Recipe Name is required",
            category_select: "** Category is required",
            preparation_time: "** Preparation Time is required",
            difficulty: "** Difficulty field is required",
            recipe_image: "** Image is required",

        },
        errorPlacement: function (error, element){
            error.insertAfter(element);
        }
    });
}


$(document).ready(function (){



    /*
    *
    * Submit Recipe Form
    *
    * */
    $(document).on("click", '#submit_recipe', function (e){
        formValidation('recipe_form');

        if ($('#recipe_form').valid()){
            console.log('isValid');

            let data = [];
            let ingredientsArray = [];
            let instructionsArray = [];

            const recipeName = $('input[name=recipe_name]').val();
            const recipeCategoryValue = $('select[name=category_select] option:selected').val();
            const recipeCategoryName = $('select[name=category_select] option:selected').text();
            const recipePrepTime = $('input[name=preparation_time]').val();
            const recipeDifficulty = $('select[name=difficulty] option:selected').val();
            const recipeServings = $('input[name=servings]').val();

            const recipeMainImage = $('input[name=recipe_image]')[0].files[0];

            var recipeMainImageResult = [];

            let allImagesConverted = false;

            if (recipeMainImage) {
                loadImageAsBase64(recipeMainImage)
                    .then(function(base64EncodedImage) {
                        recipeMainImageResult.push(base64EncodedImage);
                        // Continue with any further processing that depends on the loaded image
                    })
                    .catch(function(error) {
                    });
            }


            $('.display-ingredients > div').each(function (){
                var ingredientText = $(this).text();
                ingredientsArray.push(ingredientText);
            });

            $('.container-steps ol li:not(.strike)').each(function (){
                var instructionText = $(this).text();

                var instructionImage = $(this).find('input')[0].files[0];

                if (instructionText.length > 0 ){

                            instructionsArray.push(instructionText);

                }else{
                    instructionsArray.push({instructionText});
                }

            });

            if (!ingredientsArray.length){
                alert('Παρακαλώ συμπληρώστε τα υλικά');
                return false;
            }


            $('.loading-screen').show();


            setTimeout(function (){
                // if (!instructionsArray.length){
                //     alert('Παρακαλώ συμπληρώστε τα βήματα');
                //     return false;
                // }
                data = {
                    "title": recipeName,
                    "category": [{"id":recipeCategoryValue, "name":recipeCategoryName}],
                    "prep_time": recipePrepTime + ' λεπτά',
                     "ingredients": ingredientsArray,
                     "instructions": instructionsArray,
                    "difficulty": recipeDifficulty,
                    "servings": recipeServings,
                    "main_image": recipeMainImageResult[0],
                }
                var jsonData = JSON.stringify(data);

                console.log(jsonData);

                $.ajax({
                    type: 'POST',
                    url: 'https://noptapi.onrender.com/food/api/addRecipe',
                    contentType: 'application/json',
                    data: jsonData,
                    success: function (response){
                    console.log(data);
                        console.log('Success: '+response);
                    },
                    error: function (xhr, status, error){
                        console.error('Error:' + xhr, status, error);
                    },
                })
                $('.loading-screen').hide();
            },1000)





        }else{
            console.log('no valid')
        }
        // validateForm('.recipe-form','#recipe_image_file_upload,#ingredients_input,#instructions_input');



    });

    /*
    *
    * Convert to Base64
    *
    * */
    function loadImageAsBase64(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }



    /*
    * Recipe Registration Functionalities
    * */
    let countInstructions = 1;
    $('#addInstruction').click(function(){

        $(window).keydown(function(event){
            if(event.keyCode === 13) {
                event.preventDefault();
                return false;
            }
        });
        var toAdd = $('input[name=instructions_input]').val();

        $('input[name=instructions_input]').removeClass('is-empty');
        if (toAdd.length === 0){
            $('input[name=instructions_input]').addClass('is-empty');
            return false;
        }
        $('ol.instruction-steps').append(
            '<li>' +
            '<span class="ingredient-item'+countInstructions+'">' + toAdd  + '</span>' +
            '<div class="instruction-image-container">'+
            '<input type="file" name="instruction_image_' + countInstructions + '" id="instruction_image_upload_' + countInstructions + '" placeholder="Εικόνα Βήματος" accept="image/png, image/jpeg"">' +
            '<i class="fa-solid fa-trash"></i>'+
            '</div>' +
            '</li>'
        );
        $('.input_div input').val('');
        countInstructions++;

    });

    $("input[name=instructions_input]").keyup(function(event){
        if(event.keyCode === 13){
            $("#addInstruction").click();
        }
    });

    $(document).on('click','.instruction-steps .fa-trash', function(){
        $(this).parent().parent().toggleClass('strike').fadeOut('slow');
    });

    $('.input_div input').focus(function() {
        $(this).val('');
    });

    // $('ol.instruction-steps').sortable();
    /*0
      * END of Recipe Registration Functionalities
    *
    */
})
