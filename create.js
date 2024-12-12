const url = "https://lab-6-harashchuk-production.up.railway.app";

const dropdownForm = document.getElementById("dropdown-form");
dropdownForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const content = document.getElementById("dropdown-content").value;
  const data = { content };
  fetch(`${url}/dropdowns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(`Record added with id: ${data.id}`);
      dropdownForm.reset();
    });
});

const dropdownItemForm = document.getElementById("dropdown-item-form");
dropdownItemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const content = document.getElementById("dropdown-item-content").value;
  const dropdown_id = document.getElementById("dropdown-id").value;
  const data = { dropdown_id, content };
  fetch(`${url}/dropdown-items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(`Record added with id: ${data.id}`);
      dropdownItemForm.reset();
    });
});

const reset = document.getElementById("reset");
reset.addEventListener("click", function () {
  fetch(`${url}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((response) => alert("All records deleted"));
});
