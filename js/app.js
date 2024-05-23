const addSubject = document.querySelector(".add-subject");
const parentContainer = document.querySelector(".new-subject-details");
const generateMarksheet = document.querySelector(".generate-marksheet");
const studentImageInput = document.querySelector(".student-image")
const studentPicInMarksheet = document.querySelector(".student-pic");
const form = document.querySelector("form");


//!================= handeling adding new subject  =============
addSubject.addEventListener("click", handleaddSubject);

function handleaddSubject(event) {
  let div = document.createElement("div");
  div.classList.add("subject-details");

  let subjectName = document.createElement("input");
  subjectName.setAttribute("type", "text");
  subjectName.setAttribute("placeholder", "Subject Name");
  subjectName.setAttribute("name" , "subjectName");

  let fullMarks = document.createElement("input");
  fullMarks.setAttribute("type", "number");
  fullMarks.setAttribute("placeholder", "Full Marks");
  fullMarks.setAttribute("name" , "fullMarks");
  fullMarks.value = 100;

  let obtainedMarks = document.createElement("input");
  obtainedMarks.setAttribute("type", "number");
  obtainedMarks.setAttribute("placeholder", "Obtained Marks");
  obtainedMarks.setAttribute("name" , "obtainedMarks");

  div.append(subjectName);
  div.append(fullMarks);
  div.append(obtainedMarks);

  parentContainer.append(div);
  generateMarksheet.style.display = "block";
}

//!============= Generating new marksheet with all the input details .

generateMarksheet.addEventListener("click", handlegenerateMarksheet);

function handlegenerateMarksheet(event) {
  event.preventDefault();

  handelStudentMarksDisplay();
  

}


//!===> student Marks Details

function handelStudentMarksDisplay()
{
    let marksHeading = document.querySelector(".marks-heading");
    let totalDisplay = document.querySelector(".total-display");
    let marksDetails =document.querySelectorAll(".student-marks-details");

    marksDetails.forEach((markDetail)=>{
      markDetail.remove();
    })

   
    let studentTotalSubjectMarks = 0;
    let studentObtainesMarks = 0 ;

    let elements = form.elements ;
   
    let subjectNames = elements.subjectName ;
    let fullMarks = elements.fullMarks ;
    let obtainedMarks = elements.obtainedMarks;
    
    subjectNames = Array.from(subjectNames);
    fullMarks = Array.from(fullMarks);
    obtainedMarks = Array.from(obtainedMarks);

    //!====> displaying all subject with their respective "total marks" and "obtained marks"

    for(let i = 0 ; i<subjectNames.length && i<fullMarks.length && i<obtainedMarks.length ; i++)
    {
      let tableRow = document.createElement("tr");
      tableRow.setAttribute("class" , "student-marks-details");

       let tdSubjectName = document.createElement("td");
       tdSubjectName.setAttribute("colspan" , "2");
       tdSubjectName.textContent = subjectNames[i].value;

       let tdFullMarks = document.createElement("td");
       tdFullMarks.textContent = fullMarks[i].value;

       let tdObtainedMarks = document.createElement("td");
       tdObtainedMarks.textContent = obtainedMarks[i].value ;

       tableRow.append(tdSubjectName);
       tableRow.append(tdFullMarks);
       tableRow.append(tdObtainedMarks);

      //  marksHeading.after(tableRow);
      totalDisplay.before(tableRow);
      studentObtainesMarks = studentObtainesMarks + (+obtainedMarks[i].value);
      studentTotalSubjectMarks = studentTotalSubjectMarks + (+fullMarks[i].value);
    }

    // console.log(studentObtainesMarks);
    // console.log(studentTotalSubjectMarks);

    //!===========> displaying calculated total,percentage,grade
    let tdTotal = document.querySelector(".total-display td");
    tdTotal.textContent = studentObtainesMarks ;

    
    let percentage = document.querySelector(".percentage");
    let studentPercent = (studentObtainesMarks/studentTotalSubjectMarks)*100 ;
    percentage.textContent = `${studentPercent}%`;

    
    let grade = document.querySelector(".grade");
    if(studentPercent>=90)
      {
        grade.textContent = "A+";
      }
    else if(studentPercent>=80 && studentPercent<90)
      {
        grade.textContent = "A";
      }
    else if(studentPercent>=70 && studentPercent<80)
      {
        grade.textContent = "B+";
      }
    else if(studentPercent>=60 && studentPercent<70)
      {
        grade.textContent = "B";
      }
    else if(studentPercent>=50 && studentPercent<60)
      {
        grade.textContent = "C+";
      }
    else if(studentPercent>=40 && studentPercent<50)
      {
        grade.textContent = "C";
      }
    else{
      grade.textContent = "Fail";
    }
}


function handleStudentImage(event)
{
   console.log(event.target.files);
   let studentImageURL =  URL.createObjectURL(event.target.files[0]);
   studentPicInMarksheet.src = studentImageURL;
}

studentImageInput.addEventListener("change" , handleStudentImage);
