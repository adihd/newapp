const user_name = document.querySelector('#user_name_at_nav');

const user_image_place = document.querySelector('#imagePreview');

//! todo : need to change it when user is working
const temp_userid = "tomID";
// userid
let userid = ""

const setupID = (user) => {
  if (user) {
    userid = user.uid;
    setUp(userid);
    getMyStatus(userid);
    setPictures(userid);
  } else {
    userid = "";
  }
};


let month = new Map()
month.set("01", "January");
month.set("02", "February");
month.set("03", "March");
month.set("04", "April");
month.set("05", "May");
month.set("06", "June" );
month.set("07", "July");
month.set("08", "August");
month.set("09", "September");
month.set("10", "October");
month.set("11",  "November");
month.set("12", "December");


// var p_name = document.getElementById("partner_id").innerText; //to find the right pair
// p_name = p_name.split(" ")[1];

function markAsDone() {

  console.log("markasdone works");
  //realtime update
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
         db.collection('users').doc(doc.id).update({my_status: true})
         
    });
    
  })
    db.collection('users').where('user_id', '==', userid).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        upgradePoints(doc);
    });
    
  })

}





//one player points = 10 each
//two players points = 15 each
var oneP = 10;
var twoP = 20;





function setPointsInHtml(doc){

  string1 = `Your team has ${doc.data().game_points} points `
  document.getElementById("myHeader").innerHTML = string1;

}

function upgradePoints(doc){
  var p = doc.data().game_points;
  if(doc.data().my_status && doc.data().partner_status)
  {
    p = p + twoP;
    
  }
  if(doc.data().my_status && !doc.data().partner_status)
  {
    p = p + oneP;
  }

  if(!doc.data().my_status && doc.data().partner_status)
  {
    p = p + oneP;
  }
  db.collection('users').doc(doc.id).update({game_points: p}); 

  //update partner points
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
       var par_id = doc.data().partner_id;
       db.collection('users').doc(par_id).update({game_points: p}); 

      
    });
})

}

function setCountDown(doc)
{

  var str = doc.data().start_date;

  var res = str.split("-");

  var year = res[0];
  var month_in_num = res[1];
  var day = res[2];

  var month_in_str = month.get(month_in_num);

  var the_start_date = month_in_str + " " + day + ", " + year + " 00:00:00";
  // Set the date we're counting down to
  var countDownDate = new Date(the_start_date).getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  days = days + (25); //25 is the duration of the game
  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + " Days";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
}





function setUp(userid)
{
    //not realtime update
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
        var s1 =  doc.data().partner_name;
        // console.log(s1);
        // var string2 = 'Click to remind ' + s1 + ' to do her habit';
        // document.getElementById("click_to_remind").innerHTML = string2;
      });
  })
  
   //realtime update on html
    db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
        snapshot.docs.forEach(doc => {
          setPointsInHtml(doc);
          
        });
    })
   db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
          snapshot.docs.forEach(doc => {
          var g_code = doc.data().game_code;
          db.collection('create_game').where("game_code", "==" ,g_code).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
         
  setCountDown(doc)
         
         
    });
    
  })
          });
          })
      //not realtime update
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
        user_name.textContent = doc.data().name;

      });
  })
}

function getMyStatus(userid)
{
  
  db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
      var myCardBool = doc.data().my_status;
      console.log(myCardBool);
      ChangeMyCard(myCardBool);
      });
  })
}

// var myCardBool = false
// var myButtBool = false
// var friendCardBool = false



// whaen you click on my button:
$('.myButt').click(function () {
    // alert("hi")
    // change the css of the card no animation
    ChangeMyCard()
});

$(".myFriendButt").click(function () {
    ChangeFriendCard()
});
// change the ui:
// function changeUI() {
//     // alert("changeui");

// }

// changing the ui of my chard
function ChangeMyCard(myCardBool) {
    // alert("my card");
    // console.log("בדיקה");
    if (!myCardBool === false) {
        console.log(userid);
        // myCardBool = true;
        $('.myCard').css({
            backgroundColor: "#99cc00"
        });
        // change the css and text of the button: no animation
        $('.myButt').text("undo").removeClass("btn-primary").addClass("btn-secondary");
        $("#uploadFileButton").removeClass("disabled").addClass("active");
    } else {
        // console.log(userid);
        // myCardBool = false;
        $('.myCard').css({
            backgroundColor: "#F1F1F1"
        });
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

function setPictures(userid)
{

  
  
   //get date in string
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + dd + yyyy;

  db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
    
    var g_code = doc.data().game_code;
    var rootref = firebase.database().ref().child(g_code + '/' + today + '/' + userid + ".png" );
    rootref.getDownloadURL().then(function(url) {
    var userImg = document.querySelector('#imagePreview');
    userImg.style = "background-image: url(" + url + ");";
    });
    // rootref.on("child_added", snap=>{
    //   console.log("arrive_here");
    //   var userImage = snap.child(userid).val();
    //   var partnerImage = snap.child(doc.data().partner_id);
    //   //the line to enter the picture to html
    //   user_image_place.style = "background-image: url(" + userImage + ");"
    // });
        });
        })
  
}



 



 


