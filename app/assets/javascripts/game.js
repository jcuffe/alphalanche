//document.addEventListener('DOMContentLoaded', function(){
//    cells = document.getElementsByClassName("game-cell");
//    for (i = 0; i < cells.length; i++) {
//        cells[i].onclick = function() { alert("bah"); };
//    }
//});

$(function() {
    $(".game-cell").css("height", $(".game-cell").css("width"));
    $(".game-cell").click(function() {
        $(this).css("background-color", "#444");
    });
});
