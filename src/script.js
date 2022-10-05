// DON'T EDIT THOSE LINES
const dataURLBase = "https://docs.google.com/spreadsheets/d/";
const dataURLEnd = "/gviz/tq?tqx=out:text&tq&gid=";
const id = "1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE";
const gids = ["0", "1574569648", "1605451198"];
// END OF DATA SETUP

// TODO your code here
let employees = [];

async function getEmployeesData() {
  const nameResponse = await fetch(
    `${dataURLBase}${id}${dataURLEnd}${gids[0]}`
  );
  const employeesName = await nameResponse.text();
  const convertedEmployeesName = JSON.parse(
    employeesName.substring(47).slice(0, -2)
  ).table.rows;

  const dateResponse = await fetch(
    `${dataURLBase}${id}${dataURLEnd}${gids[1]}`
  );
  const employeesDate = await dateResponse.text();
  const convertedEmployeesDate = JSON.parse(
    employeesDate.substring(47).slice(0, -2)
  ).table.rows;

  const salaryResponse = await fetch(
    `${dataURLBase}${id}${dataURLEnd}${gids[2]}`
  );
  const employeesSalary = await salaryResponse.text();
  const convertedEmployeesSalary = JSON.parse(
    employeesSalary.substring(47).slice(0, -2)
  ).table.rows;

  for (let i = 1; i < convertedEmployeesName.length; i++) {
    employees[i] = {
      firstName: convertedEmployeesName.c[0].v,
      lastName: convertedEmployeesName.c[1].v,
    };
  }

  // console.log(convertedEmployeesName);
}
getEmployeesData();

async function employeesData() {
  const rowData = await getEmployeesData();
  const dataArr = rowData.map((dataSheet) => {
    return dataSheet.map((row) => {
      return row.c.map((cell) => {
        return cell.v;
      });
    });
  });
  return dataArr;
}
employeesData();

// console.log(employeesData());

async function dataObj() {
  const dataArray = await employeesData();
  for (let i = 0; i < dataArray.length; i++) {
    data.push(i);
  }
}
