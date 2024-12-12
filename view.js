const url = "https://lab-6-harashchuk-production.up.railway.app";

const dropdowns = document.getElementById("dropdowns");
let storedData = "";

const fetchDropdowns = () => {
  fetch(`${url}/dropdowns`)
    .then((response) => response.json())
    .then((data) => {
      if (storedData === JSON.stringify(data)) return;
      dropdowns.innerHTML = "";
      storedData = JSON.stringify(data);
      data.forEach((dropdown) => {
        const dropdownElement = document.createElement("div");
        dropdownElement.classList.add("dropdown");
        const dropdownId = `dropdown-${dropdown.id}`;
        dropdownElement.innerHTML = `
          <div class="dropdown">
            <button onclick="dropdownToggle('${dropdownId}')" class="dropbtn">${dropdown.content}</button>
            <div class="dropdown-content" id="${dropdownId}"></div>
          </div>
        `;
        dropdowns.appendChild(dropdownElement);
        dropdown.items.forEach((item) => {
          const itemElement = document.createElement("div");
          itemElement.innerHTML = item.content;
          document.getElementById(dropdownId).appendChild(itemElement);
        });
      });
    });
};

fetchDropdowns();
setInterval(fetchDropdowns, 5000);

function dropdownToggle(id) {
  document.getElementById(id).classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
