const addSubject = document.querySelector(".add-subject");
const parentContainer = document.querySelector(".new-subject-details");
const generateMarksheet = document.querySelector(".generate-marksheet");
const studentImageInput = document.querySelector(".student-image");
const studentPicInMarksheet = document.querySelector(".student-pic");
const form = document.querySelector("form");

//!================= handeling adding new subject using "Add subject button"  =============
addSubject.addEventListener("click", handleaddSubject);

function handleaddSubject(event) {
  let div = document.createElement("div");
  div.classList.add("subject-details");

  let subjectName = document.createElement("input");
  subjectName.setAttribute("type", "text");
  subjectName.setAttribute("placeholder", "Subject Name");
  subjectName.setAttribute("name", "subjectName");

  let fullMarks = document.createElement("input");
  fullMarks.setAttribute("type", "number");
  fullMarks.setAttribute("placeholder", "Full Marks");
  fullMarks.setAttribute("name", "fullMarks");
  fullMarks.value = 100;

  let obtainedMarks = document.createElement("input");
  obtainedMarks.setAttribute("type", "number");
  obtainedMarks.setAttribute("placeholder", "Obtained Marks");
  obtainedMarks.setAttribute("name", "obtainedMarks");

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "<i class='fa fa-trash'></i>";
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");

  div.append(subjectName);
  div.append(fullMarks);
  div.append(obtainedMarks);
  div.append(deleteBtn);

  parentContainer.append(div);
  generateMarksheet.style.display = "block";

  //==========> adding functionality in "delete-btn"
  deleteBtn.addEventListener("click", function () {
    div.remove();
  });
}

//!============= Generating new marksheet with all the input details using "Generate button" ====================

generateMarksheet.addEventListener("click", handlegenerateMarksheet);

function handlegenerateMarksheet(event) {
  event.preventDefault();

  let marksheetContainer = document.querySelector(
    ".container .marks-container:nth-of-type(2)"
  );
  marksheetContainer.style.display = "block";
  handleStudentMarksDisplay();
}

//!====================> student Marks Details displayed in a "table" <==============================

function handleStudentMarksDisplay() {
  // let marksHeading = document.querySelector(".marks-heading");
  let totalDisplay = document.querySelector(".total-display");
  let marksDetails = document.querySelectorAll(".student-marks-details");

  //!==> Resetting the tablr data by removing all the previous data .
  if (marksDetails.length) {
    // console.log(marksDetails);
    marksDetails.forEach((markDetail) => {
      markDetail.remove();
    });
  }

  let studentTotalSubjectMarks = 0;
  let studentObtainesMarks = 0;

  let elements = form.elements;

  let subjectNames = elements.subjectName;
  let fullMarks = elements.fullMarks;
  let obtainedMarks = elements.obtainedMarks;

  // subjectNames = Array.from(subjectNames);
  // fullMarks = Array.from(fullMarks);
  // obtainedMarks = Array.from(obtainedMarks);

  console.log(subjectNames);
  console.log(fullMarks);
  console.log(obtainedMarks);

  //!====> displaying all subject with their respective "total marks" and "obtained marks"
  if(subjectNames===undefined)
    {
          
    }
  else if (subjectNames.length) {
    for (
      let i = 0;
      i < subjectNames.length &&
      i < fullMarks.length &&
      i < obtainedMarks.length;
      i++
    ) {
      console.log("enter");
      let tableRow = document.createElement("tr");
      tableRow.setAttribute("class", "student-marks-details");

      let tdSubjectName = document.createElement("td");
      tdSubjectName.setAttribute("colspan", "2");
      tdSubjectName.textContent = subjectNames[i].value;

      let tdFullMarks = document.createElement("td");
      tdFullMarks.textContent = fullMarks[i].value;

      let tdObtainedMarks = document.createElement("td");
      tdObtainedMarks.textContent = obtainedMarks[i].value;

      tableRow.append(tdSubjectName);
      tableRow.append(tdFullMarks);
      tableRow.append(tdObtainedMarks);

      //  marksHeading.after(tableRow);
      totalDisplay.before(tableRow);
      studentObtainesMarks = studentObtainesMarks + +obtainedMarks[i].value;
      studentTotalSubjectMarks = studentTotalSubjectMarks + +fullMarks[i].value;
    }
  } else if(subjectNames) {
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("class", "student-marks-details");

    let tdSubjectName = document.createElement("td");
    tdSubjectName.setAttribute("colspan", "2");
    tdSubjectName.textContent = subjectNames.value;

    let tdFullMarks = document.createElement("td");
    tdFullMarks.textContent = fullMarks.value;

    let tdObtainedMarks = document.createElement("td");
    tdObtainedMarks.textContent = obtainedMarks.value;

    tableRow.append(tdSubjectName);
    tableRow.append(tdFullMarks);
    tableRow.append(tdObtainedMarks);

    //  marksHeading.after(tableRow);
    totalDisplay.before(tableRow);
    studentObtainesMarks = studentObtainesMarks + +obtainedMarks.value;
    studentTotalSubjectMarks = studentTotalSubjectMarks + +fullMarks.value;
  }else{
        console.log("extra options");
  }


  // console.log(studentObtainesMarks);
  // console.log(studentTotalSubjectMarks);

  //!===========> displaying calculated total,percentage,grade
  let tdTotal = document.querySelector(".total-display td");
  tdTotal.textContent = studentObtainesMarks;

  let percentage = document.querySelector(".percentage");
  let studentPercent = (studentObtainesMarks / studentTotalSubjectMarks) * 100;
  if (studentPercent) {
    percentage.textContent = `${studentPercent}%`;
  } else {
    percentage.textContent = "0%";
  }

  let grade = document.querySelector(".grade");
  if (studentPercent >= 90) {
    grade.textContent = "A+";
  } else if (studentPercent >= 80 && studentPercent < 90) {
    grade.textContent = "A";
  } else if (studentPercent >= 70 && studentPercent < 80) {
    grade.textContent = "B+";
  } else if (studentPercent >= 60 && studentPercent < 70) {
    grade.textContent = "B";
  } else if (studentPercent >= 50 && studentPercent < 60) {
    grade.textContent = "C+";
  } else if (studentPercent >= 40 && studentPercent < 50) {
    grade.textContent = "C";
  } else {
    grade.textContent = "Fail";
  }
}

//!================> Candidate Image <======================

function handleStudentImage(event) {
  console.log(event.target.files);
  let studentImageURL = URL.createObjectURL(event.target.files[0]);
  studentPicInMarksheet.src = studentImageURL;
}

studentImageInput.addEventListener("change", handleStudentImage);

//!================> School Logo <======================

const schoolLogoInput = document.querySelector(".school-logo-input");
schoolLogoInput.addEventListener("change", function (event) {
  const displayLogo = document.querySelector(".logo");
  const logoURL = URL.createObjectURL(event.target.files[0]);
  displayLogo.src = logoURL;
});

//!================> School Name <======================

const schoolNameInput = document.querySelector(".school-name-input");
schoolNameInput.addEventListener("input", function (event) {
  const schoolName = document.querySelector(".school-name");
  schoolName.textContent = event.target.value;
});

//!================> School Tag <======================

const tagLineInput = document.querySelector(".tag-input");
tagLineInput.addEventListener("input", function (evet) {
  const tagLine = document.querySelector(".school-descp");
  tagLine.textContent = evet.target.value;
});

//!================> Candidate Name <======================

const candidateNameInput = document.querySelector(".student-name");
candidateNameInput.addEventListener("input", (event) => {
  const candidateName = document.querySelector(".candidate-name");
  candidateName.textContent = event.target.value;
});

//!================> Candidate Father Name <======================

const candidateFatherInput = document.querySelector(".father-name");
candidateFatherInput.addEventListener("input", (event) => {
  const candidateFather = document.querySelector(".father");
  candidateFather.textContent = event.target.value;
});

//!================> Candidates DOB <======================

const dobInput = document.querySelector(".date-input");
dobInput.addEventListener("change", (event) => {
  const dob = document.querySelector(".dob");
  dob.textContent = event.target.value;
});

//!================> Candidates Gender <======================

const candidateGenderInput = document.querySelector("#gender");
candidateGenderInput.addEventListener("change", (event) => {
  const candidateGender = document.querySelector(".candidate-gender");
  candidateGender.textContent = event.target.value;
});

//!================> Candidates Class <======================

const candidateClassInput = document.querySelector(".class-input");
candidateClassInput.addEventListener("input", (event) => {
  const candidateClass = document.querySelector(".class");
  candidateClass.textContent = event.target.value;
});

//!================> Candidates Roll Number <======================
const candidateRollInput = document.querySelector(".roll-input");
candidateRollInput.addEventListener("input", (event) => {
  const candidateRoll = document.querySelector(".roll");
  candidateRoll.textContent = event.target.value;
});
