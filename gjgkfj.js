const CAFE_LAT = 30.828806;
const CAFE_LON = 30.538167;
const MAX_DISTANCE = 0.04;

let place = ""; // المكان العام (Side A/B/Bar/Lounge)
let seat = "";  // رقم الترابيزة أو كرسي البار
let cart = {}; 


const menuData = {
    

  "COFFEE_TURKISH": [
    { "id": 1, "name": "قهوة تركي", "price_s": 30, "price_d": 40 },
    { "id": 2, "name": "قهوة تركي لوفيرا", "price_s": 35, "price_d": 45 },
    { "id": 3, "name": "قهوة لوفيرا جولد", "price_s": 35, "price_d": 45 },
    { "id": 4, "name": "قهوة تركي محوج", "price_s": 35, "price_d": 45 },
    { "id": 5, "name": "قهوة فرنساوي", "price_s": 40, "price_d": 50 },
    { "id": 6, "name": "قهوة بندق", "price_s": 45, "price_d": 55 },
    { "id": 7, "name": "قهوة كارميل", "price_s": 45, "price_d": 55 },
    { "id": 8, "name": "قهوة نوتيلا", "price_s": 50, "price_d": 60 },
    { "id": 9, "name": "قهوة لوتس", "price_s": 50, "price_d": 60 },
    { "id": 10, "name": "قهوة كيندر", "price_s": 50, "price_d": 60 },
    { "id": 11, "name": "قهوة بستاشيو", "price_s": 60, "price_d": 70 },
    { "id": 12, "name": "نسكافية", "price_s": 50, "price_d": null }
  ],
  "ITALIAN_COFFEE": [
    { "id": 13, "name": "إسبريسو", "price_s": 40, "price_d": 50 },
    { "id": 14, "name": "ميكاتو", "price_s": 45, "price_d": 55 },
    { "id": 15, "name": "كورتادو", "price": 55 },
    { "id": 16, "name": "كافيه لاتيه", "price": 55 },
    { "id": 17, "name": "كابتشينو", "price": 65 },
    { "id": 18, "name": "فلات وايت", "price": 65 },
    { "id": 19, "name": "موكا", "price": 65 },
    { "id": 20, "name": "أمريكان كوفي", "price": 55 },
    { "id": 21, "name": "كراميل ميكاتو", "price": 60 },
    { "id": 22, "name": "سبانش لاتيه", "price": 65 },
    { "id": 23, "name": "اسبريسو بون بون", "price": 50, "description": "اسبريسو + ويب كريم" },
    { "id": 24, "name": "اسبريسو كون بانا", "price": 50, "description": "اسبريسو + حليب مكثف" }
  ],
  "ICE_COFFEE": [
    { "id": 25, "name": "ايس كارميل ميكاتو", "price": 65 },
    { "id": 26, "name": "ايس سبانش لاتيه", "price": 65 },
    { "id": 27, "name": "ايس بستاشيو لاتيه", "price": 65 },
    { "id": 28, "name": "ايس فانيليا لاتيه", "price": 65 },
    { "id": 29, "name": "ايس دالجونا", "price": 60 },
    { "id": 30, "name": "ايس لاتيه", "price": 65 },
    { "id": 31, "name": "ايس موكا", "price": 70 },
    { "id": 32, "name": "ايس وايت موكا", "price": 70 }
  ],
  "FRAPPUCCINO": [
    { "id": 33, "name": "فرابتشينو كلاسيك", "price": 60 },
    { "id": 34, "name": "فرابتشينو فانيليا", "price": 65 },
    { "id": 35, "name": "فرابتشينو كراميل", "price": 65 },
    { "id": 36, "name": "فرابتشينو شوكلت", "price": 65 },
    { "id": 37, "name": "فرابتشينو نوتيلا", "price": 70 },
    { "id": 38, "name": "فرابتشينو اوريو", "price": 70 },
    { "id": 39, "name": "فرابتشينو كيندر", "price": 70 },
    { "id": 40, "name": "فرابتشينو لوتس", "price": 70 },
    { "id": 41, "name": "فرابتشينو بلوبيرى", "price": 70 },
    { "id": 42, "name": "فرابتشينو بستاشيو", "price": 75 }
  ],
  "HOT_CHOCOLATE": [
    { "id": 43, "name": "هوت شوكلت كلاسيك", "price": 60 },
    { "id": 44, "name": "هوت شوكلت كراميل", "price": 65 },
    { "id": 45, "name": "هوت شوكلت اوريو", "price": 65 },
    { "id": 46, "name": "هوت شوكلت نوتيلا", "price": 65 },
    { "id": 47, "name": "هوت شوكلت لوتس", "price": 65 },
    { "id": 48, "name": "هوت شوكلت كيندر", "price": 65 },
    { "id": 49, "name": "هوت شوكلت بستاشيو", "price": 75 }
  ],
  "HOT_DRINKS": [
    { "id": 50, "name": "شاى", "price": 25 },
    { "id": 51, "name": "شاى نكهات", "price": 30 },
    { "id": 52, "name": "ينسون", "price": 25 },
    { "id": 53, "name": "نعناع", "price": 25 },
    { "id": 54, "name": "شاى بحليب", "price": 30 },
    { "id": 55, "name": "كركدية", "price": 25 },
    { "id": 56, "name": "ليمون ساخن", "price": 25 },
    { "id": 57, "name": "قرفة", "price": 25 },
    { "id": 58, "name": "قرفة حليب", "price": 30 },
    { "id": 59, "name": "هوت سيدر", "price": 45 },
    { "id": 60, "name": "فيتامين C", "price": 50, "description": "برتقال - ليمون - نعناع" }
  ],
  "MILK_SHAKE": [
    { "id": 61, "name": "ميلك شيك فانيليا ميلك", "price": 60 },
    { "id": 62, "name": "شيك شوكلت ميلك شيك", "price": 60 },
    { "id": 63, "name": "كراميل ميلك شيك", "price": 60 },
    { "id": 64, "name": "فراولة ميلك شيك مانجو", "price": 60 },
    { "id": 65, "name": "ميلك شيك بلوبيرى", "price": 60 },
    { "id": 66, "name": "ميلك شيك اوريو", "price": 60 },
    { "id": 67, "name": "ميلك شيك نوتيلا", "price": 60 },
    { "id": 68, "name": "ميلك شيك لوتس", "price": 60 },
    { "id": 69, "name": "ميلك شيك كيندر", "price": 65 },
    { "id": 70, "name": "ميلك شيك بيستاشيو", "price": 75 }
  ],
  "YOGURT": [
    { "id": 71, "name": "زبادى سادة", "price": 55 },
    { "id": 72, "name": "زبادى عسل", "price": 60 },
    { "id": 73, "name": "زبادى مانجو", "price": 50 },
    { "id": 74, "name": "زبادى فراولة", "price": 60 },
    { "id": 75, "name": "زبادى موز", "price": 60 },
    { "id": 76, "name": "زبادى بلوبيرى", "price": 60 },
    { "id": 77, "name": "زبادى خوخ", "price": 60 },
    { "id": 78, "name": "زبادى باشون فروت", "price": 60 },
    { "id": 79, "name": "زبادى القيصر", "price": 80 }
  ],
  "FRESH_JUICE": [
    { "id": 80, "name": "ليمون نعناع", "juice": 55, "smoothie": 65 },
    { "id": 81, "name": "فراولة", "juice": 55, "smoothie": 65 },
    { "id": 82, "name": "جوافة", "juice": 55, "smoothie": 65 },
    { "id": 83, "name": "برتقال", "juice": 55, "smoothie": 65 },
    { "id": 84, "name": "مانجو", "juice": 55, "smoothie": 65 },
    { "id": 85, "name": "موز", "juice": 55, "smoothie": 65 },
    { "id": 86, "name": "بطيخ", "juice": 55, "smoothie": 65 },
    { "id": 87, "name": "كيوي", "juice": 70, "smoothie": 80 }
  ],
  "COCKTAIL": [
    { "id": 88, "name": "بنانا فراولة", "price": 60 },
    { "id": 89, "name": "مانجو فراولة", "price": 60 },
    { "id": 90, "name": "مانجو كيوي", "price": 60 },
    { "id": 91, "name": "بينا كولادا", "price": 65, "description": "اناناس - جوزهند" },
    { "id": 92, "name": "وايت جولد", "price": 65, "description": "برتقال - اناناس - جوافة" },
    { "id": 93, "name": "فلوريدا", "price": 65, "description": "مانجو - فراولة - جوافة" },
    { "id": 94, "name": "هالو", "price": 65, "description": "مانجو - فراولة - موز" },
    { "id": 95, "name": "تروبيكال", "price": 75, "description": "كيوي - خوخ - اناناس" }
  ],
  "MIX_SOFT": [
    { "id": 96, "name": "موهيتو باشون", "price": 60 },
    { "id": 97, "name": "موهيتو بلوبيرى", "price": 60 },
    { "id": 98, "name": "موهيتو ريدبول", "price": 75 },
    { "id": 100, "name": "موهيتو كلاسيك", "price": 60 },
    { "id": 101, "name": "موهيتو فراولة", "price": 60 },
    { "id": 102, "name": "صن شاين", "price": 60 },
    { "id": 103, "name": "ايس تى", "price": 60 }
  ],
  "WINTER_DRINKS": [
    { "id": 104, "name": "سحلب سادة", "price": 50 },
    { "id": 105, "name": "سحلب مكسرات", "price": 60 },
    { "id": 106, "name": "سحلب فواكة", "price": 65 },
    { "id": 107, "name": "سحلب لوفيرا", "price": 70, "description": "مكسرات - فواكة - عسل" }
  ],
  "SOFT_DRINKS": [
    { "id": 108, "name": "مياه", "price": 10 },
    { "id": 109, "name": "Soda (V-7 / V-COLA / V-ROMAN / V-TEIST)", "price": 30 },
    { "id": 110, "name": "MONSTER ENERGY", "price": 70 },
    { "id": 111, "name": "RED BULL", "price": 70 }
  ],
  "PANCAKE": [
    { "id": 112, "name": "بان كيك شوكلت", "price": 65 },
    { "id": 113, "name": "بان كيك كراميل", "price": 65 },
    { "id": 114, "name": "بان كيك وايت شوكلت", "price": 70 },
    { "id": 115, "name": "بان كيك فراولة", "price": 70 },
    { "id": 116, "name": "بان كيك بلو بيرى", "price": 70 },
    { "id": 117, "name": "بان كيك اوريو", "price": 75 },
    { "id": 118, "name": "بان كيك نوتيلا", "price": 75 },
    { "id": 119, "name": "بان كيك لوتس", "price": 75 },
    { "id": 120, "name": "بان كيك كيندر", "price": 75 },
    { "id": 121, "name": "بان كيك بيستاشيو", "price": 75 },
    { "id": 122, "name": "بان كيك لوفيرا", "price": 85 },
    { "id": 123, "name": "صوص من اختيارك 4", "price": 90 }
  ],
  "WAFFELS": [
    { "id": 124, "name": "وافل شوكلت", "price": 65 },
    { "id": 125, "name": "وافل كراميل", "price": 65 },
    { "id": 126, "name": "وافل وايت شوكلت", "price": 65 },
    { "id": 127, "name": "وافل فراولة", "price": 65 },
    { "id": 128, "name": "وافل بلو بيرى", "price": 65 },
    { "id": 129, "name": "وافل اوريو", "price": 65 },
    { "id": 130, "name": "وافل نوتيلا", "price": 65 },
    { "id": 131, "name": "وافل لوتس", "price": 65 },
    { "id": 132, "name": "وافل كيندر", "price": 65 },
    { "id": 133, "name": "وافل بيستاشيو", "price": 80 },
    { "id": 134, "name": "وافل لوفيرا", "price": 85 },
    { "id": 135, "name": "صوص من اختيارك 4", "price": 90 }
  ]
}

    // باقي الأصناف زي ما هم


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
// تغيير هيكل السلة ليتحمل النوع (سنجل/دبل) أو (عصير/سموثي)

// تحميل المنيو مع دعم الحجمين
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
            
            // تحديد هل الصنف له سعرين (S/D) أو (Juice/Smoothie) أو سعر واحد
            let priceHTML = "";
            let controlsHTML = "";

            if (item.price_s && item.price_d) {
                // حالة السنجل والدبل (القهوة)
                priceHTML = `<div>${item.name}</div>`;
                controlsHTML = `
                    <div class="size-row">
                        <span>سنجل (${item.price_s} EGP)</span>
                        <div class="controls">
                            <button onclick="changeQty('${item.id}_s', -1, ${item.price_s}, '${item.name} (سنجل)')">-</button>
                            <span id="qty-${item.id}_s">0</span>
                            <button onclick="changeQty('${item.id}_s', 1, ${item.price_s}, '${item.name} (سنجل)')">+</button>
                        </div>
                    </div>
                    <div class="size-row">
                        <span>دبل (${item.price_d} EGP)</span>
                        <div class="controls">
                            <button onclick="changeQty('${item.id}_d', -1, ${item.price_d}, '${item.name} (دبل)')">-</button>
                            <span id="qty-${item.id}_d">0</span>
                            <button onclick="changeQty('${item.id}_d', 1, ${item.price_d}, '${item.name} (دبل)')">+</button>
                        </div>
                    </div>`;
            } else if (item.juice && item.smoothie) {
                // حالة العصير والسموثي
                priceHTML = `<div>${item.name}</div>`;
                controlsHTML = `
                    <div class="size-row">
                        <span>عصير (${item.juice} EGP)</span>
                        <div class="controls">
                            <button onclick="changeQty('${item.id}_j', -1, ${item.juice}, '${item.name} (عصير)')">-</button>
                            <span id="qty-${item.id}_j">0</span>
                            <button onclick="changeQty('${item.id}_j', 1, ${item.juice}, '${item.name} (عصير)')">+</button>
                        </div>
                    </div>
                    <div class="size-row">
                        <span>سموثي (${item.smoothie} EGP)</span>
                        <div class="controls">
                            <button onclick="changeQty('${item.id}_sm', -1, ${item.smoothie}, '${item.name} (سموثي)')">-</button>
                            <span id="qty-${item.id}_sm">0</span>
                            <button onclick="changeQty('${item.id}_sm', 1, ${item.smoothie}, '${item.name} (سموثي)')">+</button>
                        </div>
                    </div>`;
            } else {
                // حالة السعر الموحد
                priceHTML = `<div><span>${item.name}</span> <br> <span>${item.price} EGP</span></div>`;
                controlsHTML = `
                    <div class="controls">
                        <button onclick="changeQty('${item.id}', -1, ${item.price}, '${item.name}')">-</button>
                        <span id="qty-${item.id}">0</span>
                        <button onclick="changeQty('${item.id}', 1, ${item.price}, '${item.name}')">+</button>
                    </div>`;
            }

            card.innerHTML = priceHTML + controlsHTML;
            section.appendChild(card);
        });
        container.appendChild(section);
    }
}

// تعديل وظيفة تغيير الكمية لتسجيل السعر والاسم المختار
function changeQty(key, val, price, fullName) {
    if (!cart[key]) {
        cart[key] = { qty: 0, price: price, name: fullName };
    }
    
    cart[key].qty = Math.max(0, cart[key].qty + val);
    
    const el = document.getElementById(`qty-${key}`);
    if (el) el.innerText = cart[key].qty;
    
    updateTotal();
}

// تحديث الإجمالي بناءً على السلة الجديدة
function updateTotal(){
    let total = 0;
    // بنلف على كل مفتاح في السلة (زي 1_s أو 15) ونجمع أسعارهم
    for (let key in cart) {
        if (cart[key].qty > 0) {
            total += cart[key].qty * cart[key].price;
        }
    }
    document.getElementById('total-price').innerText = total;
}

// تعديل إرسال الطلب للواتساب ليقرأ من السلة الجديدة
function sendOrder() {
    let note = document.getElementById('customer-note').value.trim();
    let seatInfo = seat ? ` (${place === 'Bar' ? 'كرسي' : 'ترابيزة'} ${seat})` : "";
    let msg = `🌟 طلب جديد - لوفيرا كافيه 🌟\n📍 المكان: ${place}${seatInfo}\n\n`;

    let total = 0;
    let hasItems = false;

    // بنسحب البيانات من السلة (cart) مباشرة لأنها متخزن فيها الاسم بالحجم والسعر
    for (let key in cart) {
        if (cart[key].qty > 0) {
            msg += `• ${cart[key].name} (x${cart[key].qty}) = ${cart[key].qty * cart[key].price} EGP\n`;
            total += cart[key].qty * cart[key].price;
            hasItems = true;
        }
    }

    if (!hasItems) {
        alert("يا فندم اختار المشروبات الأول 😊");
        return;
    }

    if (note) msg += `\n💬 ملاحظة: ${note}`;
    msg += `\n\n💰 الإجمالي النهائي: ${total} EGP`;

    window.open(`https://wa.me/201150782006?text=${encodeURIComponent(msg)}`, '_blank');
}