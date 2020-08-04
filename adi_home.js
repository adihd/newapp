

var myCardBool = false;
var myButtBool = false;
var friendCardBool = false;



// whaen you click on my button:
$('.myButt').click(function () {
    // alert("hi")
    // change the css of the card no animation
    ChangeMyCard()
});

$(".myFriendButt").click(function () {
    ChangeFriendCard()
});
// // change the ui:
// function changeUI() {
//     // alert("changeui");

// }

// changing the ui of my chard
function ChangeMyCard() {
    // alert("my card");
    // console.log("בדיקה");
    if (myCardBool === false) {
        // alert("txt");
        // myCardBool = true;
        // $('.myCard').css({
        //     backgroundColor: "#99cc00"
        // });
        
        $('.txtchange').text("You can get extra points by uploading a picture.");
                                      
        // change the css and text of the button: no animation
        $('.myButt').text("undo").removeClass("btn-primary").addClass("btn-secondary");
        $("#uploadFileButton").removeClass("disabled").addClass("active");
    } else {
        myCardBool = false;
        $('.myCard').css({
            backgroundColor: "#F1F1F1"
        });
        $('.txtchange').text("Did you do your habbit today?")
        // change the css and text of the button: no animation
        $('.myButt').text("Done!").removeClass("btn-secondary").addClass("btn-primary");
        $("#uploadFileButton").removeClass("active").addClass("disabled");
    }


}

// changing the ui of a friend card
function ChangeFriendCard() {

    $('.myFriendButt').text("Poke again!")
    $('.friendCard').css({
        backgroundColor: "#99cc00"
    });
}

// popover
$(function () {
    // Enables popover
    $("[data-toggle=popover]").popover();
});

// Alert Modal Type
$(document).on('click', '#success', function (e) {
    swal(
        'Success',
        'You just <b style="color:green;">Poked</b> your partner!!!',
        'success'
        // now make the button in another color!
        // document.getElementById('success').style.color = 'green';
    )
});