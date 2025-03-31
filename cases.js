import { 
    collection, doc, setDoc, getDoc, 
    query, orderBy, limit, getDocs 
  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
  import { db } from "./firebase-init.js";
  
const cases = {
    "Common Case": {
        price: 100,
        image: "assets/cases/bomj_case.webp",
        items: [
            { name: "Flared Wooden Crest", rarity: "Common", price: 10, image: "assets/items/flared_wooden_crest.png", color: "gray"},
            { name: "Omnishred the Defiant", rarity: "Common", price: 15, image: "assets/items/omnishred_the_defiant.png", color: "gray"},
            { name: "Feathered Naginata", rarity: "Common", price: 20, image: "assets/items/feathered_naginata.png", color: "gray"},
            { name: "Necklace of Scarlet Raven", rarity: "Common", price: 12, image: "assets/items/necklace_of_scarlet_raven.png", color: "gray"},
            { name: "Staff of the Fungal Lord", rarity: "Common", price: 8, image: "assets/items/staff_of_the_fungal_lord.png", color: "gray"},
            { name: "Golden Moonfall", rarity: "Immortal", price: 1500, image: "assets/items/golden_moonfall.webp", color: "gold"}
        ]
    },
    "Uncommon Case": {
        price: 300,
        image: "assets/cases/treasury.webp",
        items: [
            { name: "Inscribed Sylvan Guard's Cape", rarity: "Uncommon", price: 80, image: "assets/items/inscribed_cape.png", color: "lightblue"},
            { name: "Obsidian Blade Dagger", rarity: "Uncommon", price: 70, image: "assets/items/obsidian_blade_dagger.png", color: "lightblue"},
            { name: "Hare Hunt Rifle", rarity: "Uncommon", price: 90, image: "assets/items/hare_hunt_rifle.png", color: "lightblue"},
            { name: "Staff of Wind and Sand", rarity: "Uncommon", price: 75, image: "assets/items/staff_of_wind_and_sand.png", color: "lightblue"},
            { name: "Darktrench Stalker", rarity: "Mythical", price: 450, image: "assets/items/darktrench_stalker.webp", color: "purple"},
            { name: "Rites of Vile Convocation", rarity: "Mythical", price: 500, image: "assets/items/rites_of_vile_convocation.png", color: "purple"}
        ]
    },
    "Rare Case": {
        price: 450,
        image: "assets/cases/Rare_case.webp",
        items: [
            { name: "Ocean Conqueror", rarity: "Rare", price: 150, image: "assets/items/Ocean_Conqueror.webp", color: "blue" },
            { name: "Featherfall Cloak", rarity: "Rare", price: 140, image: "assets/items/windranger_featherfall.png", color: "blue" },
            { name: "Battleaxe of the Basilisk", rarity: "Rare", price: 135, image: "assets/items/Battleaxe_of_the_Basilisk.png", color: "blue" },
            { name: "Vespoid Stalker Arms", rarity: "Rare", price: 130, image: "assets/items/Vespoid_Stalker_Arms.png", color: "blue" },
            { name: "Battle Banner of the Masked", rarity: "Rare", price: 350, image: "assets/items/Battle_Banner_of_the_Masked.webp", color: "blue" },
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
let playerName = localStorage.getItem("playerName") || "Player" + Math.floor(Math.random() * 1000);
let isLeaderboardVisible = false;

updateBalance();

export async function logout() {
    try {
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html'; 
    } catch (error) {
      console.error('Ошибка выхода:', error);
      alert('Не удалось выйти. Попробуйте ещё раз.');
    }
  }

  async function checkPromoCode(code) {
    try {
      const promoRef = doc(db, "promocodes", code);
      const promoSnap = await getDoc(promoRef);
      
      if (!promoSnap.exists() || promoSnap.data().used) {
        return { valid: false, message: "Промокод недействителен или уже использован" };
      }
      
      // Если промокод действителен
      const promoData = promoSnap.data();
      await updateDoc(promoRef, { used: true });
      
      // Обновляем баланс
      balance += promoData.value;
      updateBalance();
      
      return { valid: true, message: `+${promoData.value} монет! Новый баланс: ${balance}` };
    } catch (err) {
      console.error("Ошибка промокода:", err);
      return { valid: false, message: "Ошибка сервера" };
    }
  }
  
  // Обработчик промокодов
  document.getElementById("promoBtn")?.addEventListener("click", async () => {
    const promoCode = document.getElementById("promoInput").value.trim();
    if (!promoCode) return;
    
    const result = await checkPromoCode(promoCode);
    alert(result.message);
  });

function getRandomItem(caseItems) {
    let chances = {
        "Arcana": 2,  
        "Immortal": 5, 
        "Legendary": 10, 
        "Mythical": 25, 
        "Rare": 45, 
        "Uncommon": 65,
        "Common": 80
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
            <p class="case-price">${caseData.price} монет</p>
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
            .filter(item => ["Arcana", "Immortal", "Legendary", "Mythical"].includes(item.rarity))
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

async function startSpin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Сначала войдите в аккаунт!');
        return;
    }
    const btn = document.getElementById('openCaseBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"><i class="fas fa-spinner"></i></span> Открываем...';
    btn.disabled = true;

    try {
        if (!selectedCase) return;
        if (balance < selectedCase.price) {
            alert("Недостаточно монет!");
            return;
        }

        balance -= selectedCase.price;
        updateBalance();

        let finalItem = getRandomItem(selectedCase.items);
        inventory.push(finalItem);
        updateInventory();


        let roulette = document.getElementById("roulette");
        roulette.innerHTML = ""; 

        // Создаем элементы рулетки
        let itemsOnScreen = 7;
        let itemWidth = 120;
        let totalItems = 40;

        for (let i = 0; i < totalItems; i++) {
            let item = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];
            let img = document.createElement("img");
            img.src = item.image;
            img.classList.add("roulette-item");
            roulette.appendChild(img);
        }

        // Устанавливаем выигрышный предмет в центр
        let finalIndex = Math.floor(totalItems / 2);
        roulette.children[finalIndex].src = finalItem.image;

        // Первая часть анимации (разгон)
        roulette.style.transition = "none";
        roulette.style.left = "0px";

        await new Promise(resolve => {
            setTimeout(() => {
                roulette.style.transition = "left 3s ease-out";
                roulette.style.left = `-${finalIndex * itemWidth - (itemsOnScreen * itemWidth) / 2 + 1800}px`;
                resolve();
            }, 50);
        });

        // Вторая часть анимации (торможение)
        await new Promise(resolve => {
            setTimeout(() => {
                roulette.style.transition = "left 3s cubic-bezier(0.2, 1, 0.3, 1)";
                roulette.style.left = `-${finalIndex * itemWidth - (itemsOnScreen * itemWidth) / 2}px`;
                setTimeout(resolve, 3000);
            }, 3050);
        });

        // Показываем результат
        let resultBox = document.getElementById("itemResult");
        let itemImage = document.getElementById("itemImage");
        let itemName = document.getElementById("itemName");

        itemImage.src = finalItem.image;
        itemName.innerHTML = `Выпало: <b>${finalItem.name} (${finalItem.rarity})</b>`;

        resultBox.style.borderColor = finalItem.color;
        resultBox.style.display = "block";
        resultBox.style.opacity = "0";
        resultBox.style.transform = "translate(-50%, -50%) scale(0.5)";

        // Анимация появления
        await new Promise(resolve => {
            setTimeout(() => {
                resultBox.style.opacity = "1";
                resultBox.style.transform = "translate(-50%, -50%) scale(1)";
                resolve();
            }, 100);
        });

        // Анимация исчезновения
        await new Promise(resolve => {
            setTimeout(() => {
                resultBox.style.opacity = "0";
                resultBox.style.transform = "translate(-50%, -50%) scale(0.5)";
                setTimeout(() => {
                    resultBox.style.display = "none";
                    resolve();
                }, 800);
            }, 3500);
        });

    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}



function updateBalance() {
    balanceElement.innerText = balance;
    localStorage.setItem("balance", balance);
}

function updateInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

renderCases();



document.getElementById('openCaseBtn').addEventListener('click', async () => {
    await startSpin(); 
});

document.getElementById('promoBtn').addEventListener('click', async function() {
    const promoCode = document.getElementById('promoInput').value.trim().toUpperCase();
    
    if (!promoCode) {
      alert('Введите промокод!');
      return;
    }
  
    try {
      console.log('Проверяем промокод:', promoCode);

      const promoRef = doc(db, "promocodes", promoCode);
      const promoSnap = await getDoc(promoRef);
  
      if (!promoSnap.exists()) {
        console.error('Документ не найден. Проверьте:');
        console.log('- Существует ли коллекция "promocodes"');
        console.log(`- Есть ли документ с ID "${promoCode}"`);
        alert(`Промокод "${promoCode}" не найден!`);
        return;
      }
  
      // 3. Проверяем структуру данных
      const promoData = promoSnap.data();
      if (!promoData || typeof promoData.used !== 'boolean' || typeof promoData.value !== 'number') {
        console.error('Неверная структура документа:', promoData);
        alert('Ошибка сервера: неверный формат промокода');
        return;
      }
      if (promoData.used) {
        alert('Этот промокод уже использован!');
        return;
      }
  
      // 5. Активируем промокод
      await updateDoc(promoRef, { used: true });
      
      // 6. Начисляем бонус
      const bonus = promoData.value;
      let balance = parseInt(localStorage.getItem("balance")) || 3000;
      balance += bonus;
      localStorage.setItem("balance", balance);
      document.getElementById('balanceAmount').textContent = balance;
  
      alert(`✅ Промокод активирован! +${bonus} монет`);
      document.getElementById('promoInput').value = '';
  
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка сервера. Попробуйте позже.');
    }

    if (!localStorage.getItem('playerName')) {
        const name = prompt("Введите ваш игровой ник (макс. 15 символов):", 
                            "Player" + Math.floor(Math.random() * 1000));
        if (name) {
            localStorage.setItem('playerName', name.slice(0, 15));
        }
    }
    
  });

  document.getElementById('logoutBtn')?.addEventListener('click', logout);