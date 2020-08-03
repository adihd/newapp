


// listen for auth status changes 
//  /////////////////////////////////////////////////////////////////////////

auth.onAuthStateChanged(user => {
  console.log(user);
  // if the user log in show this contect
  if (user) {
    // ×× ×”×ž×©×ª×ž×© ×ž×ª×—×‘×¨
    db.collection('guides').onSnapshot(snapshot => {
      // setupGuides(snapshot.docs);
      // ×ª×ª×—×‘×¨ ×•×ª×©× ×” ××ª ×”×™×• ××™ ×‘×”×ª××!!
      console.log("user is login");
      // console.log(user);
      // setupUI(user);
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
      max_points: 1000,
      partner_id: "",
      partner_name: "",
      user_id: cred.user.uid,
      prize_idea: "",
      paired: false,
      partner_status:false
    });

    // console.log("user signin success!!!")
    //  if (window.location.href.indexOf("forms-invited") > -1) {gameCode = urladi.split("=").pop();}
    
  }).then(() => {
    
    console.log("user data signin success - tom!!!")
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
               console.log("right_code")
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