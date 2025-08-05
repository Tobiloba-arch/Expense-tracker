document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.querySelector(".add-btn");
  const inputs = document.querySelectorAll("input");
  const table = document.querySelector(".expense-table");
  const totalSpan = document.querySelector(".total span");

  let total = 10.0; // initial total from hardcoded expenses

  // Update total display
  function updateTotal() {
    totalSpan.textContent = `$${total.toFixed(2)}`;
  }

  // Add new expense
  addBtn.addEventListener("click", function () {
    const nameInput = inputs[0];
    const amountInput = inputs[1];

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!name || isNaN(amount) || amount <= 0) {
      alert("Please enter valid name and amount.");
      return;
    }

    // Create new row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>$${amount.toFixed(2)}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    table.appendChild(row);
    total += amount;
    updateTotal();

    // Clear inputs
    nameInput.value = "";
    amountInput.value = "";

    // Add delete functionality
    row.querySelector(".delete-btn").addEventListener("click", function () {
      row.remove();
      total -= amount;
      updateTotal();
    });
  });

  // Attach delete event to existing buttons
  const existingDeleteButtons = document.querySelectorAll(".delete-btn");
  existingDeleteButtons.forEach((btn) => {
    const amountCell = btn.parentElement.previousElementSibling;
    const amount = parseFloat(amountCell.textContent.replace("$", ""));
    btn.addEventListener("click", function () {
      btn.parentElement.parentElement.remove();
      total -= amount;
      updateTotal();
    });
  });

  // Initial update
  updateTotal();
});
