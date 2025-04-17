const shuffleButton = document.createElement("button");

window.addEventListener("load", animateLoadingDots);

function animateLoadingDots() {
  const dots = document.querySelector(".loading-dots");

  setInterval(() => {
    dots.textContent = dots.textContent === "..." ? "" : dots.textContent + ".";
  }, 500);
}

document
  .querySelector(".shuffle-btn button")
  .addEventListener("click", function () {
    fetch("https://fe-students.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => {
        selectRandomStudent(data);
      })
      .catch((err) => {
        console.log("API Error: ");
        console.log(err);
      });
  });

function selectRandomStudent(data) {
  const students = data.results;
  const randomIndex = Math.floor(Math.random() * students.length);
  const randomStudent = students[randomIndex];
  const genericMessage = document.querySelector(".generic-message h2");
  genericMessage.innerHTML = `The selected student is ${randomStudent.name}`;

  const studentList = document.querySelectorAll(".student-list p");
  studentList.forEach((student) => {
    if (student.textContent === randomStudent.name) {
      student.classList.add("selected");
    } else {
      student.classList.remove("selected");
    }
  });

  setTimeout(() => {
    genericMessage.innerHTML = "On Your Mark, Get Set...";
    animateLoadingDots();
  }, 5000);
}
