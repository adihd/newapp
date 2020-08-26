var bigList0 = [
    [
        ["today", 0, ".tile00"],
        ["future", 0, ".tile01"],
        ["future", 0, ".tile02"],
        ["future", 0, ".tile03"],
        ["future", 0, ".tile04"]
    ],
    [
        ["future", 0, ".tile10"],
        ["future", 0, ".tile11"],
        ["future", 0, ".tile12"],
        ["future", 0, ".tile13"],
        ["future", 0, ".tile14"]
    ],
    [
        ["future", 0, ".tile20"],
        ["future", 0, ".tile21"],
        ["future", 0, ".tile22"],
        ["future", 0, ".tile23"],
        ["future", 0, ".tile24"]
    ],

    [
        ["future", 0, ".tile30"],
        ["future", 0, ".tile31"],
        ["future", 0, ".tile32"],
        ["future", 0, ".tile33"],
        ["future", 0, ".tile34"]
    ],

    [
        ["future", 0, ".tile40"],
        ["future", 0, ".tile41"],
        ["future", 0, ".tile42"],
        ["future", 0, ".tile43"],
        ["future", 0, ".tile44"]
    ]
]

var bigList1 = JSON.stringify(bigList0);

// listen for auth status changes 
//  /////////////////////////////////////////////////////////////////////////

  let month1 = new Map()
  month1.set("01", "January");
  month1.set("02", "February");
  month1.set("03", "March");
  month1.set("04", "April");
  month1.set("05", "May");
  month1.set("06", "June" );
  month1.set("07", "July");
  month1.set("08", "August");
  month1.set("09", "September");
  month1.set("10", "October");
  month1.set("11",  "November");
  month1.set("12", "December");

auth.onAuthStateChanged(user => {
  // if the user log in show this contect
  if (user) {
    db.collection('users').where("user_id", "==", user.uid).onSnapshot((snap) =>{
       snap.docs.forEach(doc => {
         if(doc.data().new_pic) document.getElementById("newPic").style.visibility = "visible";
             else document.getElementById("newPic").style.visibility = "hidden";
       })})


    db.collection('guides').onSnapshot(snapshot => {
      console.log("user is login");
      console.log(user.uid);

    db.collection('users').where("user_id", "==", user.uid).get().then(snap =>{
       snap.docs.forEach(doc => {
         var game_code = doc.data().game_code;
         db.collection('create_game').where("game_code", "==" ,game_code).get().then(snap1=>{
           snap1.docs.forEach(doc => {
             goToWinner(doc);

           });
         });
       });
    });
      setupID(user);
    }, err => console.log(err.message));

    // if the user is log out show this : log out null!
  } else {
    // ×× ×”×ž×©×ª×ž×© ×ž×ª× ×ª×§
    console.log("user is logout and its null")
    // setupUI();
    setupID();
    // setupGuides([]);
  }
});
//  /////////////////////////////////////////////////////////////////////////


// if ( document.URL.includes("homepage.aspx") ) {
//   //Code here
// }

var urladi = window.location.href;
var gameCode = "";


///////////////////////////////////////////// signup-new

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  // alert(signupForm['signup-email'].value);
  const password = signupForm['signup-password'].value;
  // sign up the user & add firestore data for ex the name of the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
  return db.collection('users').doc(cred.user.uid).set({

      name: signupForm['signup-name'].value,
      mail: email,
      my_status: false,
      game_code: gameCode,
      game_points: 0,
      habit: "",
      max_points: 750,
      partner_id: "",
      partner_name: "",
      user_id: cred.user.uid,
      prize_idea: "",
      paired: false,
      place: 5,
      partner_status:false,
      poke:false,
      placeUp:false,
      placeDown:false,
      new_pic:false,
      mygame: bigList1
    });
    
  }).then(() => {
    
    signupForm.reset();
    window.location.replace("indexold.html");
  

  });
});
////////////sign-up-new-end

// // listen for auth status changes תראה אם המשתמש מתחבר או 
// let gameCode = "";
// let existCode = [];

// // create a list with gamecodes from the backend
// db.collection('create_game').onSnapshot(snapshot => {
//     snapshot.docs.forEach(doc => {
//         existCode.push(doc.data().game_code)

//     });
// })

// var urladi = window.location.href;
// if (window.location.href.indexOf("forms-info") > -1) {
//     gameCode = urladi.split("=").pop();
//     alert(gameCode);
// };


function gamePin(){

    var inputVal = document.getElementById("game-pin").value;
    check(inputVal);
}

function check(inputVal)
{     var a = "";
      db.collection('create_game').orderBy("start_date", "asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            if(doc.data().game_code == inputVal)
             {
               get_true("t", inputVal)
               a = "t"
             }
             else if(doc.data().end == true && a !="t") alert("the code is not correct!")
             

        });
    })

}

function get_true(v, inputVal)
{


  if(v == "t") {
        window.document.location = "./forms-invited.html" + "?codeGame=" + inputVal;
  } 
      // alert(gameCode);
  
}


function goToWinner(doc)
{

  var str = doc.data().start_date;

  var res = str.split("-");

  var year = res[0];
  var month1_in_num = res[1];
  var day = res[2];

  var month1_in_str = month1.get(month1_in_num);

  var the_start_date = month1_in_str + " " + day + ", " + year + " 00:00:00";
  // Set the date we're counting down to
  let start_date = new Date(the_start_date);
  
  let win_date = new Date(start_date);
  win_date.setDate(win_date.getDate() + 25)

  let now = new Date();

  if(win_date.toDateString() == now.toDateString())
  { 
    //move to this page the day after the end of the chllenge
    window.location.replace("winner.html" + "?codeGame=" + doc.data().game_code);
  }



}

//  /////////////////////////////////////////////////////////////////////////
// ! ×”×ª× ×ª×§×•×ª ×ž×”××¤×œ×™×§×¦×™×”
//  /////////////////////////////////////////////////////////////////////////

// // logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signOut();
// });

// ! ×”×ª×—×‘×¨×•×ª ×œ×•×’ ××™×Ÿ ×œ××¤×œ×™×§×¦×™×”
// login
// const loginForm = document.querySelector('#login-form');
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   // get user info
//   const email = loginForm['login-email'].value;
//   const password = loginForm['login-password'].value;

//   // log the user in
//   auth.signInWithEmailAndPassword(email, password).then((cred) => {
//     // close the signup modal & reset form
//     const modal = document.querySelector('#modal-login');
//     M.Modal.getInstance(modal).close();
//     loginForm.reset();
//   });

// });

