// on document ready
$(function() {
    
    // initialize data stores
    dictionary = $("#game-data").data("dictionary");
    letters = $("#game-data").data("letters");

    // function to add letters to a random square
    function add_letter(count) {
        for (i = 0; i < count; i++) {

            // pick a random letter from the alphabet array
            letter = letters[Math.floor(Math.random() * 100 % 26)];

            // choose a random cell and update it with the new letter
            x = Math.floor(Math.random() * 100) % 4;
            y = Math.floor(Math.random() * 100) % 4;
            cell = $("[data-x='" + x + "'][data-y='" + y + "']");
            cell.data("letter", letter);
            cell.html(letter);
        }
    }

    // calculate proper height for square cells, and attach onclick handler
    $(".game-cell").css("height", $(".game-cell").css("width"));
    $(".game-cell").click(function() {
        $(this).css("background-color", "#444");
    });

    // onclick handler for "pass turn" button
    $("#pass-turn").click(function() {
        add_letter(1);
    });
});
