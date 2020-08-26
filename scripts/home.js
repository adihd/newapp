const user_name = document.querySelector('#user_name_at_nav');

const user_image_place = document.querySelector('#imagePreview');

const game_name = document.querySelector('#challengeName');

//////////////////////////////////////////////////////////////////////
//upload pic only frontend
$(function () {

    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            $('#uploadFileButton').attr("disabled",true);
            imageUpload
            $('#imageUpload').attr("disabled",true);
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
           
           
        }
         
      

        var user_id = firebase.auth().currentUser.uid;
        var docRef = db.collection("users").doc(user_id);
        
        docRef.get().then(function(doc) {
          var g_code = doc.data().game_code;
          db.collection("users").where("game_code","==",g_code).get().then(snap1=>{
           snap1.docs.forEach(doc => {
            db.collection('users').doc(doc.id).update({new_pic: true});
            picBonus(doc, user_id);
                 db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
      var g_code = doc.data().game_code;
      var user_n = doc.data().name;
      var counter = 0;
      db.collection('users').orderBy('game_points', 'desc').onSnapshot(snapshot =>{
        snapshot.docs.forEach(doc => {
          if(!setPairs.has(doc.data().name) && doc.data().paired && doc.data().game_code == g_code && doc.data().user_id != userid)
          {
            
            counter++;
            
            setPlace(doc, g_code, counter, userid, doc.data().partner_id);
            setPairs.add(doc.data().name);
            console.log(doc.data().name);
            setPairs.add(doc.data().partner_name);
            console.log(doc.data().partner_name);
          }      
      });
      }) 
    });
  })
              
           });
         });
          
        });
    });
});

function imageIsLoaded(e) {
  var userImg = document.querySelector('#imagePreview');
  userImg.style = "background-image: url(" + e.target.result + ");";
};
// the end of : upload pic only frontend
//////////////////////////////////////////////////////////////////////

let userid = ""

const setupID = (user) => {
  if (user) {
    
    userid = user.uid;
    setUp(userid);
    getMyStatus(userid);
     db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
         if(doc.data().my_status) setPictureUser();
         if(doc.data().partner_status) setPicturePartner();
         
         
    });
    
  })
    
    
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

   
    db.collection('users').where('user_id', '==', userid).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
      db.collection('users').doc(doc.id).update({my_status: true});
      upgradePoints(doc);
        
    });
  })

    console.log("markAsDone");
     db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
      var g_code = doc.data().game_code;
      var user_n = doc.data().name;
      var counter = 0;
      db.collection('users').orderBy('game_points', 'desc').onSnapshot(snapshot =>{
        snapshot.docs.forEach(doc => {
          if(!setPairs.has(doc.data().name) && doc.data().paired && doc.data().game_code == g_code && doc.data().user_id != userid)
          {
            
            counter++;
            
            setPlace(doc, g_code, counter, userid, doc.data().partner_id);
            setPairs.add(doc.data().name);
            console.log(doc.data().name);
            setPairs.add(doc.data().partner_name);
            console.log(doc.data().partner_name);
          }      
      });
      }) 
    });
  })

}

var oneP = 10;
var twoP = 20;

function setPointsInHtml(doc){
  document.getElementById("myPoints").innerHTML = doc.data().game_points;
  if(doc.data().place == 5) document.getElementById("myPlace").innerHTML = "--";
  else document.getElementById("myPlace").innerHTML = doc.data().place;

}

function upgradePoints(doc){
  
  var p = doc.data().game_points;
  
  if(doc.data().partner_status)
  {
    p = p + twoP;
    
  }
  if(!doc.data().partner_status)
  {
    p = p + oneP;
  }

  // if(!doc.data().my_status && doc.data().partner_status)
  // {
  //   p = p + oneP;
  // }
  
  db.collection('users').doc(doc.id).update({game_points: p}); 

  //update partner points and status of partner
  db.collection('users').where('user_id', '==', userid).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
       var par_id = doc.data().partner_id;
       db.collection('users').doc(par_id).update({game_points:p}); 
       db.collection('users').doc(par_id).update({partner_status : true})
      
      
    });
})

}

function picBonus(doc, user_id){
  if (doc.id != user_id ) return;
  var p = doc.data().game_points + 5;
  
  db.collection('users').doc(doc.id).update({game_points: p}); 

  //update partner points and status of partner
  db.collection('users').where('user_id', '==', userid).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
       var par_id = doc.data().partner_id;
       db.collection('users').doc(par_id).update({game_points:p}); 
      
      
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
  var countDownDate = new Date(the_start_date);
  countDownDate.setDate(countDownDate.getDate() + 25);
  countDownDate = countDownDate.getTime();

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

  days = days ; //25 is the duration of the game

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "0";
  }
}, 1000);
}





function setUp(userid)
{
  
    //not realtime update
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
        
        document.getElementById("placeUp").style.visibility = "hidden";
        document.getElementById("placeDown").style.visibility = "hidden";
        if(doc.data().placeUp) document.getElementById("placeUp").style.visibility = "visible";
        if(doc.data().placeDown)document.getElementById("placeDown").style.visibility = "visible";
      });
  })


 


  //realtime update on html
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
        
        setPointsInHtml(doc);


        if(doc.data().partner_status) 
        {
          $('.myFriendButt').attr("disabled", true); 
          $("#poke").text("Your buddy already did their habit today!");
        }
       
        
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


   db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
  snapshot.docs.forEach(doc => {
    
  var g_code = doc.data().game_code;
  db.collection('create_game').where("game_code", "==" ,g_code).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {

        game_name.innerHTML ="\"" + doc.data().name + "\" challenge" ;
         
         
    });
    
  })
          });
          })

  
}

function getMyStatus(userid)
{
  
  db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
      var myCardBool = doc.data().my_status;
      ChangeMyCard(myCardBool);
      });
  })
}



// whaen you click on my button:
$('.myButt').click(function () {
    // change the css of the card no animation
    ChangeMyCard()
});

$(".myFriendButt").click(function () {
    ChangeFriendCard()
});

// changing the ui of my chard
function ChangeMyCard(myCardBool) {
    // alert("my card");
    // console.log("בדיקה");
    if (!myCardBool === false) {
        $('.txtchange').text("You can get extra points by uploading a picture.");
                                      
        // change the css and text of the button: no animation
        // $('.myButt').text("undo").removeClass("btn-primary").addClass("btn-secondary");
        $('.myButt').attr("disabled",true);
        $("#uploadFileButton").removeClass("disabled").addClass("active");
     }


}

// changing the ui of a friend card
function ChangeFriendCard() {
    // var userid = firebase.auth().currentUser.uid;
    
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

// poked your partner!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Alert Modal Type
$(document).on('click', '#success', function (e) {
    swal(
        'Success',
        'You just <b style="color:green;">Poked</b> your partner!!!' ,
        'success'
        // now make the button in another color!
        // document.getElementById('').style.color = 'green';
    )
        var user_id = firebase.auth().currentUser.uid;
        var docRef = db.collection("users").doc(user_id);
        
        docRef.get().then(function(doc) {
          var par_id = doc.data().partner_id;
          console.log(par_id);
          db.collection('users').doc(par_id).update({poke: true});
        });

        
       
    // 
});


function setPictureUser()
{
  var userid = firebase.auth().currentUser.uid;
  // console.log(userid);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + dd + yyyy;

  db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
    var g_code = doc.data().game_code;
    var path = g_code + '/' + today + '/' + userid;
    
    var storage = firebase.storage();
    var storageRef = storage.ref();

    //user
    storageRef.child(path).getDownloadURL().then(function(url) {
      var userImg = document.querySelector('#imagePreview');
      userImg.style = "background-image: url(" + url + ");";
        });
        })
  });
  
}

function setPicturePartner()
{
  var userid = firebase.auth().currentUser.uid;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + dd + yyyy;


  db.collection('users').onSnapshot(function(snapshot){
    snapshot.docChanges().forEach(function(change){
      console.log("change");
     db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
      snapshot.docs.forEach(doc => {
      var g_code = doc.data().game_code;
      var partnerPath = g_code + '/' + today + '/' + doc.data().partner_id;
      var storage = firebase.storage();
      var storageRef = storage.ref();

      //partner
      storageRef.child(partnerPath).getDownloadURL().then(function(url) {
        var userImg = document.querySelector('#imagePreview1');
        userImg.style = "background-image: url(" + url + ");";
          });
          })
    });
    
    });
  })

  // db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
  //   snapshot.docs.forEach(doc => {
  //   var g_code = doc.data().game_code;
  //   var partnerPath = g_code + '/' + today + '/' + doc.data().partner_id;
  //   var storage = firebase.storage();
  //   var storageRef = storage.ref();

  //   //partner
  //   storageRef.child(partnerPath).getDownloadURL().then(function(url) {
  //     var userImg = document.querySelector('#imagePreview1');
  //     userImg.style = "background-image: url(" + url + ");";
  //       });
  //       })
  // });
  
}



 

let setPairs = new Set();



function setPlace(doc, g_code, counter, useridd, par_id)
{
  
  var curPlace = doc.data().place;
  console.log("curPlace " + curPlace + "name" + doc.data().name);
  console.log("counter " + counter);
   
  if (counter < curPlace && (doc.data().user_id == useridd || doc.data().partner_id == par_id))
  {
     db.collection('users').doc(doc.id).update({placeUp: true});
     db.collection('users').doc(par_id).update({placeUp: true});
    console.log("curUserPlaceUp");
  } 
  if (counter > curPlace  && (doc.data().user_id == useridd || doc.data().partner_id == par_id))
  {
    db.collection('users').doc(doc.id).update({placeDown: true});
    db.collection('users').doc(par_id).update({placeDown: true});
    console.log("curUserPlaceDown");
  } 
  db.collection('users').doc(doc.id).update({place: counter});
   
  db.collection('users').doc(par_id).update({place: counter});

   
}


 


