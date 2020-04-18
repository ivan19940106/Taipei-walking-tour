// filterBlockChange
window.addEventListener("load",function(){
    $('.filterAll li').click(function(e){
        e.preventDefault();

        $(this).closest("ul.filterAll").find("li.filter").removeClass("showFilter");
        $(this).addClass("showFilter");
    });
    
});