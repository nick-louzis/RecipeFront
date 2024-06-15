$(document).ready(function () {

    const categories = "#category_select";

    const url  =  "https://noptapi.onrender.com/food/categories/all";
    $.get(url, function(data){
        console.log(data);

        $.each(data, function (index, category) { 
             
            $(categories).append(`<option value="${category.id}">${category.name}</option>`);

        });

})
});