const addSubject = document.querySelector(".add-subject");
const parentContainer = document.querySelector(".new-subject-details");
const generateMarksheet = document.querySelector(".generate-marksheet");
const dataTable = document.querySelector("#marksheet-data");

console.log(addSubject);

addSubject.addEventListener("click", handleaddSubject);

function handleaddSubject(event) {
  let div = document.createElement("div");
  div.classList.add("subject-details");

  let subjectName = document.createElement("input");
  subjectName.setAttribute("type", "text");
  subjectName.setAttribute("placeholder", "Subject Name");

  let fullMarks = document.createElement("input");
  fullMarks.setAttribute("type", "number");
  fullMarks.setAttribute("placeholder", "Full Marks");
  fullMarks.value = 100;

  let obtainedMarks = document.createElement("input");
  obtainedMarks.setAttribute("type", "number");
  obtainedMarks.setAttribute("placeholder", "Obtained Marks");

  div.append(subjectName);
  div.append(fullMarks);
  div.append(obtainedMarks);

  parentContainer.append(div);
  generateMarksheet.style.display = "block";
}

generateMarksheet.addEventListener("click", handleTableData);

function handleTableData(event) {
  event.preventDefault();
  let totalObtained = 0;
  let totalMarks = 0;
  dataTable.style.display = "block";
  let inputObtainers = document.querySelectorAll(
    ".new-subject-details .subject-details input:nth-child(3)"
  );
  let inputTotal = document.querySelectorAll(
    ".new-subject-details .subject-details input:nth-child(2)"
  );
  inputObtainers.forEach((inputObtainer) => {
    totalObtained = totalObtained + +inputObtainer.value;
    console.log(inputObtainer.value);
  });
  inputTotal.forEach((total)=>{
    totalMarks = totalMarks + (+total.value);
  })
  console.log(totalObtained);
  console.log(totalMarks);
}
