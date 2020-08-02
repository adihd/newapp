// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
// const admin_name = document.querySelector('.adminname');
const admin_name = document.querySelector('#adminname');

let userid = "";
let inputprize = "";
let inputhabit = "";
var gameCode ="";
var urladi = window.location.href;
// var urladi = window.location.href;
// var gameCode = "";







// goint to take everything that is not the game code value and replace it with nothing
// let querystring = document.search.replace(/^.*?\codeGame=/,"");



// }); ////////////////////////////////////////// the most importent thing!!!!

  const setupID = (user) => {
    if (user) {
      userid = user.uid;
      setUpAdmin(userid)
    } else {
      userid = "";
    }
  };

// dropdown coose prize /////////////////////////////////////////////////////
var sel = document.getElementById("prize");

function coosePrize(sel) {
  var text = sel.options[sel.selectedIndex].text;
  console.log(text);
  // console.log(userid);
  inputprize = text;
};

// ////////////////////////////// choose habit /////////////////////////////
function chooseHabit(sel) {

  if (document.getElementById('paint_habit').checked) {
  inputhabit = "paint";
  }
  if (document.getElementById('knit_habit').checked) {
  inputhabit = "knit";
  }
  if (document.getElementById('play_instrument_habit').checked) {
  inputhabit = "play instrument";
  }
  console.log(inputhabit);
}




// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});




////////////////////////////////////////////////////////////////////////////////
// seting habit and prize idea in firestoer //////////////////////////////////////////////////////
function setHabitprize() {
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot => {
    snapshot.docs.forEach(doc => {
      if (window.location.href.indexOf("forms-invited") > -1) {gameCode = urladi.split("=").pop();}
      db.collection('users').doc(doc.id).update({
        habit: inputhabit,
        prize_idea: inputprize,
        game_code : gameCode
      }).then(() => {
        window.location.replace("start-game.html");
        // console.log("habit")
      });
    });
  });
  // window.location.href = 'forms-invited.html';
};

var useremoji1 = ""

////////////
// !emojipicker


$(document).ready(function () {
    var el = $("#standalone").emojioneArea({
        standalone: true,
        autocomplete: false
    });
    el[0].emojioneArea.on("emojibtn.click", function (btn, event) {
        // console.log(btn.html());
        useremoji1 = el[0].emojioneArea.getText();
        console.log(useremoji1);
    });
    // console.log();
});

////////////////////////////////////////////////////////////////////////////////
// seting habit and prize idea in firestoer creator //////////////////////////////////////////////////////

// forms-createchallenge.html

function setHabitprize1() {
  db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot => {
    snapshot.docs.forEach(doc => {
      db.collection('users').doc(doc.id).update({
        habit: inputhabit,
        prize_idea: inputprize
        // game_code = gameCode
      }).then(() => {
        window.location.replace("forms-invited-create.html");
        // console.log("habit")
      });
    });
  });
  // window.location.href = 'forms-invited.html';
};

function  setUpAdmin(userid)
{
  if (window.location.href.indexOf("forms-invited") > -1) {gameCode = urladi.split("=").pop();}
  console.log(gameCode)

  db.collection('create_game').where('game_code', '==', gameCode).onSnapshot(snapshot => {
  snapshot.docs.forEach(doc => {
    var admin_id = doc.data().admin;
    db.collection('users').where('user_id', '==', admin_id).onSnapshot(snapshot => {
  snapshot.docs.forEach(doc => {
    
    admin_name.innerHTML = doc.data().name;

         });
      });
   

         });
      });
}








































////////////////////////////////////////////////////////////////////////////////

// $(document).ready(function () {
//   var el = $("#prize").emojioneArea({
//     pickerPosition: "bottom",
//     tonesStyle: "bullet"
//   });
//   el[0].emojioneArea.on("emojibtn.click", function (btn, event) {
//     // console.log(btn.html());
//     emojiprize = el[0].emojioneArea.getText();
//     console.log(emojiprize);
//   });
//   // console.log();
// });



// prize idea...
// function prize() {
//   var inputVal = document.getElementById("prize").value;
//   // Displaying the value
//   alert(inputVal);
//   //realtime update
//   db.collection('users').where('user_id', '==', userid).onSnapshot(snapshot => {
//     snapshot.docs.forEach(doc => {
//       db.collection('users').doc(doc.id).update({
//         prize_idea: inputVal
//       }).then(() => {
//         window.location.replace("home.html");
//       });
//     });

//   });
//   // window.location.href = 'forms-invited.html';
// };
// db.collection('users')

//  db.collection('users').where("user_id", "==", userid).onSnapshot(snapshot =>{
//           snapshot.docs.forEach(doc => {
//           var g_code = doc.data().game_code;
//           db.collection('users').where("paired", "==",true).where("game_code", "==",g_code).onSnapshot(snapshot =>{
//     snapshot.docs.forEach(doc => {
//           if(!pairsSet.has(doc.data().name))
//          {
//           addPairsToList(doc, c);
//           c = c + 1;
//          }

//     });

//   })


//           });
//           })


// setup the ui of hte app based on the user :)
// const setupUI = (user) => {
//   if (user) {
//     // if user is log in
//     // console.log(user)
//     // go to home page page:
//     // window.location.href = "home.html".then(alert(""))
//     // we check if hte user exsist!!!!!!
//     // defind the user id as global variable
//     userid = user.uid;

//     // account info
//     // db.collection('users').doc(user.uid).get().then(doc => {
//     //   const html = `
//     //     <div>Logged in as ${user.email}</div>
//     //     <div>${doc.data().name}</div>
//     //   `;
//     //   accountDetails.innerHTML = html;
//     // });
//     // // toggle user UI elements
//     // loggedInLinks.forEach(item => item.style.display = 'block');
//     // loggedOutLinks.forEach(item => item.style.display = 'none');
//   } else {
//     userid = "";
//     // // clear account info
//     // accountDetails.innerHTML = '';
//     // // toggle user elements
//     // loggedInLinks.forEach(item => item.style.display = 'none');
//     // loggedOutLinks.forEach(item => item.style.display = 'block');
//   }
// };




// 