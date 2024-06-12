$(document).ready(function(){
    $("#delete").click(function(){
        const id = getUrlParameter('id');
        $.ajax({
            url:`https://noptapi.onrender.com/food/api/${id}`,
            type:'DELETE',
            success: function(result){
                // console.log(result);
                window.location.href = "/RecipeFront/index.html";
            },
            error: function(xhr, status, error){
                console.log("Error",status,error);
            }
        });
        
    });

    let started = false;
$("#start").click(function() {
    if (!started) {
        $("#check_box_1").prop('checked', true);
        $("#start").text('Stop');
        started = true;
    } else {
        $("#check_box_1").prop('checked', false);
        $("#start").text('Start');
        started = false;
    }
});

$("#update").click(function() {
    const id = getUrlParameter('id');
    window.location.href = "/RecipeFront/update.html?id="+ id;
});
});





