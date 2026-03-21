const CAFE_LAT = 31.0409; 
const CAFE_LON = 31.3785; 
const MAX_DISTANCE = 0.2; 

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

let place = "";
let cart = {};

function startProcess() {
    document.getElementById('hero').style.display = 'none';
    const trans = document.getElementById('transition-screen');
    const wordDisplay = document.getElementById('word-display');
    const stages = ["نقاء", "فخامة", "لوفيرا"];
    trans.style.display = 'flex';
    let step = 0;
    const interval = setInterval(() => {
        if(step < stages.length) {
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
                    <button class="q-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span class="q-num" id="qty-${item.id}">0</span>
                    <button class="q-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">${item.price} EGP</span>
                </div>
            `;
            section.appendChild(card);
        });
        container.appendChild(section);
    }
}

function changeQty(id, val) {
    cart[id] = Math.max(0, (cart[id] || 0) + val);
    document.getElementById(`qty-${id}`).innerText = cart[id];
    updateTotal();
}

function updateTotal() {
    let total = 0;
    for (let cat in menuData) {
        menuData[cat].forEach(d => { if(cart[d.id]) total += d.price * cart[d.id]; });
    }
    document.getElementById('total-price').innerText = total;
}

function handleFinalOrder() {
    if (!navigator.geolocation) return alert("GPS غير مدعوم.");
    navigator.geolocation.getCurrentPosition((pos) => {
        const dist = calculateDistance(pos.coords.latitude, pos.coords.longitude, CAFE_LAT, CAFE_LON);
        if (dist <= MAX_DISTANCE) sendOrder();
        else alert("يجب أن تكون داخل الكافيه لطلب الأوردر.");
    }, () => alert("يرجى تفعيل الموقع."));
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2-lat1)*Math.PI/180;
    const dLon = (lon2-lon1)*Math.PI/180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function sendOrder() {
    let msg = `🌟 *طلب لوفيرا كافيه* 🌟\n📍 *المكان:* ${place}\n\n`;
    let total = 0;
    for (let cat in menuData) {
        menuData[cat].forEach(d => {
            if(cart[d.id] > 0) {
                msg += `• ${d.name} (x${cart[d.id]})\n`;
                total += d.price * cart[d.id];
            }
        });
    }
    if (total === 0) return alert("اختر مشروباتك أولاً.");
    msg += `\n💰 *الإجمالي:* ${total} EGP`;
    window.open(`https://wa.me/201150782006?text=${encodeURIComponent(msg)}`);
}
// ✅ إضافة تحسين بدون حذف أي سطر
document.addEventListener("DOMContentLoaded", () => {
    updateTotal();
});