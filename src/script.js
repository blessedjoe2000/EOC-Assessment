// DON'T EDIT THOSE LINES
const dataURLBase = "https://docs.google.com/spreadsheets/d/";
const dataURLEnd = "/gviz/tq?tqx=out:text&tq&gid=";
const id = "1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE";
const gids = ["0", "1574569648", "1605451198"];
// END OF DATA SETUP

// TODO your code here
let employees = [];

async function fetchData(link){
  const response  = await fetch(link);
  const dataText = await response.text();
  const dataTextConvertedToJson = JSON.parse(dataText.slice(47, -2));
  return dataTextConvertedToJson.table.rows
}

function createEmployeesTable(employeesData){
  let table = document.getElementById("employees");
  table.border = "1";

  const tableHeading = ["Last Name", "First Name", "Hire Date", "Salary"];
  let trHeading = document.createElement("tr");
  table.appendChild(trHeading);
  for(let i = 0; i<tableHeading.length; i++){
    let th = document.createElement("th");
    th.innerHTML = tableHeading[i];
    th.style.textAlign = "center";
    trHeading.appendChild(th);
  }
  
  for(let employee of employeesData){
    let tr = document.createElement("tr");
    table.appendChild(tr);

    for(let property in employee){
      let td = document.createElement("td");
      td.innerHTML = (employee[property]);
      tr.appendChild(td);
    }
  }
}

async function employeesData(){
  let link = `${dataURLBase}${id}${dataURLEnd}${gids[0]}`;
  let rows = await fetchData(link);
  let i = 0;
  for(let row of rows){
    if(row.c[0].v == "first"){
      continue;
    }
    employees[i] = {
      "last Name": row.c[1].v,
      "first Name": row.c[0].v
    }
    i++;
  }

  link = `${dataURLBase}${id}${dataURLEnd}${gids[1]}`;
  rows = await fetchData(link);
  i = 0;
  for(let row of rows){
    employees[i] = {
      ...employees[i], "hiredDate": (new Date(row.c[0].f)).toDateString().slice(4, 15)
    };
    i++;
  }

  link = `${dataURLBase}${id}${dataURLEnd}${gids[2]}`;
  rows = await fetchData(link);
  i = 0;
  for(let row of rows){
    employees[i] = {
      ...employees[i],
      "salary": Intl.NumberFormat("en-US",{style: "currency", currency: "USD", maximumFractionDigits: 2}).format(row.c[0].v)
    }
    i++;
  }

  createEmployeesTable(employees);
}
employeesData();
