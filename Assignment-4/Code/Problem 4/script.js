document.getElementById("checkButton").addEventListener("click", function () {
  document.getElementById("myCheckbox").checked = true;
});

document.getElementById("combineNames").addEventListener("click", function () {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  document.getElementById("fullName").value = `${firstName} ${lastName}`;
});

const counterButton = document.getElementById("counterButton");
document
  .getElementById("incrementButton")
  .addEventListener("click", function () {
    counterButton.textContent = parseInt(counterButton.textContent) + 1;
  });
document.getElementById("resetButton").addEventListener("click", function () {
  counterButton.textContent = "0";
});

document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const listItems = document.querySelectorAll("#list li");
  listItems.forEach(function (item) {
    if (item.textContent.toLowerCase().includes(searchTerm)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

const balloons = document.querySelectorAll(".balloon");
balloons.forEach(function (balloon) {
  balloon.addEventListener("mouseover", function () {
    this.style.opacity = "0";
  });
});

document
  .getElementById("refreshBalloons")
  .addEventListener("click", function () {
    balloons.forEach(function (balloon) {
      balloon.style.opacity = "1";
    });
  });
