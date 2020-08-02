function addToTable()
  {
    
  var table = document.getElementById("tbl");
  var row = table.insertRow(-1);
  var cell0 = row.insertCell(0)
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  cell0.innerHTML = "4"
  cell1.innerHTML = "Adi";
  cell2.innerHTML = "Hadar";
  
  }
