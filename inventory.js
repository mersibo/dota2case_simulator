let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 3000;
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

const balanceElement = document.getElementById("balanceAmount");
const inventoryList = document.getElementById("inventory-list");

function updateBalance() {
    balanceElement.innerText = balance;
    localStorage.setItem("balance", balance);
}

function updateInventory() {
    inventoryList.innerHTML = "";

    if (inventory.length === 0) {
        inventoryList.innerHTML = "<p>Инвентарь пуст</p>";
        document.getElementById("sell-all-btn").style.display = "none"; // Скрываем кнопку
        return;
    } else {
        document.getElementById("sell-all-btn").style.display = "block"; // Показываем кнопку
    }

    inventory.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("inventory-item");
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} (${item.rarity})</p>
            <p class="price">Цена: ${item.price} монет</p>
            <button class="sell-btn" onclick="sellItem(${index})">Продать</button>
        `;
        inventoryList.appendChild(itemDiv);
    });
}

function sellItem(index) {
    let item = inventory[index];
    balance += item.price;
    inventory.splice(index, 1);
    updateBalance();
    updateInventory();
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function sellAll() {
    let totalValue = inventory.reduce((sum, item) => sum + item.price, 0);
    balance += totalValue;
    inventory = [];
    updateBalance();
    updateInventory();
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

updateBalance();
updateInventory();
