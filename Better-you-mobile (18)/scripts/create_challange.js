

//get reference from html
const game_code = document.querySelector('#game_code');



var g_duration = 0;


function save_duration()
{
  var ee = document.getElementById("duration_select");
  g_duration = ee.options[ee.selectedIndex].text;
    
  
}



// // saving data
// form.addEventListener('submit', (e) => { // submit == click or enter
//     e.preventDefault(); // prevent the refreshing of the page when clicking the button
//     db.collection('create_game').add({ 
//         name: form.name.value,
//         city: form.city.value
//     });
// });

var g_code = game_code.value = make_code(4);

function make_code(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function create_game()
{
  var g_name = document.querySelector('#group-name').value;
  var g_start_date = document.querySelector('#example-datetime-local-input').value;
  console.log(g_duration);
  db.collection("create_game").doc(g_name).set({
      name: g_name,
      game_code: g_code,
      duration: g_duration,
      start_date: g_start_date,
      admin:""
  }).then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  window.document.location = "./forms-invited-create.html" + "?codeGame=" + g_code;
  // window.location.replace("forms-invited-create.html");


}

// function setAdmin(userid)
// {
//   db.collection("create_game").where("game_code","==",g_code).doc(g_name).set({
//      admin: userid
//   }).then(function() {
//       console.log("Document successfully written!");
//   })
//   .catch(function(error) {
//       console.error("Error writing document: ", error);
//   });

// }


//copy to clipboard func
$('.copyboard').on('click', function(e) {
  e.preventDefault();

  var copyText = g_code;

  var textarea = document.createElement("textarea");
  textarea.textContent = copyText;
  textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy"); 

  document.body.removeChild(textarea);
})



// db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })

// console.log(document.querySelector('#group-name'));