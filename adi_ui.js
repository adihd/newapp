// var useridadi = firebase.auth().currentUser.uid;
// console.log(userid);
var finishadi = false;
var finishprize = false;
var pokefriend = false;

// pokeing!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function notification() {
  console.log("adidas2");
    document.querySelector('.home-noti-btn').click();
    setTimeout(function () {
        document.querySelector('.home-noti-btn').click();
    }, 7000);
}
// console.log(finishpair);
console.log("hi");
// when the user is log in print the user id
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User logged in already or has just logged in.
        // console.log(user.uid);
        findingDoc(user.uid);
    } else {
        // User not logged in or has just logged out.
    }
});




function findingDoc(useridadi) {

    // realtime update
    // db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
    //   snapshot.docs.forEach(doc => {
    //        db.collection('users').doc(doc.id).update({my_status: true})       
    //   });
    // })
    db.collection('users').where('user_id', '==', useridadi).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            // db.collection('users').doc(doc.id).update({my_status: true});
            // upgradePoints(doc);
            changeBack(doc);
            // why it it not working~
            pokepoke(doc);
                 if (window.location.pathname == "/adi_home3.html") {
                // alert("home");
                $(".myFriendButt").click(function () {
                    pokefriend = true;
                });

                changeMyPic(doc);
                var friendid = doc.data().partner_id;
                friendidfunc(friendid);

            }


        });

    })
}





function pokepoke(doc) {
    console.log("adidas!!!!");
    if (doc.data().poke) {
        notification();
        db.collection('users').doc(doc.id).update({
            poke: false
        });
    }
}

function changeBack(doc) {
    var habit = doc.data().habit;
    //    alert(str);
    if (habit === "knit") {
        //    chanhe backroung pic
        console.log("knit");
        finishadi = true;
    } else if (habit === "paint") {
        $('.page-wrapper').removeClass("apppage").addClass("apppage-paint");
        finishadi = true;
        // change backround pic
    } else {
        // change backround pic
        $('.page-wrapper').removeClass("apppage").addClass("apppage-piano");
        finishadi = true;
    }
}

function friendidfunc(useridadi2) {
    console.log("test1");
    db.collection('users').where('user_id', '==', useridadi2).get().then((snapshot) => {
        snapshot.docs.forEach(frienddoc => {
            changeFriendPic(frienddoc);
            pokemyfriend(frienddoc);
        })

    });
}



function changeMyPic(doc) {
    var habit = doc.data().habit;
    //  alert(habit);
    if (habit === "knit") {
        //chanhe backroung pic
        $('.myimg').addClass("knit-img");
        console.log("knit");
    } else if (habit === "paint") {
        $('.myimg').addClass("paint-img");
        // change backround pic
    } else {
        // change backround pic
        $('.myimg').addClass("piano-img");
    }
}

function pokemyfriend(doc) {
    if (pokefriend === true) {
        db.collection('users').doc(doc.id).update({
            poke: true
        });
        pokefriend = false;
    }
}

function changeFriendPic(doc) {
    // console.log("test2");
    var habit = doc.data().habit;
    // todo find my friend habit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //    alert(str);
    if (habit === "knit") {
        //chanhe backroung pic
        $('.friendimg').addClass("knit-img");
        console.log("knit");
    } else if (habit === "paint") {
        $('.friendimg').addClass("paint-img");
        // change backround pic
    } else {
        // change backround pic
        $('.friendimg').addClass("piano-img");
    }
}

function changePrize(doc) {
    var habit = doc.data().habit;
    //    alert(str);
    if (habit === "knit") {
        //    chanhe backroung pic
        console.log("knit");
    } else if (habit === "paint") {
        $('.page-wrapper').removeClass("apppage").addClass("apppage-paint");
        // change backround pic
    } else {
        // change backround pic
        $('.page-wrapper').removeClass("apppage").addClass("apppage-piano");
    }
}

function changePrizeColor(id) {
    // if (finishprize === false){
    //   finishprize = finishpair;
    //   // changePrizeColor(id);
    // }else{
    //   var all = document.getElementsByTagName("strong");
    //   for (var index = 0; index < all.length; index++) {
    //     console.log("hi");

    //   }
    // }


}

// findingDoc(userid);
// var myCardBool = false;
// var myButtBool = false;
// var friendCardBool = false;



// // whaen you click on my button:
// $('.myButt').click(function () {
//     // alert("hi")
//     // change the css of the card no animation
//     ChangeMyCard()
// });


// // // change the ui:
// // function changeUI() {
// //     // alert("changeui");

// // }

// // changing the ui of my chard
// function ChangeMyCard() {

//     if (myCardBool === false) {
//         $('.txtchange').text("You can get extra points by uploading a picture.");

//         // change the css and text of the button: no animation
//         $('.myButt').text("undo").removeClass("btn-primary").addClass("btn-secondary");
//         $("#uploadFileButton").removeClass("disabled").addClass("active");
//     } else {
//         myCardBool = false;
//         $('.myCard').css({
//             backgroundColor: "#F1F1F1"
//         });
//         $('.txtchange').text("Did you do your habbit today?")
//         // change the css and text of the button: no animation
//         $('.myButt').text("Done!").removeClass("btn-secondary").addClass("btn-primary");
//         $("#uploadFileButton").removeClass("active").addClass("disabled");
//     }


// }

// // changing the ui of a friend card
// function ChangeFriendCard() {

//     $('.myFriendButt').text("Poke again!")
//     $('.friendCard').css({
//         backgroundColor: "#99cc00"
//     });
// }

// // popover
// $(function () {
//     // Enables popover
//     $("[data-toggle=popover]").popover();
// });

// // Alert Modal Type