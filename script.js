// ===============================
// INVENTORY STORAGE
// ===============================
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// ===============================
// ADD PRODUCT (ADD OR UPDATE)
// ===============================
function addProduct() {
  const nameInput = document.getElementById("productName");
  const qtyInput = document.getElementById("productQty");
  const message = document.getElementById("message");

  if (!nameInput || !qtyInput || !message) return;

  const name = nameInput.value.trim();
  const qty = Number(qtyInput.value);

  if (name === "" || qty <= 0) {
    message.textContent = "Please enter valid product name and quantity!";
    message.style.color = "red";
    return;
  }

  // Check if product exists (case-insensitive)
  const existingProduct = inventory.find(item => item.name.toLowerCase() === name.toLowerCase());

  if (existingProduct) {
    existingProduct.quantity = qty;
    message.textContent = `Product "${name}" updated successfully!`;
  } else {
    inventory.push({ name, quantity: qty });
    message.textContent = "Product added successfully!";
  }

  saveInventory();
  message.style.color = "green";

  // Clear inputs
  nameInput.value = "";
  qtyInput.value = "";

  // Refresh inventory list if on inventory page
  if (document.getElementById("productList")) displayInventory();
}

// ===============================
// DISPLAY INVENTORY WITH DELETE
// ===============================
function displayInventory() {
  const list = document.getElementById("productList");
  if (!list) return;

  list.innerHTML = "";

  if (inventory.length === 0) {
    list.innerHTML = "<li>No products available.</li>";
    return;
  }

  inventory.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML =
      item.quantity <= 3
        ? `${item.name} - ${item.quantity} <span class="low">(Low Stock)</span>`
        : `${item.name} - ${item.quantity}`;

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "15px";
    delBtn.style.padding = "3px 8px";
    delBtn.style.background = "#dc3545";
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.borderRadius = "4px";
    delBtn.style.cursor = "pointer";

    delBtn.onclick = () => {
      if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
        inventory.splice(index, 1);
        saveInventory();
        displayInventory();
      }
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ===============================
// REPORT PAGE
// ===============================
function showReport() {
  const totalProducts = document.getElementById("totalProducts");
  const totalQty = document.getElementById("totalQty");
  const lowStock = document.getElementById("lowStock");

  if (!totalProducts || !totalQty || !lowStock) return;

  totalProducts.textContent = inventory.length;

  let qtySum = 0;
  let lowCount = 0;

  inventory.forEach(item => {
    qtySum += item.quantity;
    if (item.quantity <= 3) lowCount++;
  });

  totalQty.textContent = qtySum;
  lowStock.textContent = lowCount;
}

// ===============================
// CONTACT PAGE
// ===============================
function sendMessage() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const msg = document.getElementById("msg");
  const output = document.getElementById("contactMsg");

  if (!name || !email || !msg || !output) return;

  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    msg.value.trim() === ""
  ) {
    output.textContent = "Please fill all fields!";
    output.style.color = "red";
    return;
  }

  output.textContent = "Message sent successfully!";
  output.style.color = "green";

  name.value = "";
  email.value = "";
  msg.value = "";
}

// ===============================
// HOME PAGE REDIRECT
// ===============================
function goToAddProduct() {
  window.location.href = "add_PRODUCT.html";
}

function goToInventory() {
  window.location.href = "inventory.html";
}
