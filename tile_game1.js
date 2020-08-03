$("#UI").on('click', function () {
    //  לעבור על כל הרשימות הקטנות ולהתאים את הקלאסים שלהם לפי המספר 
    console.log("ui");
    var tileList = ["today", 2, ".tile00"];
    // removing all the classes
    $(tileList[2]).removeClass("grass").removeClass("fail").removeClass("done");
    if (tileList[1] === 0) {
        $(tileList[2]).addClass("grass");
    }
    if (tileList[1] === 1) {
        $(tileList[2]).addClass("done");
    }
    if (tileList[1] === 2) {
        $(tileList[2]).addClass("fail");
    }

})

