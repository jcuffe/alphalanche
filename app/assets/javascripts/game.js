// on document ready
$(function() {

    // hardcoded gameplay grid sizes
    grid_height = 4;
    grid_width = 4;
    
    // initialize data stores
    dictionary = $("#game-data").data("dictionary");
    letters = $("#game-data").data("letters");

    // function to add letters to a random square
    function add_letter(count) {
       
        // find all empty cells
        cells = empty_cells();
        
        for (i = 0; i < count; i++) {

            // pick a random letter from the alphabet array
            letter = letters[Math.floor(Math.random() * 100 % 26)];

            // pick a random cell by removing it from the empty cells array
            index = Math.floor(Math.random() * 100 % cells.length);
            cell = cells.splice(index, 1)[0];

            // assign letter to cell
            cell.data("letter", letter);
            cell.html(letter);
            
            // game ends if the last cell has just been filled
            if (cells.length == 1) {
                alert("Game over!");
                reset_game();
                return;
            }
        }
    }

    // return an array of empty tiles or an empty array
    // iterates over each cell and pushes cells with no letter to an array, returning the array
    function empty_cells() {
        cells = []
        for (x = 0; x < grid_height; x++) {
            for (y = 0; y < grid_width; y++) {
                cell = $("[data-x='" + x + "'][data-y='" + y + "']");
                if (cell.data("letter") == "") {
                    cells.push(cell);
                }
            }
        }
        return cells;
    }

    function reset_game() {
        return;
    }

    // calculate proper height for square cells, initialize data, and attach onclick handler
    $(".game-cell").css("height", $(".game-cell").css("width"));
    $(".game-cell").click(function() {
        if ($(this).data("selected") == "true") {
            $(this).css("background-color", "#000");
            pop_letter($(this).html)

        } else {
            $(this).css("background-color", "#444");
        }
    });

    // onclick handler for "pass turn" button
    $("#pass-turn").click(function() {
        add_letter(1);
    });

    // initialize game board with 6 letters
    add_letter(6);
});
