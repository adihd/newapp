

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function () {
    // aria-expanded="false"
    document.getElementById("collapseExample").setAttribute("class", "collapse");
    document.getElementById("uploadpic").innerHTML = "Well done! You got 3 bonus points!!!";
    readURL(this);
    $('#switch3').prop('disabled' , true);
    $('.form-inline').prop('disabled' , true);

});

function saveImg(file)
{
  alert("hi")
  const setupID = (user) => {
    
    if (user) {
      userid = user.uid;
     
      saveImgToStorage(userid, file);
    } else {
      userid = "";
    }
  };
}

$('#imageUpload').on("change", function(event){
  var selectedfile = event.target.files[0];
  uploadFile(selectedfile)
});

function uploadFile(selectedfile)
{
  // var filename = 'ttt';
  // // Create a root reference
  // var storageRef = storage.ref('/images/' + filename);
  // var uploadTask = storageRef.put(selectedfile);

  // uploadTask.on('state_changed', function(snapshot){

  // }, 
  // function(error){

  // },
  // function(){
  //   var downloadURL = uploadTask.snapshot.downloadURL;
  //   console.log(downloadURL);  
  // });
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userid = user.uid;
    uploadFile2(userid ,selectedfile)
    alert("hi")
  } else {
     userid = "";
  }
  });
 
}

function uploadFile2(userid , selectedfile)
{
  
  var filename = userid;
  // Create a root reference
  var storageRef = storage.ref('/images/' + filename);
  var uploadTask = storageRef.put(selectedfile);

  uploadTask.on('state_changed', function(snapshot){

  }, 
  function(error){

  },
  function(){
    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log(downloadURL);  
  });
 
  // var fileRef = storage().child(filename);
}
