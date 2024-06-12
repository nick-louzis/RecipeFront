
$(document).ready(function () {
    var recipe_id = getUrlParameter('id');
  
   //  console.log(recipe_id);
    const url = 'https://noptapi.onrender.com/food/api/recipe/' + recipe_id;
    console.log(url);
    $.get(url,function (data) {


       var $title = `<div id= title><p>Title:</p>
           <input class=input_cnt value="${data.title}"></ipnut>
           </div>`
       var $prep_time = `<div id= prep_time><p>Preperation Time:</p>
           <input class=input_cnt  value="${data.prep_time}"></ipnut>
           </div>`


       let ingredientsHtml = `<p>Ingredients: <span class="ingredient_add">+</span></p> `;
       $.each(data.ingredients,function(key, value){
        const lastIngredient = data.ingredients.length - 1 ;
           ingredientsHtml+= `<div class="update_fields ingredient">
                       <textarea class="input_cnt input_ingred">${value}</textarea>
                       <span class="item_remove">-</span>
                       </div>`;
        if(lastIngredient == key){
            ingredientsHtml+= `<div class="update_fields ingredient">
                       <textarea class="input_cnt input_ingred">${value}</textarea>
                       <span class="item_remove">-</span>
                    
                       </div>`;
        }
                       
       })


       let instructionsHtml = `<p>Instructions: <span class="instruction_add">+</span></p> `;
       $.each(data.instructions,function(key, value){
        const lastInstructions = data.instructions.length - 1 ;
        
           instructionsHtml+= `<div class= "update_fields instruction">
                       <textarea class="input_cnt input_inst">${value}</textarea>
                       <span class="item_remove">-</span>
                       </div>`;


        if(lastInstructions == key){
            instructionsHtml+= `<div class= "update_fields instruction">
                        <textarea class="input_cnt input_inst">${value}</textarea>
                        <span class="item_remove">-</span>
                        <span class="instruction_add" style="margin: 5px;">+</span></p>
                        </div>`;
                }
       })

           $('#title_cnt').append($title);
           $('#prep_time_cnt').append($prep_time);
           $('#ingredients_cnt').append(ingredientsHtml);
           
           $('#instructions_cnt').append(instructionsHtml);
           $('textarea').on('click input', function() {
       this.style.height = 'auto'; // Reset the height
       this.style.height = (this.scrollHeight) + 'px'; // Set the height to scroll height
   });


       
       $(document).on('click','.item_remove',function(){
           $(this).closest('.update_fields').remove();
       })
    //    console.log(data);
    });
    $('.update_cnt').push('<button>Submit</button>');

    var instructions = $('#ingredients_cnt');

    $(document).on('click','.ingredient_add',function(){

        var lastIngredient = instructions.children().last();
        lastIngredient = lastIngredient.children().last(); 
        
        

       

        let newDiv = $(`
        <div class="update_fields ingredient">
        <textarea class="input_cnt input_ingred"></textarea>
        <span class="item_remove">-</span>
        <span class="ingredient_add">+</span></p>
        </div>`);

        $('#ingredients_cnt').children().last().after(newDiv);

        var addButton = instructions.find('.ingredient').eq(-2).find('span.ingredient_add');
        addButton.fadeOut(200, function() {
            $(this).remove();
        });
        
        
    });

    $(document).on('click','.instruction_add',function(){
        let newDiv = $(
            `<div class= "update_fields instruction">
        <textarea class="input_cnt input_inst"></textarea>
        <span class="item_remove">-</span>
        </div>`);
        $('#instructions_cnt').children().last().find('span.instruction_add').remove();
        $('#instructions_cnt').children().last().append('<span class="instruction_add" style="margin: 5px;">+</span></p>')

        // $('#instructions_cnt').children().last().before(newDiv); append(newDiv) to the start of list of instructions
        $('#instructions_cnt').append(newDiv); // append to the end of list of instructions
    

        
    });

    let ingredientsArray = [];
    let instructionsArray = [];

    $(document).on('click','#updateStart',function(){
        $('.input_ingred').each(function() {
            ingredientsArray.push($(this).val());
        });
        $('.input_inst').each(function() {
            instructionsArray.push($(this).val());
        });
        // console.log(ingredientsArray, instructionsArray);
        // console.log();
        $('.loading-screen').show();
        setTimeout(function (){
        data = {
            "id": getUrlParameter('id'),
            "title": $('#title input').val(),
            // "category_title": 'recipeCategory',
            "prep_time": $('#prep_time input').val() ,
             "ingredients": ingredientsArray,
             "instructions": instructionsArray,
            // "difficulty": 'recipeDifficulty',
            "servings": 2,
            // "main_image": '',
        }
        var jsonData = JSON.stringify(data);
        console.log(jsonData);

        $.ajax({
            type: 'PUT',
            url: 'https://noptapi.onrender.com/food',
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
        },1000);
    })
    
    
});



