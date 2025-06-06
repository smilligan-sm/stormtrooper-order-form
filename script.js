const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const items = [
  { id: 1, name: "Full Kit", price: 675, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/483/original/full-armour.jpg?1749186174" },
  { id: 2, name: "Helmet - New", price: 205, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/311/original/helmet.jpg?1749033398" },
  { id: 3, name: "Helmet - Pre-owned", price: 85, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/482/original/helmet-used.jpg?1749185945" },
  { id: 4, name: "Utility Belt", price: 70, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/484/original/utility-belt.jpg?1749186419" },
  { id: 5, name: "F-11D Blaster Rifle - New Model", price: 150, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/485/original/F11D.jpg?1749186819" },
  { id: 6, name: "E-11 Medium Blaster Rifle - Discontinued", price: 50, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/486/original/E11.jpg?1749186827" },
  { id: 7, name: "Pauldron", price: 40, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/491/original/pauldron.jpg?1749188477" },
  { id: 8, name: "Helmet Sticker", price: 2.50, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/490/original/helmet-sticker.jpg?1749188466" },
  { id: 9, name: "GoPro and Helmet Strap", price: 120, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/488/original/gopro.jpg?1749188452" },
  { id: 10, name: "Top Hat and Cape - Special Occassions Only", price: 40, image: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/489/original/hat-and-cape.jpg?1749188459" },
];

const itemsList = document.getElementById("itemsList");

items.forEach(item => {
  const itemRow = document.createElement("div");
  itemRow.className = "item-row";
  itemRow.innerHTML = `
  <div class="container-item">
    <div class="row d-flex align-items-center pt-4">
      <div class="col-sm-2"><img src="${item.image}" alt="${item.name}" class="img-fluid"/></div>
      <div class="col-sm-10"><h3>${item.name}</h3></div>
    </div>
    <div class="row d-flex align-items-center border-bottom border-dark pb-4">
	    <div class="col-sm"><p>Price: ᖬ${item.price.toFixed(2)}</p></div>
      <div class="col-sm">
        <label>Size:
          <select name="size-${item.id}">
            ${sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
          </select>
        </label>
	    </div>
      <div class="col-sm">
        <label>Quantity:
          <input type="number" name="qty-${item.id}" min="0" value="0" onchange="updateTotal()" class="label-qty"/>
        </label>
	    </div>
    </div>
  </div>
`;
  itemsList.appendChild(itemRow);
});

function updateTotal() {
  let total = 0;
  items.forEach(item => {
    const qty = parseInt(document.querySelector(`[name="qty-${item.id}"]`).value || 0);
    total += qty * item.price;
  });
  document.getElementById("summaryTotal").innerText = total.toFixed(2);
}

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const employeeId = document.getElementById("employeeId").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!employeeId || !email) {
    alert("Please enter Employee ID and Email.");
    return;
  }

  let hasItem = false;
  let summaryHTML = "";
  let total = 0;

  items.forEach(item => {
    const qty = parseInt(document.querySelector(`[name="qty-${item.id}"]`).value || 0);
    const size = document.querySelector(`[name="size-${item.id}"]`).value;
    if (qty > 0) {
      hasItem = true;
      total += qty * item.price;
      summaryHTML += `<p>${item.name} - Size: ${size} - Qty: ${qty} - $${(item.price * qty).toFixed(2)}</p>`;
    }
  });

  if (!hasItem) {
    alert("Please select at least one item.");
    return;
  }

  document.getElementById("summaryContent").innerHTML = summaryHTML;
  document.getElementById("summaryTotal").innerText = total.toFixed(2);
  document.getElementById("summaryModal").classList.remove("hidden");
});

function closeModal() {
  document.getElementById("summaryModal").classList.add("hidden");
}

function confirmOrder() {
  window.location.href = "thank-you.html";
}
