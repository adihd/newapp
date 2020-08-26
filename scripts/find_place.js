
// let setPairs = new Set();

// const orderByPlace  = (useridd) => {
//     db.collection('users').where("user_id", "==", useridd).onSnapshot(snapshot =>{
//   snapshot.docs.forEach(doc => {
//   var g_code = doc.data().game_code;
//   var user_n = doc.data().name;
//   var counter = 0;
//   db.collection('users').orderBy('game_points', 'desc').onSnapshot(snapshot =>{
//     snapshot.docs.forEach(doc => {
//       if(!setPairs.has(doc.data().name) && doc.data().paired && doc.data().game_code == g_code && doc.data().user_id != userid)
//       {
//         counter++;
//         setPlace(doc, g_code, counter, useridd);
//         setPairs.add(doc.data().name);
//         setPairs.add(doc.data().partner_name);
//       }      
//   });
//   }) 
//   });
//   })
// };


// function setPlace(doc, g_code, counter, useridd)
// {
  
//   var curPlace = doc.data().place;
//   console.log("curPlace " + curPlace);
//   console.log("counter " + counter);
//   if (counter < curPlace && doc.data().partner_id == useridd) console.log("curUserPlaceUp");
//   if (counter > curPlace  && doc.data().partner_id == useridd) console.log("curUserPlaceDown");
//   var par_id = doc.data().partner_id;
//    db.collection('users').doc(doc.id).update({place: counter});
   
//     db.collection('users').doc(par_id).update({place: counter});

//     if(doc.data().partner_id == useridd) document.getElementById("myPlace").innerHTML = doc.data().place;
// }