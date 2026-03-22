const CAFE_LAT = 30.828806; // الاحداثي الجديد
const CAFE_LON = 30.538167;
const MAX_DISTANCE = 0.04; // 40 متر

let place = "";
let cart = {};

const menuData = {
    "Italian Coffee": [
        { id: 1, name: "إسبريسو", price: 40 },
        { id: 2, name: "ميكاتو", price: 45 },
        { id: 3, name: "كورتادو", price: 55 },
        { id: 4, name: "كافيه لاتيه", price: 55 },
        { id: 5, name: "كابتشينو", price: 65 },
        { id: 6, name: "فلات وايت", price: 65 },
        { id: 7, name: "سبانش لاتيه", price: 65 },
        { id: 8, name: "أمريكان كوفي", price: 55 }
    ],
    "Ice Coffee": [
        { id: 9, name: "آيس كراميل ميكاتو", price: 65 },
        { id: 10, name: "آيس سبانش لاتيه", price: 65 },
        { id: 11, name: "آيس بستاشيو لاتيه", price: 65 },
        { id: 12, name: "آيس لاتيه", price: 65 },
        { id: 13, name: "آيس موكا", price: 70 }
    ],
    "Frappuccino": [
        { id: 14, name: "فرابتشينو كلاسيك", price: 60 },
        { id: 15, name: "فرابتشينو كراميل", price: 65 },
        { id: 16, name: "فرابتشينو نوتيلا", price: 70 },
        { id: 17, name: "فرابتشينو أوريو", price: 70 },
        { id: 18, name: "فرابتشينو لوتس", price: 70 },
        { id: 19, name: "فرابتشينو بستاشيو", price: 75 }
    ],
    "Hot Drinks": [
        { id: 20, name: "شاي", price: 25 },
        { id: 21, name: "شاي نكهات", price: 30 },
        { id: 22, name: "ينسون / نعناع", price: 25 },
        { id: 23, name: "شاي بحليب", price: 30 },
        { id: 24, name: "ليمون ساخن", price: 25 },
        { id: 25, name: "هوت سيدر", price: 45 }
    ],
    "Hot Chocolate": [
        { id: 26, name: "هوت شوكلت كلاسيك", price: 60 },
        { id: 27, name: "هوت شوكلت كراميل", price: 65 },
        { id: 28, name: "هوت شوكلت أوريو", price: 65 },
        { id: 29, name: "هوت شوكلت نوتيلا", price: 65 },
        { id: 30, name: "هوت شوكلت بستاشيو", price: 75 }
    ],
    "Cocktail": [
        { id: 31, name: "بنانا فراولة", price: 60 },
        { id: 32, name: "بينا كولادا", price: 65 },
        { id: 33, name: "وايت جولد", price: 65 },
        { id: 34, name: "تروبيكال", price: 75 }
    ],
    "Milk Shake": [
        { id: 35, name: "ميلك شيك فانيليا", price: 60 },
        { id: 36, name: "ميلك شيك شوكلت", price: 60 },
        { id: 37, name: "ميلك شيك لوتس", price: 60 },
        { id: 38, name: "ميلك شيك بستاشيو", price: 75 }
    ],
    "Pancake": [
        { id: 39, name: "بان كيك شوكلت", price: 65 },
        { id: 40, name: "بان كيك لوتس", price: 75 },
        { id: 41, name: "بان كيك نوتيلا", price: 75 },
        { id: 42, name: "بان كيك لوفيرا", price: 85 }
    ],
    "Waffels": [
        { id: 43, name: "وافل شوكلت", price: 65 },
        { id: 44, name: "وافل نوتيلا", price: 65 },
        { id: 45, name: "وافل لوتس", price: 65 },
        { id: 46, name: "وافل بستاشيو", price: 80 },
        { id: 47, name: "وافل لوفيرا", price: 85 }
    ]
};

// ✅ دالة حساب المسافة
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function startProcess() {
    document.getElementById('hero').style.display = 'none';

    const trans = document.getElementById('transition-screen');
    const wordDisplay = document.getElementById('word-display');

    const stages = ["نقاء", "فخامة", "لوفيرا"];

    trans.style.display = 'flex';

    let step = 0;

    const interval = setInterval(() => {
        if (step < stages.length) {
            wordDisplay.innerText = stages[step];
            trans.style.backgroundColor = (step % 2 === 0) ? "#fff" : "#000";
            trans.style.color = (step % 2 === 0) ? "#000" : "#fff";
            step++;
        } else {
            clearInterval(interval);
            trans.style.display = 'none';
            document.getElementById('selection-page').style.display = 'block';
        }
    }, 800);
}

function setPlace(loc) {
    place = loc;
    document.getElementById('selection-page').style.display = 'none';
    document.getElementById('menu-page').style.display = 'block';
    loadMenu();
}

function loadMenu() {
    const container = document.getElementById('items-container');
    container.innerHTML = "";

    for (const category in menuData) {
        const section = document.createElement('div');
        section.className = 'category-section';

        section.innerHTML = `<div class="category-title">${category}</div>`;

        menuData[category].forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card';

            card.innerHTML = `
                <div class="controls">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span id="qty-${item.id}">0</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <div>
                    <span>${item.name}</span>
                    <span>${item.price} EGP</span>
                </div>
            `;

            section.appendChild(card);
        });

        container.appendChild(section);
    }
}

function changeQty(id, val) {
    cart[id] = Math.max(0, (cart[id] || 0) + val);

    const el = document.getElementById(`qty-${id}`);
    if (el) el.innerText = cart[id];

    updateTotal();
}

function updateTotal() {
    let total = 0;

    for (let cat in menuData) {
        menuData[cat].forEach(item => {
            if (cart[item.id]) {
                total += item.price * cart[item.id];
            }
        });
    }

    const totalEl = document.getElementById('total-price');
    if (totalEl) totalEl.innerText = total;
}

// ✅ هنا الشرط الصح للموقع
function handleFinalOrder() {
    if (!navigator.geolocation) {
        alert("المتصفح لا يدعم GPS");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const userLat = pos.coords.latitude;
            const userLon = pos.coords.longitude;
            const accuracy = pos.coords.accuracy;

            const distance = calculateDistance(userLat, userLon, CAFE_LAT, CAFE_LON);

            if (distance <= MAX_DISTANCE && accuracy <= 50) {
                sendOrder();
            } else {
                alert("❌ لازم تكون داخل 40 متر من الكافيه");
            }
        },
        () => {
            alert("فعّل الموقع من الموبايل");
        },
        {
            enableHighAccuracy: true
        }
    );
}

function sendOrder() {
    let msg = `🌟 طلب لوفيرا كافيه 🌟\n📍 المكان: ${place}\n\n`;
    let total = 0;

    for (let cat in menuData) {
        menuData[cat].forEach(item => {
            if (cart[item.id] > 0) {
                msg += `• ${item.name} (x${cart[item.id]})\n`;
                total += item.price * cart[item.id];
            }
        });
    }

    if (total === 0) {
        alert("اختر مشروباتك أولاً");
        return;
    }

    msg += `\n💰 الإجمالي: ${total} EGP`;

    window.open(`https://wa.me/201150782006?text=${encodeURIComponent(msg)}`);
}

document.addEventListener("DOMContentLoaded", () => {
    updateTotal();
});