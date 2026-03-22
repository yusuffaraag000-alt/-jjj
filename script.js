const CAFE_LAT = 30.828806;
const CAFE_LON = 30.538167;
const MAX_DISTANCE = 0.04;

let place = ""; // المكان العام (Side A/B/Bar/Lounge)
let seat = "";  // رقم الترابيزة أو كرسي البار
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
    ]
    // باقي الأصناف زي ما هم
};

// حساب المسافة
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

function startProcess() {
    document.getElementById('hero').style.display = 'none';
    const trans = document.getElementById('transition-screen');
    const wordDisplay = document.getElementById('word-display');
    const stages = ["نقاء","فخامة","لوفيرا"];
    trans.style.display = 'flex';
    let step = 0;
    const interval = setInterval(()=>{
        if(step < stages.length){
            wordDisplay.innerText = stages[step];
            step++;
        } else {
            clearInterval(interval);
            trans.style.display = 'none';
            document.getElementById('selection-page').style.display = 'block';
        }
    }, 800);
}

// اختيار المكان
function setPlace(loc) {
    place = loc;
    // لو Bar أو Lounge نفتح اختيار رقم الكرسي / الترابيزة
    if(loc === 'Bar' || loc === 'Lounge'){
        document.getElementById('selection-page').style.display = 'none';
        document.getElementById('seat-page').style.display = 'block';
        loadSeats();
        return;
    }
    // أما Side A / B نروح على المنيو مباشرة
    document.getElementById('selection-page').style.display = 'none';
    document.getElementById('menu-page').style.display = 'block';
    loadMenu();
}

// توليد أزرار الأرقام
function loadSeats() {
    const container = document.getElementById('seat-grid');
    container.innerHTML = "";
    let max = place === 'Bar' ? 5 : 3;
    for(let i=1; i<=max; i++){
        const btn = document.createElement('div');
        btn.className = 'box';
        btn.innerText = place === 'Bar' ? `كرسي ${i}` : `ترابيزة ${i}`;
        btn.onclick = ()=>selectSeat(i);
        container.appendChild(btn);
    }
}

// اختيار الرقم
function selectSeat(num){
    seat = num;
    document.getElementById('seat-page').style.display = 'none';
    document.getElementById('menu-page').style.display = 'block';
    loadMenu();
}

// زر الرجوع من اختيار الكرسي / الترابيزة
function backToPlaceSelection(){
    document.getElementById('seat-page').style.display = 'none';
    document.getElementById('selection-page').style.display = 'block';
}

// تحميل المنيو
function loadMenu() {
    const container = document.getElementById('items-container');
    container.innerHTML = "";
    for(const category in menuData){
        const section = document.createElement('div');
        section.className = 'category-section';
        section.innerHTML = `<div class="category-title">${category}</div>`;
        menuData[category].forEach(item=>{
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

// تعديل الكمية
function changeQty(id,val){
    cart[id] = Math.max(0,(cart[id]||0)+val);
    const el = document.getElementById(`qty-${id}`);
    if(el) el.innerText = cart[id];
    updateTotal();
}

function updateTotal(){
    let total=0;
    for(let cat in menuData){
        menuData[cat].forEach(item=>{
            if(cart[item.id]) total+= item.price*cart[item.id];
        });
    }
    document.getElementById('total-price').innerText=total;
}

// إرسال الطلب مع شرط GPS
function handleFinalOrder(){
    if(!navigator.geolocation){ alert("المتصفح لا يدعم GPS"); return; }
    navigator.geolocation.getCurrentPosition(
        pos=>{
            const distance = calculateDistance(pos.coords.latitude,pos.coords.longitude,CAFE_LAT,CAFE_LON);
            if(distance <= MAX_DISTANCE) sendOrder();
            else alert("❌ لازم تكون داخل 40 متر من الكافيه");
        },
        ()=>alert("فعّل الموقع"),
        {enableHighAccuracy:true}
    );
}

// إرسال الطلب للواتساب
function sendOrder(){
    let locationText = seat ? `${place} رقم ${seat}` : place;
    let msg = `🌟 طلب لوفيرا كافيه 🌟\n📍 المكان: ${locationText}\n\n`;
    let total=0;
    for(let cat in menuData){
        menuData[cat].forEach(item=>{
            if(cart[item.id]>0){
                msg += `• ${item.name} (x${cart[item.id]})\n`;
                total += item.price*cart[item.id];
            }
        });
    }
    if(total===0){ alert("اختر مشروباتك أولاً"); return; }
    msg += `\n💰 الإجمالي: ${total} EGP`;
    window.open(`https://wa.me/201150782006?text=${encodeURIComponent(msg)}`);
}

document.addEventListener("DOMContentLoaded", ()=>updateTotal());