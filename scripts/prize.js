//get reference from html
const pairs_point_status = document.querySelector('#pairs_point_status'); 

const user_name = document.querySelector('#user_name_at_nav');

const prize = document.querySelector('#the_big_prize');

let pairsSet = new Set();

// const temp_userid = "tomID";

let userid = ""


const setupID = (user) => {
  if (user) {
    userid = user.uid;
    setUp(userid);
  } else {
    userid = "";
  }
};


// userid = temp_userid;

function renderPairs(doc){

    //creats the pair names in the list
    let pair = document.createElement('div');
    pair.className = "mb-0";

    let img = document.createElement('img');
    img.src = setPictureSrc(doc); 
    img.alt = "";
    img.className = "thumb-sm mr-1";
    pair.appendChild(img);

    let span = document.createElement('span');
    let text = document.createElement('strong');
    text.setAttribute('data-id', doc.id);
    pairsSet.add(doc.data().name);
    pairsSet.add(doc.data().partner_name);
    text.innerHTML = doc.data().name + " &amp; " + doc.data().partner_name;
    span.appendChild(text);
    pair.appendChild(span);
    pairs_point_status.appendChild(pair);
    

    // set the currect points
    let points = document.createElement('small');
    points.className = "float-right text-muted ml-3 font-14";
    points.innerHTML = doc.data().game_points;
    pairs_point_status.appendChild(points);

    //set bar
    let bar_out = document.createElement('div');
    bar_out.className = "progress mt-2 mb-4  bg-white";
    bar_out.setAttribute("style", "height:6px;");
    
    let progress = document.createElement('progress');
    progress.className = "progress-bar bg-pink";
    var size = doc.data().game_points / doc.data().max_points;
    size = size * 100;
    console.log(size);
    progress.setAttribute("style", "width:" + size + "%; border-radius:5px;");   
    bar_out.appendChild(progress);
    pairs_point_status.appendChild(bar_out);   
   
}

function setPictureSrc(doc)
{
  if(doc.data().my_status && doc.data().partner_status)
  {
    return "assets/images/Star.png"
  }
  else 
  {
    return "assets/images/poop.png"
  }
}



function setUp(userid)
{
  let prize = new Map()
  prize.set("Pizza", 0);
  prize.set("Hamburger", 0);
  prize.set("Movie&Popcorn", 0);

  //set prize
   db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
          snapshot.docs.forEach(doc => {
          var g_code = doc.data().game_code;
          db.collection('users').where("game_code", "==",g_code).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
      if(doc.data().prize_idea == "Pizza") prize.set("Pizza", prize.get("Pizza") + 1);
      console.log(prize.get("Pizza"));
         
         
    });
    
  })
          
        
          });
          })

  //get users from the same game of the conected user, that are paired
 db.collection('users').where("user_id", "==", userid).get().then((snapshot) =>{
          snapshot.docs.forEach(doc => {
          var g_code = doc.data().game_code;
          db.collection('users').where("paired", "==",true).where("game_code", "==",g_code).get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
      if(!pairsSet.has(doc.data().name)) renderPairs(doc);
         
         
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
  