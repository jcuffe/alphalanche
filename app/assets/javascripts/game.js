// on document ready
$(function() {

    // hardcoded gameplay grid sizes
    grid_height = 4;
    grid_width = 4;
    
    // initialize data stores
    dictionary = $("#game-data").data("dictionary");
    letters = $("#game-data").data("letters");

    // initialize array to hold current word
    current_word = [];

    score = 0;

    // function to add letters to a random square
    function add_letter(count) {

        console.log("adding " + count + " letters");
       
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
            cell.data("active", "true");
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

    // adds a letter to the current_word array and updates the word display
    function push_letter(letter) {
        current_word.push(letter);
        update_word();
    }

    // splices the first instance of the given letter from current_word array and updates the word display
    function pop_letter(letter) {
        current_word.splice(current_word.indexOf(letter), 1);
        update_word();
    }

    // determine validity and value of current word and add to player's score
    function score_word() {
        // only score words 3 letters or longer
        word_length = current_word.length;
        if (word_length < 3) {
            return;
        }
        score += word_length
        $("#current-score").html(score);
        $(".selected")
            .removeClass("selected")
            .data("letter", "")
            .data("selected", "false")
            .html("");
        add_letter(word_length - 2);
        current_word = [];
        update_word();
    }

    function update_word() {
        $("#current-word").html(current_word.join(""));
    }

    function cell_click() {
        if ($(this).data("letter") != "") {
            if ($(this).data("selected") == "true") {
                $(this).removeClass("selected");
                $(this).data("selected", "false");
                pop_letter($(this).data("letter"));
            } else {
                $(this).addClass("selected");
                $(this).data("selected", "true");
                push_letter($(this).data("letter"));
            }
        }
    }

    // calculate proper height for square cells, initialize data, and attach onclick handler
    $(".game-cell").css("height", $(".game-cell").css("width"));
    $(".game-cell").click(cell_click);

    // onclick handler for "pass turn" button
    $("#pass-turn").click(function() {
        add_letter(1);
    });

    $("#score-word").click(score_word);

    // initialize game board with 6 letters
    add_letter(10);
});
