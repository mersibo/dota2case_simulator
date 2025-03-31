const cases = {
    "Rare Case": {
        price: 200,
        image: "assets/cases/Rare_case.webp",
        items: [
            { name: "Fractal Horns of Inner Abysm", rarity: "Rare", price: 150, image: "assets/items/terrorblade_horns.png", color: "blue" },
            { name: "Featherfall Cloak", rarity: "Rare", price: 140, image: "assets/items/windranger_featherfall.png", color: "blue" },
            { name: "Pale Augur", rarity: "Rare", price: 135, image: "assets/items/death_prophet_pale_augur.png", color: "blue" },
            { name: "Bracers of the Cavern Luminar", rarity: "Rare", price: 130, image: "assets/items/undying_bracers.png", color: "blue" },
            { name: "Peregrine Flight", rarity: "Rare", price: 125, image: "assets/items/huskar_peregrine_flight.png", color: "blue" },
            { name: "Flight of the Undying Light", rarity: "Mythical", price: 500, image: "assets/items/dawnbreaker_flight.png", color: "purple" },
            { name: "Bindings of Deep Magma", rarity: "Mythical", price: 450, image: "assets/items/earthshaker_magma.png", color: "purple" }
        ]
    },
    "Mythical Case": {
        price: 700,
        image: "assets/cases/Mythical_case.webp",
        items: [
            { name: "Crimson Cyrridae", rarity: "Mythical", price: 550, image: "assets/items/bloodseeker_cyrridae.png", color: "purple" },
            { name: "Beast of the Crimson Ring", rarity: "Mythical", price: 530, image: "assets/items/ursa_crimson_ring.jpg", color: "purple" },
            { name: "Hood of the Cruel Magician", rarity: "Mythical", price: 500, image: "assets/items/hoodwink_cruel_magician.png", color: "purple" },
            { name: "Rising Chaos", rarity: "Legendary", price: 800, image: "assets/items/void_spirit_rising_chaos.png", color: "orange" },
            { name: "Helm of the Eldritch Ice", rarity: "Legendary", price: 850, image: "assets/items/lich_eldritch_ice.png", color: "orange" },
            { name: "Glare of the Azure Void", rarity: "Immortal", price: 1200, image: "assets/items/faceless_void_azure_void.webp", color: "gold" }
        ]
    },
    "Legendary Case": {
        price: 900,
        image: "assets/cases/Legendary_case.webp",
        items: [
            { name: "Crown of the Lich Lord", rarity: "Legendary", price: 900, image: "assets/items/lich_crown.png", color: "orange" },
            { name: "Bindings of Frost", rarity: "Legendary", price: 920, image: "assets/items/crystal_maiden_bindings.png", color: "orange" },
            { name: "Torment of the Chainbreaker", rarity: "Legendary", price: 1000, image: "assets/items/axe_torment.png", color: "orange" },
            { name: "Hook of the Sorrowful Prey", rarity: "Immortal", price: 1400, image: "assets/items/pudge_hook.png", color: "gold" },
            { name: "Sullen Hollow", rarity: "Immortal", price: 1300, image: "assets/items/phantom_assassin_sullen.png", color: "gold" },
            { name: "The Magus Cypher", rarity: "Arcana", price: 3000, image: "assets/items/rubick_arcana.png", color: "red" }
        ]
    },
    "Immortal Case": {
        price: 1000,
        image: "assets/cases/Immortal_Case.png",
        items: [
            { name: "Golden Basher Blades", rarity: "Immortal", price: 1500, image: "assets/items/sven_basher.png", color: "gold" },
            { name: "Staff of Gun-Yu", rarity: "Immortal", price: 1450, image: "assets/items/monkey_king_staff.png", color: "gold" },
            { name: "Blades of Voth Domosh", rarity: "Immortal", price: 1600, image: "assets/items/phantom_assassin_voth_domosh.png", color: "gold" },
            { name: "Hellborn Grasp", rarity: "Immortal", price: 1550, image: "assets/items/doom_hellborn.png", color: "gold" },
            { name: "Mournful Reverie", rarity: "Immortal", price: 1700, image: "assets/items/queen_of_pain_mournful.png", color: "gold" },
            { name: "Feast of Abscession", rarity: "Arcana", price: 3200, image: "assets/items/pudge_arcana.png", color: "red" }
        ]
    },
    "Arcana Case": {
        price: 2500,
        image: "assets/cases/Arcana_Case.webp",
        items: [
            { name: "Bladeform Legacy", rarity: "Arcana", price: 3500, image: "assets/items/juggernaut_arcana.png", color: "red" },
            { name: "Frost Avalanche", rarity: "Arcana", price: 3400, image: "assets/items/crystal_maiden_arcana.png", color: "red" },
            { name: "Demon Eater", rarity: "Arcana", price: 3600, image: "assets/items/terrorblade_arcana.png", color: "red" },
            { name: "Swine of the Sunken Galley", rarity: "Arcana", price: 3700, image: "assets/items/techies_arcana.png", color: "red" },
            { name: "Manifold Paradox", rarity: "Arcana", price: 3800, image: "assets/items/phantom_assassin_arcana.png", color: "red" }
        ]
    }
};


const balanceElement = document.getElementById("balanceAmount");
const casesContainer = document.getElementById("casesContainer");
const openCaseButton = document.getElementById("openCaseButton");
const caseItemsContainer = document.getElementById("caseItems");

let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 3000;
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let selectedCase = null;

updateBalance();

function getRandomItem(caseItems) {
    let chances = {
        "Arcana": 2,  // 2%
        "Immortal": 5, // 5%
        "Legendary": 10, // 10%
        "Mythical": 25, // 25%
        "Rare": 58 // 58%
    };

    let random = Math.random() * 100;
    let cumulative = 0;

    for (let rarity in chances) {
        cumulative += chances[rarity];
        if (random <= cumulative) {
            let filteredItems = caseItems.filter(item => item.rarity === rarity);
            if (filteredItems.length > 0) {
                return filteredItems[Math.floor(Math.random() * filteredItems.length)];
            }
        }
    }

    return caseItems[Math.floor(Math.random() * caseItems.length)];
}

function renderCases() {
    casesContainer.innerHTML = ""; 

    Object.values(cases).forEach((caseData, index) => {
        const caseElement = document.createElement("div");
        caseElement.classList.add("case");
        caseElement.innerHTML = `
            <img src="${caseData.image}" alt="${Object.keys(cases)[index]}">
            <p>${Object.keys(cases)[index]}</p>
            <p class="case-price">Стоимость открытия: ${caseData.price} монет</p>
        `;
        caseElement.addEventListener("click", () => selectCase(index));
        casesContainer.appendChild(caseElement);
    });
}

function selectCase(index) {
    document.querySelectorAll('.case').forEach(caseElem => caseElem.style.display = 'none');

    selectedCase = Object.values(cases)[index];
    document.getElementById("selectedCaseName").textContent = selectedCase.name;

    document.getElementById("priceAmount").textContent = selectedCase.price;

    const caseDetailsContainer = document.getElementById("caseDetailsContainer");
    caseDetailsContainer.style.display = "block";

    if (caseItemsContainer) {
        caseItemsContainer.innerHTML = selectedCase.items
            .filter(item => ["Arcana", "Immortal", "Legendary"].includes(item.rarity))
            .map(item => `
                <div class="case-item" style="border-left: 5px solid ${item.color}; padding-left: 10px;">
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <p><strong>${item.name}</strong> (${item.rarity}) - ${item.price} монет</p>
                </div>
            `).join("");
    }

    document.getElementById("openCaseBtn").disabled = false;
}

document.getElementById("backToCasesBtn").addEventListener("click", () => {
    document.querySelectorAll('.case').forEach(caseElem => caseElem.style.display = 'block');

    document.getElementById("caseDetailsContainer").style.display = "none";
});

function populateRoulette() {
    if (!selectedCase) return;

    let roulette = document.getElementById("roulette");
    roulette.innerHTML = "";

    for (let i = 0; i < 50; i++) {
        let item = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];
        let img = document.createElement("img");
        img.src = item.image;
        img.classList.add("roulette-item");
        roulette.appendChild(img);
    }
}

function startSpin() {
    if (!selectedCase) return;
    if (balance < selectedCase.price) {
        alert("Недостаточно монет!");
        return;
    }

    balance -= selectedCase.price;
    updateBalance();

    let items = selectedCase.items;
    let finalItem = getRandomItem(selectedCase.items);

    inventory.push(finalItem);
    updateInventory();

    populateRoulette();

    let itemWidth = 120;
    let itemsOnScreen = 5;
    let finalPosition = (document.getElementById("roulette").children.length - itemsOnScreen) * itemWidth;

    let roulette = document.getElementById("roulette");
    roulette.style.transition = "left 18s cubic-bezier(0.05, 1, 0.2, 1)";
    roulette.style.left = `-${finalPosition + 1500}px`;

    setTimeout(() => {
        roulette.style.transition = "left 5s cubic-bezier(0.2, 1, 0.3, 1)";
        roulette.style.left = `-${finalPosition}px`;
    }, 18000);

    setTimeout(() => {
        let resultBox = document.getElementById("itemResult");
        let itemImage = document.getElementById("itemImage");
        let itemName = document.getElementById("itemName");

        itemImage.src = finalItem.image;
        itemName.innerHTML = `Выпало: <b>${finalItem.name} (${finalItem.rarity})</b>`;

        resultBox.style.borderColor = finalItem.color;

        resultBox.style.display = "block"; 
        setTimeout(() => {
            resultBox.style.transform = "translate(-50%, -50%) scale(1)";
            resultBox.style.opacity = "1";
        }, 100);

        setTimeout(() => {
            resultBox.style.transform = "translate(-50%, -50%) scale(0.5)"; 
            setTimeout(() => {
                resultBox.style.display = "none"; 
            }, 500);
        }, 3000);
    }, 23000);
}

function updateBalance() {
    balanceElement.innerText = balance;
    localStorage.setItem("balance", balance);
}

function updateInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

renderCases();
