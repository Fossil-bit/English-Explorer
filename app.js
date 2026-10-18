/**
 * =========================================================================
 * GRADE 3 ENGLISH WEB APPLICATION: VOCABULARY & CATEGORIES
 * Frontend Logic, Game Engine & Google Apps Script Sync
 * Google Sheet ID: 1068IX9eyuwDFlrrODTpdR_clrGXnhFYTNRBVFYyZ_yk
 * =========================================================================
 */

// -------------------------------------------------------------------------
// 1. BACKEND GOOGLE APPS SCRIPT CONFIGURATION
// -------------------------------------------------------------------------
// นำ URL ที่ได้จากการ Deploy เป็น Web App ใน Google Apps Script มาใส่ตรงนี้
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwClI6YFJXQc9kW18cCUOPxeJIYWaXBOHa_SjWRIgb8Nya_pdcLaFky4-p1L6gpqDsorw/exec";
const GOOGLE_SHEET_ID = "1068IX9eyuwDFlrrODTpdR_clrGXnhFYTNRBVFYyZ_yk";

// -------------------------------------------------------------------------
// 2. VOCABULARY & CURRICULUM DATA (ป.3 - VOCABULARY & CATEGORIES)
// -------------------------------------------------------------------------
const CATEGORIES_DATA = {
  animals: {
    id: "animals",
    nameEn: "Animals",
    nameTh: "สัตว์",
    icon: "🐾",
    color: "from-amber-400 to-orange-500",
    description: "สิ่งมีชีวิต เคลื่อนที่ได้ ร้องเสียงต่างๆ เช่น หมา แมว ช้าง เสือ",
    trick: "สังเกตดูว่าเป็นสิ่งมีชีวิตที่ร้องได้ มี 4 ขา หรือว่ายน้ำ/บินได้หรือไม่",
    words: [
      { en: "Dog", th: "สุนัข / หมา", phonetics: "/dɔːɡ/", sound: "ด็อก", emoji: "🐶" },
      { en: "Cat", th: "แมว", phonetics: "/kæt/", sound: "แคท", emoji: "🐱" },
      { en: "Elephant", th: "ช้าง", phonetics: "/ˈel.ɪ.fənt/", sound: "เอล-เล-เฟินต์", emoji: "🐘" },
      { en: "Tiger", th: "เสือ", phonetics: "/ˈtaɪ.ɡər/", sound: "ไท-เกอร์", emoji: "🐯" },
      { en: "Dolphin", th: "โลมา", phonetics: "/ˈdɒl.fɪn/", sound: "ดอล-ฟิน", emoji: "🐬" },
      { en: "Rabbit", th: "กระต่าย", phonetics: "/ˈræb.ɪt/", sound: "แรบ-บิท", emoji: "🐰" },
      { en: "Lion", th: "สิงโต", phonetics: "/ˈlaɪ.ən/", sound: "ไล-เอิน", emoji: "🦁" },
      { en: "Monkey", th: "ลิง", phonetics: "/ˈmʌŋ.ki/", sound: "มังกี้", emoji: "🐵" }
    ]
  },
  food: {
    id: "food",
    nameEn: "Food & Fruits",
    nameTh: "อาหารและผลไม้",
    icon: "🍎",
    color: "from-red-400 to-pink-500",
    description: "สิ่งของที่รับประทานได้ มีรสชาติอร่อย และให้พลังงานแก่ร่างกาย",
    trick: "ถามตัวเองว่า 'สิ่งนี้เราเอาเข้าปากเคี้ยวหรือดื่มได้ไหม?' ถ้าได้คืออาหารหรือผลไม้แน่นอน!",
    words: [
      { en: "Apple", th: "แอปเปิ้ล", phonetics: "/ˈæp.əl/", sound: "แอพ-เพิล", emoji: "🍎" },
      { en: "Banana", th: "กล้วย", phonetics: "/bəˈnɑː.nə/", sound: "บะ-แน-นะ", emoji: "🍌" },
      { en: "Pizza", th: "พิซซ่า", phonetics: "/ˈpiːt.sə/", sound: "พิท-ซ่า", emoji: "🍕" },
      { en: "Sandwich", th: "แซนด์วิช", phonetics: "/ˈsæn.wɪdʒ/", sound: "แซนด์-วิช", emoji: "🥪" },
      { en: "Milk", th: "นม", phonetics: "/mɪlk/", sound: "มิลค์", emoji: "🥛" },
      { en: "Watermelon", th: "แตงโม", phonetics: "/ˈwɔː.təˌmel.ən/", sound: "วอเตอร์-เมลอน", emoji: "🍉" },
      { en: "Rice", th: "ข้าว", phonetics: "/raɪs/", sound: "ไรซ์", emoji: "🍚" },
      { en: "Hamburger", th: "แฮมเบอร์เกอร์", phonetics: "/ˈhæmˌbɜː.ɡər/", sound: "แฮม-เบอร์-เกอร์", emoji: "🍔" }
    ]
  },
  school: {
    id: "school",
    nameEn: "School Things",
    nameTh: "อุปกรณ์การเรียน",
    icon: "✏️",
    color: "from-blue-400 to-cyan-500",
    description: "สิ่งของหรือเครื่องมือที่เราพกใส่กระเป๋าไปโรงเรียนเพื่อใช้เรียนและเขียน",
    trick: "สังเกตสิ่งของที่อยู่ในกระเป๋านักเรียน หรือบนโต๊ะเรียน เช่น ดินสอ ยางลบ ไม้บรรทัด",
    words: [
      { en: "Pencil", th: "ดินสอ", phonetics: "/ˈpen.səl/", sound: "เพน-เซิล", emoji: "✏️" },
      { en: "Ruler", th: "ไม้บรรทัด", phonetics: "/ˈruː.lər/", sound: "รู-เลอร์", emoji: "📏" },
      { en: "Eraser", th: "ยางลบ", phonetics: "/ɪˈreɪ.zər/", sound: "อิ-เร-เซอร์", emoji: "🧼" },
      { en: "Notebook", th: "สมุด", phonetics: "/ˈnəʊt.bʊk/", sound: "โน้ต-บุ๊ก", emoji: "📓" },
      { en: "Schoolbag", th: "กระเป๋านักเรียน", phonetics: "/ˈskuːl.bæɡ/", sound: "สคูล-แบ็ก", emoji: "🎒" },
      { en: "Scissors", th: "กรรไกร", phonetics: "/ˈsɪz.əz/", sound: "ซิส-เซอส์", emoji: "✂️" },
      { en: "Book", th: "หนังสือ", phonetics: "/bʊk/", sound: "บุ๊ก", emoji: "📖" },
      { en: "Crayon", th: "สีเทียน", phonetics: "/ˈkreɪ.ɒn/", sound: "เคร-ยอน", emoji: "🖍️" }
    ]
  },
  jobs: {
    id: "jobs",
    nameEn: "Jobs",
    nameTh: "อาชีพ",
    icon: "👨‍⚕️",
    color: "from-emerald-400 to-teal-500",
    description: "บุคคลที่ทำงาน ทำหน้าที่บริการและช่วยเหลือสังคม มีเครื่องแบบเฉพาะ",
    trick: "สังเกตคนทำงาน เช่น ผู้รักษาคนไข้ ผู้สอนหนังสือ ผู้ช่วยดับไฟ",
    words: [
      { en: "Teacher", th: "ครู / อาจารย์", phonetics: "/ˈtiː.tʃər/", sound: "ทีช-เชอร์", emoji: "👩‍🏫" },
      { en: "Doctor", th: "แพทย์ / หมอ", phonetics: "/ˈdɒk.tər/", sound: "ด็อก-เตอร์", emoji: "👨‍⚕️" },
      { en: "Police", th: "ตำรวจ", phonetics: "/pəˈliːs/", sound: "โพลีส", emoji: "👮" },
      { en: "Nurse", th: "พยาบาล", phonetics: "/nɜːs/", sound: "เนิร์ส", emoji: "👩‍⚕️" },
      { en: "Firefighter", th: "นักดับเพลิง", phonetics: "/ˈfaɪəˌfaɪ.tər/", sound: "ไฟเออร์-ไฟเตอร์", emoji: "👨‍🚒" },
      { en: "Pilot", th: "นักบิน", phonetics: "/ˈpaɪ.lət/", sound: "ไพ-เลิต", emoji: "👨‍✈️" },
      { en: "Chef", th: "พ่อครัว / แม่ครัว", phonetics: "/ʃef/", sound: "เชฟ", emoji: "👨‍🍳" },
      { en: "Farmer", th: "ชาวนา / เกษตรกร", phonetics: "/ˈfɑː.mər/", sound: "ฟาร์ม-เมอร์", emoji: "👨‍🌾" }
    ]
  },
  clothes: {
    id: "clothes",
    nameEn: "Clothes",
    nameTh: "เครื่องแต่งกาย",
    icon: "👕",
    color: "from-purple-400 to-indigo-500",
    description: "สิ่งของหรือเสื้อผ้าที่มนุษย์สวมใส่บนร่างกายเพื่อความอบอุ่นและสุภาพ",
    trick: "สังเกตสิ่งที่สวมใส่บนตัว เช่น เสื้อ กางเกง หมวก รองเท้า ถุงเท้า",
    words: [
      { en: "Shirt", th: "เสื้อเชิ้ต", phonetics: "/ʃɜːt/", sound: "เชิร์ต", emoji: "👔" },
      { en: "T-shirt", th: "เสื้อยืด", phonetics: "/ˈtiː.ʃɜːt/", sound: "ที-เชิร์ต", emoji: "👕" },
      { en: "Pants", th: "กางเกงขายาว", phonetics: "/pænts/", sound: "แพนทส์", emoji: "👖" },
      { en: "Dress", th: "ชุดกระโปรง", phonetics: "/dres/", sound: "เดรส", emoji: "👗" },
      { en: "Shoes", th: "รองเท้า", phonetics: "/ʃuːz/", sound: "ชูส์", emoji: "👟" },
      { en: "Hat", th: "หมวก", phonetics: "/hæt/", sound: "แฮท", emoji: "🧢" },
      { en: "Socks", th: "ถุงเท้า", phonetics: "/sɒks/", sound: "ซ็อกส์", emoji: "🧦" },
      { en: "Skirt", th: "กระโปรง", phonetics: "/skɜːt/", sound: "สเกิร์ต", emoji: "🩳" }
    ]
  }
};

// -------------------------------------------------------------------------
// 3. UTILITY: FISHER-YATES SHUFFLE ALGORITHM
// -------------------------------------------------------------------------
/**
 * สุ่มสลับตำแหน่งสมาชิกใน Array ด้วย Fisher-Yates Algorithm
 * ใช้สำหรับสลับตำแหน่งตัวเลือก (A, B, C, D) ให้ข้อถูกสลับที่ทุกรอบ
 * และสลับลำดับข้อคำถามไม่ให้ซ้ำกัน
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// -------------------------------------------------------------------------
// 4. QUESTION SETS (5 ชุดคำถาม รวม 50 ข้อ สำหรับสุ่มและสลับแต่ละรอบไม่ให้ซ้ำกัน)
// -------------------------------------------------------------------------
const QUESTION_SETS = [
  // ==========================================
  // ชุดที่ 1: ผจญภัยดินแดนคำศัพท์ (Land of Words)
  // ==========================================
  {
    setId: 1,
    name: "ชุดที่ 1: ดินแดนคำศัพท์ (Land of Words)",
    description: "ฝึกฝนคำศัพท์พื้นฐานรอบตัว 5 หมวดหมู่",
    questions: [
      {
        id: "1-1",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which category does 'Elephant 🐘' belong to?",
        questionTh: "คำว่า 'Elephant 🐘' (ช้าง) จัดอยู่ในหมวดหมู่อะไร?",
        options: [
          { text: "Animals (สัตว์)", isCorrect: true },
          { text: "Food & Fruits (อาหารและผลไม้)", isCorrect: false },
          { text: "Clothes (เครื่องแต่งกาย)", isCorrect: false },
          { text: "Jobs (อาชีพ)", isCorrect: false }
        ],
        hint: "ช้างเป็นสิ่งมีชีวิตตัวใหญ่ มีงวงและงา ร้องแปร๋นๆ",
        explanation: "Elephant แปลว่า ช้าง ซึ่งเป็นสิ่งมีชีวิต จึงจัดอยู่ในหมวด Animals"
      },
      {
        id: "1-2",
        type: "choice",
        category: "school",
        categoryName: "School Things (อุปกรณ์การเรียน)",
        question: "Which word belongs to the 'School Things ✏️' category?",
        questionTh: "คำศัพท์ข้อใดอยู่ในหมวดหมู่ 'School Things' (อุปกรณ์การเรียน)?",
        options: [
          { text: "Pencil (ดินสอ)", isCorrect: true },
          { text: "Tiger (เสือ)", isCorrect: false },
          { text: "Pizza (พิซซ่า)", isCorrect: false },
          { text: "Doctor (คุณหมอ)", isCorrect: false }
        ],
        hint: "สิ่งของนี้เราใช้สำหรับเขียนหรือวาดรูปลงในสมุด",
        explanation: "Pencil แปลว่า ดินสอ ใช้สำหรับการเรียนการสอน จึงอยู่ในหมวด School Things"
      },
      {
        id: "1-3",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Match each word with its correct category! (จับคู่คำศัพท์กับหมวดหมู่)",
        questionTh: "คลิกเลือกคำศัพท์ทางซ้าย แล้วคลิกหมวดหมู่ทางขวาเพื่อจับคู่",
        pairs: [
          { left: "Banana 🍌", right: "Food & Fruits", categoryKey: "food" },
          { left: "Teacher 👩‍🏫", right: "Jobs", categoryKey: "jobs" },
          { left: "Shoes 👟", right: "Clothes", categoryKey: "clothes" }
        ],
        hint: "Banana คือกล้วยที่ทานได้, Teacher คือคุณครูที่สอนหนังสือ, Shoes คือรองเท้าที่เราสวมใส่",
        explanation: "Banana ➔ Food & Fruits | Teacher ➔ Jobs | Shoes ➔ Clothes"
      },
      {
        id: "1-4",
        type: "choice",
        category: "food",
        categoryName: "Food & Fruits (อาหารและผลไม้)",
        question: "Look at the picture: 🍕 'Pizza' is in which category?",
        questionTh: "'Pizza 🍕' จัดอยู่ในหมวดหมู่ใด?",
        options: [
          { text: "Food & Fruits (อาหารและผลไม้)", isCorrect: true },
          { text: "School Things (อุปกรณ์การเรียน)", isCorrect: false },
          { text: "Jobs (อาชีพ)", isCorrect: false },
          { text: "Animals (สัตว์)", isCorrect: false }
        ],
        hint: "พิซซ่ามีแป้งกรอบและชีสเยิ้มๆ ใช้สำหรับรับประทานยามหิว",
        explanation: "Pizza คืออาหารอิตาเลียนยอดนิยม จัดอยู่ในหมวด Food & Fruits"
      },
      {
        id: "1-5",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Who works in a hospital and cures sick people? 👨‍⚕️",
        questionTh: "ใครทำงานในโรงพยาบาลและคอยรักษาคนป่วย?",
        options: [
          { text: "Doctor (แพทย์/หมอ)", isCorrect: true },
          { text: "Pilot (นักบิน)", isCorrect: false },
          { text: "Farmer (ชาวนา)", isCorrect: false },
          { text: "Chef (พ่อครัว)", isCorrect: false }
        ],
        hint: "ผู้ที่สวมเสื้อกาวน์สีขาวและมีหูฟังตรวจคนไข้ (Stethoscope)",
        explanation: "Doctor แปลว่า คุณหมอ ทำงานรักษาผู้ป่วยในโรงพยาบาล จัดอยู่ในหมวด Jobs"
      },
      {
        id: "1-6",
        type: "choice",
        category: "clothes",
        categoryName: "Clothes (เครื่องแต่งกาย)",
        question: "Which of these do you wear on your head? 🧢",
        questionTh: "สิ่งใดในข้อนี้ที่เราใช้สวมใส่บนศีรษะ?",
        options: [
          { text: "Hat (หมวก)", isCorrect: true },
          { text: "Socks (ถุงเท้า)", isCorrect: false },
          { text: "Pants (กางเกง)", isCorrect: false },
          { text: "Shirt (เสื้อเชิ้ต)", isCorrect: false }
        ],
        hint: "สวมไว้เพื่อกันแดดร้อนๆ บนหัวของเรา",
        explanation: "Hat แปลว่า หมวก จัดเป็นเครื่องแต่งกายที่สวมใส่บนศีรษะ"
      },
      {
        id: "1-7",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Pair the vocabulary with the right category! (โยงคำศัพท์กับหมวดหมู่)",
        questionTh: "จับคู่สัตว์ อุปกรณ์การเรียน และอาชีพ ให้ถูกต้อง",
        pairs: [
          { left: "Dolphin 🐬", right: "Animals", categoryKey: "animals" },
          { left: "Ruler 📏", right: "School Things", categoryKey: "school" },
          { left: "Firefighter 👨‍🚒", right: "Jobs", categoryKey: "jobs" }
        ],
        hint: "Dolphin คือโลมาแสนรู้, Ruler คือไม้บรรทัดวัดความยาว, Firefighter คือนักดับเพลิงผู้กล้าหาญ",
        explanation: "Dolphin ➔ Animals | Ruler ➔ School Things | Firefighter ➔ Jobs"
      },
      {
        id: "1-8",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which animal can swim and lives in the ocean? 🐬",
        questionTh: "สัตว์ข้อใดว่ายน้ำได้และอาศัยอยู่ในมหาสมุทร?",
        options: [
          { text: "Dolphin (โลมา)", isCorrect: true },
          { text: "Monkey (ลิง)", isCorrect: false },
          { text: "Rabbit (กระต่าย)", isCorrect: false },
          { text: "Tiger (เสือ)", isCorrect: false }
        ],
        hint: "สัตว์น้ำเลี้ยงลูกด้วยนมที่ฉลาดและชอบกระโดดเหนือน้ำ",
        explanation: "Dolphin แปลว่า โลมา อาศัยอยู่ในทะเล จัดอยู่ในหมวด Animals"
      },
      {
        id: "1-9",
        type: "choice",
        category: "school",
        categoryName: "School Things (อุปกรณ์การเรียน)",
        question: "What do you use to erase pencil marks? 🧼",
        questionTh: "อุปกรณ์ชิ้นใดใช้สำหรับลบรอยดินสอเวลาเขียนผิด?",
        options: [
          { text: "Eraser (ยางลบ)", isCorrect: true },
          { text: "Scissors (กรรไกร)", isCorrect: false },
          { text: "Notebook (สมุด)", isCorrect: false },
          { text: "Schoolbag (กระเป๋านักเรียน)", isCorrect: false }
        ],
        hint: "คำว่า 'Erase' แปลว่า ลบ ดังนั้นเครื่องมือนี้คือ...",
        explanation: "Eraser แปลว่า ยางลบ จัดเป็นอุปกรณ์การเรียนในหมวด School Things"
      },
      {
        id: "1-10",
        type: "choice",
        category: "clothes",
        categoryName: "Clothes (เครื่องแต่งกาย)",
        question: "Which word does NOT belong to the 'Clothes 👕' category? (ข้อใด 'ไม่ใช่' เครื่องแต่งกาย)",
        questionTh: "คำศัพท์ข้อใด 'ไม่ได้' จัดอยู่ในหมวดหมู่เครื่องแต่งกาย?",
        options: [
          { text: "Watermelon (แตงโม)", isCorrect: true },
          { text: "Dress (ชุดกระโปรง)", isCorrect: false },
          { text: "T-shirt (เสื้อยืด)", isCorrect: false },
          { text: "Pants (กางเกง)", isCorrect: false }
        ],
        hint: "มองหาของที่มีรสหวาน ทานได้ ไม่สามารถนำมาสวมใส่เป็นเสื้อผ้าได้",
        explanation: "Watermelon แปลว่า แตงโม ซึ่งเป็นผลไม้ (Food & Fruits) จึงไม่ใช่เครื่องแต่งกาย"
      }
    ]
  },

  // ==========================================
  // ชุดที่ 2: ห้องเรียนและชีวิตประจำวัน (School & Daily Life)
  // ==========================================
  {
    setId: 2,
    name: "ชุดที่ 2: ห้องเรียนและชีวิตประจำวัน (School & Daily Life)",
    description: "ทดสอบคำศัพท์ในโรงเรียน อุปกรณ์ และอาหารประจำวัน",
    questions: [
      {
        id: "2-1",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Who teaches English to students at school? 👩‍🏫",
        questionTh: "ใครทำหน้าที่สอนภาษาอังกฤษให้กับนักเรียนในโรงเรียน?",
        options: [
          { text: "Teacher (ครู / อาจารย์)", isCorrect: true },
          { text: "Pilot (นักบิน)", isCorrect: false },
          { text: "Chef (พ่อครัว)", isCorrect: false },
          { text: "Farmer (ชาวนา)", isCorrect: false }
        ],
        hint: "บุคคลที่ยืนหน้าชั้นเรียนและเขียนบนกระดานไวท์บอร์ด",
        explanation: "Teacher แปลว่า ครู สอนหนังสือในโรงเรียน จัดอยู่ในหมวด Jobs"
      },
      {
        id: "2-2",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which wild animal has orange fur with black stripes? 🐯",
        questionTh: "สัตว์ป่าชนิดใดมีขนสีส้มพร้อมลายพาดกลอนสีดำ?",
        options: [
          { text: "Tiger (เสือ)", isCorrect: true },
          { text: "Dog (สุนัข)", isCorrect: false },
          { text: "Rabbit (กระต่าย)", isCorrect: false },
          { text: "Elephant (ช้าง)", isCorrect: false }
        ],
        hint: "นักล่าผู้สง่างามในป่า คำรามเสียงดังก้องป่า",
        explanation: "Tiger แปลว่า เสือ เป็นสัตว์เลี้ยงลูกด้วยนมในหมวด Animals"
      },
      {
        id: "2-3",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Match words with their categories! (จับคู่คำศัพท์ให้ตรงหมวดหมู่)",
        questionTh: "โยงจับคู่ Apple, Scissors และ Pilot กับหมวดหมู่ที่ถูกต้อง",
        pairs: [
          { left: "Apple 🍎", right: "Food & Fruits", categoryKey: "food" },
          { left: "Scissors ✂️", right: "School Things", categoryKey: "school" },
          { left: "Pilot 👨‍✈️", right: "Jobs", categoryKey: "jobs" }
        ],
        hint: "Apple รับประทานได้, Scissors ใช้ตัดกระดาษ, Pilot บินเครื่องบิน",
        explanation: "Apple ➔ Food & Fruits | Scissors ➔ School Things | Pilot ➔ Jobs"
      },
      {
        id: "2-4",
        type: "choice",
        category: "school",
        categoryName: "School Things (อุปกรณ์การเรียน)",
        question: "What do you carry on your back to bring books to school? 🎒",
        questionTh: "สิ่งใดที่คุณสะพายไว้บนหลังเพื่อนำสมุดหนังสือมาโรงเรียน?",
        options: [
          { text: "Schoolbag (กระเป๋านักเรียน)", isCorrect: true },
          { text: "Ruler (ไม้บรรทัด)", isCorrect: false },
          { text: "Eraser (ยางลบ)", isCorrect: false },
          { text: "Scissors (กรรไกร)", isCorrect: false }
        ],
        hint: "กระเป๋าใบใหญ่สำหรับใส่สัมภาระและเครื่องเขียน",
        explanation: "Schoolbag แปลว่า กระเป๋านักเรียน จัดอยู่ในหมวด School Things"
      },
      {
        id: "2-5",
        type: "choice",
        category: "food",
        categoryName: "Food & Fruits (อาหารและผลไม้)",
        question: "What healthy white drink comes from cows? 🥛",
        questionTh: "เครื่องดื่มสีขาวที่มีประโยชน์และได้มาจากแม่วัวคืออะไร?",
        options: [
          { text: "Milk (นม)", isCorrect: true },
          { text: "Pizza (พิซซ่า)", isCorrect: false },
          { text: "Sandwich (แซนด์วิช)", isCorrect: false },
          { text: "Watermelon (แตงโม)", isCorrect: false }
        ],
        hint: "ดื่มทุกเช้าช่วยเสริมสร้างแคลเซียมให้กระดูกแข็งแรง",
        explanation: "Milk แปลว่า นม เป็นอาหารประเภทเครื่องดื่ม จัดอยู่ในหมวด Food & Fruits"
      },
      {
        id: "2-6",
        type: "choice",
        category: "clothes",
        categoryName: "Clothes (เครื่องแต่งกาย)",
        question: "Which clothing item covers the upper body and has buttons? 👔",
        questionTh: "เสื้อผ้าชนิดใดที่สวมใส่ช่วงบนและมักมีกระดุมผ่าหน้า?",
        options: [
          { text: "Shirt (เสื้อเชิ้ต)", isCorrect: true },
          { text: "Pants (กางเกง)", isCorrect: false },
          { text: "Shoes (รองเท้า)", isCorrect: false },
          { text: "Socks (ถุงเท้า)", isCorrect: false }
        ],
        hint: "เสื้อคอปกแขนสั้นหรือยาว สวมใส่สุภาพไปทำงานหรือไปเรียน",
        explanation: "Shirt แปลว่า เสื้อเชิ้ต จัดอยู่ในหมวดหมู่ Clothes"
      },
      {
        id: "2-7",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Connect each item to its category! (โยงคำศัพท์ให้ถูกต้อง)",
        questionTh: "จับคู่กระต่าย แซนด์วิช และกางเกง กับหมวดหมู่",
        pairs: [
          { left: "Rabbit 🐰", right: "Animals", categoryKey: "animals" },
          { left: "Sandwich 🥪", right: "Food & Fruits", categoryKey: "food" },
          { left: "Pants 👖", right: "Clothes", categoryKey: "clothes" }
        ],
        hint: "Rabbit สัตว์หูยาว, Sandwich อาหารขนมปังประกบ, Pants กางเกงสวมใส่",
        explanation: "Rabbit ➔ Animals | Sandwich ➔ Food & Fruits | Pants ➔ Clothes"
      },
      {
        id: "2-8",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which funny animal loves swinging on trees and eating bananas? 🐵",
        questionTh: "สัตว์แสนซนชนิดใดชอบโหนกิ่งไม้และชอบกินกล้วย?",
        options: [
          { text: "Monkey (ลิง)", isCorrect: true },
          { text: "Tiger (เสือ)", isCorrect: false },
          { text: "Lion (สิงโต)", isCorrect: false },
          { text: "Dolphin (โลมา)", isCorrect: false }
        ],
        hint: "ร้องเจี๊ยกๆ วิ่งเล่นคล่องแคล่วบนต้นไม้",
        explanation: "Monkey แปลว่า ลิง เป็นสัตว์เลี้ยงลูกด้วยนม จัดอยู่ในหมวด Animals"
      },
      {
        id: "2-9",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Who wears a uniform, catches bad guys, and keeps us safe? 👮",
        questionTh: "ใครสวมเครื่องแบบ จับคนร้าย และคอยดูแลความปลอดภัยของประชาชน?",
        options: [
          { text: "Police (ตำรวจ)", isCorrect: true },
          { text: "Doctor (หมอ)", isCorrect: false },
          { text: "Farmer (ชาวนา)", isCorrect: false },
          { text: "Teacher (ครู)", isCorrect: false }
        ],
        hint: "ผู้พิทักษ์สันติราษฎร์ ปฏิบัติหน้าที่ที่สถานีตำรวจ",
        explanation: "Police แปลว่า ตำรวจ จัดเป็นอาชีพในหมวด Jobs"
      },
      {
        id: "2-10",
        type: "choice",
        category: "school",
        categoryName: "School Things (อุปกรณ์การเรียน)",
        question: "Which word does NOT belong to the 'School Things ✏️' category?",
        questionTh: "คำศัพท์ข้อใด 'ไม่ใช่' อุปกรณ์การเรียนในห้องเรียน?",
        options: [
          { text: "Lion (สิงโต)", isCorrect: true },
          { text: "Notebook (สมุด)", isCorrect: false },
          { text: "Ruler (ไม้บรรทัด)", isCorrect: false },
          { text: "Pencil (ดินสอ)", isCorrect: false }
        ],
        hint: "มองหาสัตว์กินเนื้อตัวใหญ่ที่มีแผงคอ ไม่ใช่อุปกรณ์เขียนหนังสือ",
        explanation: "Lion แปลว่า สิงโต ซึ่งเป็นสัตว์ (Animals) ไม่ใช่อุปกรณ์การเรียน"
      }
    ]
  },

  // ==========================================
  // ชุดที่ 3: ธรรมชาติ อาหาร และชุมชน (Nature & Community)
  // ==========================================
  {
    setId: 3,
    name: "ชุดที่ 3: ธรรมชาติ อาหาร และชุมชน (Nature & Community)",
    description: "สำรวจสัตว์เลี้ยง อาหารจานโปรด และเครื่องแต่งกาย",
    questions: [
      {
        id: "3-1",
        type: "choice",
        category: "food",
        categoryName: "Food & Fruits (อาหารและผลไม้)",
        question: "What staple white grain do we eat with soup and curry in Thailand? 🍚",
        questionTh: "เมล็ดธัญพืชสีขาวที่คนไทยรับประทานเป็นอาหารหลักทุกวันคืออะไร?",
        options: [
          { text: "Rice (ข้าว)", isCorrect: true },
          { text: "Milk (นม)", isCorrect: false },
          { text: "Apple (แอปเปิ้ล)", isCorrect: false },
          { text: "Banana (กล้วย)", isCorrect: false }
        ],
        hint: "หุงในหม้อข้าวร้อนๆ ทานคู่กับกับข้าวแสนอร่อย",
        explanation: "Rice แปลว่า ข้าว จัดอยู่ในหมวดอาหารและผลไม้ (Food & Fruits)"
      },
      {
        id: "3-2",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which cute pet says 'Meow meow' and catches mice? 🐱",
        questionTh: "สัตว์เลี้ยงน่ารักตัวใดส่งเสียงร้อง 'เหมียว เหมียว' และชอบจับหนู?",
        options: [
          { text: "Cat (แมว)", isCorrect: true },
          { text: "Dog (สุนัข)", isCorrect: false },
          { text: "Elephant (ช้าง)", isCorrect: false },
          { text: "Tiger (เสือ)", isCorrect: false }
        ],
        hint: "สัตว์สี่ขาตัวเล็ก มีหนวด ขนนุ่ม ชอบคลอเคลีย",
        explanation: "Cat แปลว่า แมว จัดอยู่ในหมวดหมู่สัตว์ (Animals)"
      },
      {
        id: "3-3",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Connect words to their proper category! (โยงเส้นจับคู่)",
        questionTh: "จับคู่สมุด พยาบาล และชุดกระโปรง กับหมวดหมู่",
        pairs: [
          { left: "Notebook 📓", right: "School Things", categoryKey: "school" },
          { left: "Nurse 👩‍⚕️", right: "Jobs", categoryKey: "jobs" },
          { left: "Dress 👗", right: "Clothes", categoryKey: "clothes" }
        ],
        hint: "Notebook ใช้จดบันทึก, Nurse พยาบาลดูแลคนป่วย, Dress ชุดเดรสสวยงาม",
        explanation: "Notebook ➔ School Things | Nurse ➔ Jobs | Dress ➔ Clothes"
      },
      {
        id: "3-4",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Who drives a big red truck and extinguishes dangerous fires? 👨‍🚒",
        questionTh: "ใครขับรถดับเพลิงคันใหญ่สีแดงและคอยดับไฟที่กำลังไหม้?",
        options: [
          { text: "Firefighter (นักดับเพลิง)", isCorrect: true },
          { text: "Teacher (ครู)", isCorrect: false },
          { text: "Doctor (หมอ)", isCorrect: false },
          { text: "Chef (เชฟ)", isCorrect: false }
        ],
        hint: "สวมหมวกนิรภัย ถือสายฉีดน้ำแรงดันสูงเพื่อช่วยเหลือผู้คน",
        explanation: "Firefighter แปลว่า นักดับเพลิง จัดเป็นอาชีพในหมวด Jobs"
      },
      {
        id: "3-5",
        type: "choice",
        category: "clothes",
        categoryName: "Clothes (เครื่องแต่งกาย)",
        question: "What do you put on your feet before running outdoors? 👟",
        questionTh: "สิ่งใดที่เราสวมใส่ที่เท้าก่อนออกไปวิ่งเล่นข้างนอก?",
        options: [
          { text: "Shoes (รองเท้า)", isCorrect: true },
          { text: "Hat (หมวก)", isCorrect: false },
          { text: "Shirt (เสื้อเชิ้ต)", isCorrect: false },
          { text: "Dress (ชุดกระโปรง)", isCorrect: false }
        ],
        hint: "ปกป้องเท้าของเราจากพื้นแข็งและหินแหลมคม",
        explanation: "Shoes แปลว่า รองเท้า จัดเป็นเครื่องแต่งกายในหมวด Clothes"
      },
      {
        id: "3-6",
        type: "choice",
        category: "school",
        categoryName: "School Things (อุปกรณ์การเรียน)",
        question: "What tool has two blades and is used to cut paper? ✂️",
        questionTh: "อุปกรณ์ใดมีใบมีดสองด้านประกบกันและใช้สำหรับตัดกระดาษ?",
        options: [
          { text: "Scissors (กรรไกร)", isCorrect: true },
          { text: "Eraser (ยางลบ)", isCorrect: false },
          { text: "Pencil (ดินสอ)", isCorrect: false },
          { text: "Book (หนังสือ)", isCorrect: false }
        ],
        hint: "ใช้ในวิชาศิลปะ เวลาตัดกระดาษเป็นรูปทรงต่างๆ",
        explanation: "Scissors แปลว่า กรรไกร จัดอยู่ในหมวด School Things"
      },
      {
        id: "3-7",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Match each vocabulary with its category! (จับคู่คำศัพท์)",
        questionTh: "จับคู่ Dog, Watermelon และ T-shirt ให้ตรงหมวด",
        pairs: [
          { left: "Dog 🐶", right: "Animals", categoryKey: "animals" },
          { left: "Watermelon 🍉", right: "Food & Fruits", categoryKey: "food" },
          { left: "T-shirt 👕", right: "Clothes", categoryKey: "clothes" }
        ],
        hint: "Dog สุนัขเพื่อนแท้, Watermelon แตงโมหวานฉ่ำ, T-shirt เสื้อยืดใส่สบาย",
        explanation: "Dog ➔ Animals | Watermelon ➔ Food & Fruits | T-shirt ➔ Clothes"
      },
      {
        id: "3-8",
        type: "choice",
        category: "food",
        categoryName: "Food & Fruits (อาหารและผลไม้)",
        question: "Look at this fast food with meat between round buns: 🍔 What is it?",
        questionTh: "อาหารที่มีชิ้นเนื้อประกบอยู่ระหว่างขนมปังทรงกลมคืออะไร?",
        options: [
          { text: "Hamburger (แฮมเบอร์เกอร์)", isCorrect: true },
          { text: "Apple (แอปเปิ้ล)", isCorrect: false },
          { text: "Milk (นม)", isCorrect: false },
          { text: "Rice (ข้าว)", isCorrect: false }
        ],
        hint: "อาหารฟาสต์ฟู้ดยอดนิยมที่มีผักกาด ซอสมะเขือเทศ และเนื้อบด",
        explanation: "Hamburger แปลว่า แฮมเบอร์เกอร์ จัดอยู่ในหมวด Food & Fruits"
      },
      {
        id: "3-9",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which animal has long ears, hops on grass, and loves carrots? 🐰",
        questionTh: "สัตว์ชนิดใดมีหูยาว กระโดดดึ๋งๆ และชอบกินแครอท?",
        options: [
          { text: "Rabbit (กระต่าย)", isCorrect: true },
          { text: "Lion (สิงโต)", isCorrect: false },
          { text: "Tiger (เสือ)", isCorrect: false },
          { text: "Elephant (ช้าง)", isCorrect: false }
        ],
        hint: "มีขนปุย หางกลมสั้น กระโดดอย่างว่องไว",
        explanation: "Rabbit แปลว่า กระต่าย จัดอยู่ในหมวดสัตว์ (Animals)"
      },
      {
        id: "3-10",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Which word does NOT belong to the 'Jobs 👨‍⚕️' category? (ข้อใด 'ไม่ใช่' อาชีพ)",
        questionTh: "คำศัพท์ข้อใด 'ไม่ได้' จัดอยู่ในหมวดหมู่อาชีพ?",
        options: [
          { text: "Pizza (พิซซ่า)", isCorrect: true },
          { text: "Doctor (หมอ)", isCorrect: false },
          { text: "Teacher (ครู)", isCorrect: false },
          { text: "Police (ตำรวจ)", isCorrect: false }
        ],
        hint: "มองหาอาหารที่มีชีสเยิ้มๆ ไม่ใช่คนที่ประกอบอาชีพทำงาน",
        explanation: "Pizza เป็นอาหาร (Food & Fruits) จึงไม่ใช่อาชีพ"
      }
    ]
  },

  // ==========================================
  // ชุดที่ 4: ยอดนักสำรวจรอบตัวเรา (World Explorer)
  // ==========================================
  {
    setId: 4,
    name: "ชุดที่ 4: ยอดนักสำรวจรอบตัวเรา (World Explorer)",
    description: "ท้าทายความจำกับคำศัพท์เครื่องแต่งกาย อาชีพ และสัตว์เลี้ยง",
    questions: [
      {
        id: "4-1",
        type: "choice",
        category: "clothes",
        categoryName: "Clothes (เครื่องแต่งกาย)",
        question: "What soft items do you wear on your feet before putting on shoes? 🧦",
        questionTh: "สิ่งของนุ่มๆ ชิ้นใดที่เราสวมใส่ที่เท้าก่อนจะสวมรองเท้าทับ?",
        options: [
          { text: "Socks (ถุงเท้า)", isCorrect: true },
          { text: "Hat (หมวก)", isCorrect: false },
          { text: "Shirt (เสื้อเชิ้ต)", isCorrect: false },
          { text: "Pants (กางเกง)", isCorrect: false }
        ],
        hint: "ช่วยซับเหงื่อและป้องกันไม่ให้รองเท้ากัดข้อเท้า",
        explanation: "Socks แปลว่า ถุงเท้า จัดอยู่ในหมวดหมู่ Clothes"
      },
      {
        id: "4-2",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Who wears a tall white hat and cooks delicious food in restaurants? 👨‍🍳",
        questionTh: "ใครสวมหมวกทรงสูงสีขาวและปรุงอาหารแสนอร่อยในภัตตาคาร?",
        options: [
          { text: "Chef (พ่อครัว / เชฟ)", isCorrect: true },
          { text: "Pilot (นักบิน)", isCorrect: false },
          { text: "Police (ตำรวจ)", isCorrect: false },
          { text: "Teacher (ครู)", isCorrect: false }
        ],
        hint: "ถือกระทะและตะหลิวทำอาหารในห้องครัวใหญ่",
        explanation: "Chef แปลว่า พ่อครัวหรือแม่ครัว ทำงานปรุงอาหาร จัดอยู่ในหมวด Jobs"
      },
      {
        id: "4-3",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Pair each word with its category! (จับคู่คำศัพท์กับหมวดหมู่)",
        questionTh: "จับคู่ Elephant, Ruler และ Farmer กับหมวดหมู่ให้ถูกต้อง",
        pairs: [
          { left: "Elephant 🐘", right: "Animals", categoryKey: "animals" },
          { left: "Ruler 📏", right: "School Things", categoryKey: "school" },
          { left: "Farmer 👨‍🌾", right: "Jobs", categoryKey: "jobs" }
        ],
        hint: "Elephant ช้างตัวโต, Ruler ไม้บรรทัดวัดเส้น, Farmer ชาวนาปลูกข้าว",
        explanation: "Elephant ➔ Animals | Ruler ➔ School Things | Farmer ➔ Jobs"
      },
      {
        id: "4-4",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which friendly pet barks 'Woof! Woof!' and wags its tail? 🐶",
        questionTh: "สัตว์เลี้ยงแสนซื่อสัตย์ตัวใดเห่าเสียง 'โฮ่ง! โฮ่ง!' และชอบกระดิกหาง?",
        options: [
          { text: "Dog (สุนัข / หมา)", isCorrect: true },
          { text: "Cat (แมว)", isCorrect: false },
          { text: "Dolphin (โลมา)", isCorrect: false },
          { text: "Monkey (ลิง)", isCorrect: false }
        ],
        hint: "เพื่อนที่ดีที่สุดของมนุษย์ คอยเฝ้าบ้านดูแลเจ้าของ",
        explanation: "Dog แปลว่า สุนัข จัดเป็นสัตว์เลี้ยงในหมวด Animals"
      },
      {
        id: "4-5",
        type: "choice",
        category: "school",
        categoryName: "School Things (อุปกรณ์การเรียน)",
        question: "What has many printed pages and pictures for students to read? 📖",
        questionTh: "สิ่งใดมีหน้ากระดาษและภาพประกอบไว้สำหรับให้นักเรียนเปิดอ่าน?",
        options: [
          { text: "Book (หนังสือ)", isCorrect: true },
          { text: "Eraser (ยางลบ)", isCorrect: false },
          { text: "Ruler (ไม้บรรทัด)", isCorrect: false },
          { text: "Scissors (กรรไกร)", isCorrect: false }
        ],
        hint: "อยู่ในห้องสมุด มีเรื่องราวความรู้มากมายรอให้อ่าน",
        explanation: "Book แปลว่า หนังสือ จัดเป็นอุปกรณ์การเรียนในหมวด School Things"
      },
      {
        id: "4-6",
        type: "choice",
        category: "food",
        categoryName: "Food & Fruits (อาหารและผลไม้)",
        question: "Which fruit is yellow, sweet, and curved like a crescent? 🍌",
        questionTh: "ผลไม้อะไรมีสีเหลือง รสหวาน และมีรูปทรงโค้งมน?",
        options: [
          { text: "Banana (กล้วย)", isCorrect: true },
          { text: "Apple (แอปเปิ้ล)", isCorrect: false },
          { text: "Watermelon (แตงโม)", isCorrect: false },
          { text: "Pizza (พิซซ่า)", isCorrect: false }
        ],
        hint: "ปอกเปลือกสีเหลืองออกก่อนรับประทาน และเป็นของโปรดของเจ้าลิง",
        explanation: "Banana แปลว่า กล้วย เป็นผลไม้ในหมวด Food & Fruits"
      },
      {
        id: "4-7",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Connect words to the right categories! (โยงคำศัพท์)",
        questionTh: "จับคู่นม กระโปรง และกรรไกร ให้ถูกต้อง",
        pairs: [
          { left: "Milk 🥛", right: "Food & Fruits", categoryKey: "food" },
          { left: "Skirt 🩳", right: "Clothes", categoryKey: "clothes" },
          { left: "Scissors ✂️", right: "School Things", categoryKey: "school" }
        ],
        hint: "Milk ดื่มเพื่อสุขภาพ, Skirt กระโปรงสวมใส่, Scissors ตัดสิ่งของ",
        explanation: "Milk ➔ Food & Fruits | Skirt ➔ Clothes | Scissors ➔ School Things"
      },
      {
        id: "4-8",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Who sits in the cockpit and flies an airplane across the sky? 👨‍✈️",
        questionTh: "ใครนั่งอยู่ในห้องนักบินและควบคุมเครื่องบินทะยานข้ามท้องฟ้า?",
        options: [
          { text: "Pilot (นักบิน)", isCorrect: true },
          { text: "Police (ตำรวจ)", isCorrect: false },
          { text: "Doctor (หมอ)", isCorrect: false },
          { text: "Farmer (ชาวนา)", isCorrect: false }
        ],
        hint: "มีปีกติดหน้าอกเสื้อ ทำงานที่สนามบินและบนท้องฟ้า",
        explanation: "Pilot แปลว่า นักบิน จัดอยู่ในหมวดหมู่อาชีพ (Jobs)"
      },
      {
        id: "4-9",
        type: "choice",
        category: "clothes",
        categoryName: "Clothes (เครื่องแต่งกาย)",
        question: "What clothes cover your legs down to your ankles? 👖",
        questionTh: "เสื้อผ้าชนิดใดที่สวมใส่ปกคลุมขาทั้งสองข้างลงไปถึงข้อเท้า?",
        options: [
          { text: "Pants (กางเกงขายาว)", isCorrect: true },
          { text: "Hat (หมวก)", isCorrect: false },
          { text: "Shirt (เสื้อเชิ้ต)", isCorrect: false },
          { text: "Shoes (รองเท้า)", isCorrect: false }
        ],
        hint: "สวมที่เอวและมีขากางเกงสองข้างคลุมถึงขาด้านล่าง",
        explanation: "Pants แปลว่า กางเกงขายาว จัดอยู่ในหมวด Clothes"
      },
      {
        id: "4-10",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which word does NOT belong to the 'Animals 🐾' category? (ข้อใด 'ไม่ใช่' สัตว์)",
        questionTh: "คำศัพท์ข้อใด 'ไม่ได้' จัดอยู่ในหมวดหมู่สัตว์?",
        options: [
          { text: "Teacher (คุณครู)", isCorrect: true },
          { text: "Tiger (เสือ)", isCorrect: false },
          { text: "Rabbit (กระต่าย)", isCorrect: false },
          { text: "Elephant (ช้าง)", isCorrect: false }
        ],
        hint: "มองหาบุคคลที่สอนหนังสือ ไม่ใช่สัตว์สี่ขาในธรรมชาติ",
        explanation: "Teacher แปลว่า คุณครู ซึ่งเป็นอาชีพ (Jobs) จึงไม่ใช่สัตว์"
      }
    ]
  },

  // ==========================================
  // ชุดที่ 5: ศึกยอดฝีมือคำศัพท์ขั้นเซียน (Master Challenge)
  // ==========================================
  {
    setId: 5,
    name: "ชุดที่ 5: ศึกยอดฝีมือคำศัพท์ขั้นเซียน (Master Challenge)",
    description: "แบบทดสอบรวมมิตรหมวดหมู่คำศัพท์เพื่อไต่ยศสู่ระดับตำนาน",
    questions: [
      {
        id: "5-1",
        type: "choice",
        category: "school",
        categoryName: "School Things (อุปกรณ์การเรียน)",
        question: "What colorful wax sticks do children use for coloring pictures? 🖍️",
        questionTh: "แท่งขี้ผึ้งหลากสีสันชนิดใดที่เด็กๆ ใช้สำหรับระบายสีภาพวาด?",
        options: [
          { text: "Crayon (สีเทียน)", isCorrect: true },
          { text: "Eraser (ยางลบ)", isCorrect: false },
          { text: "Ruler (ไม้บรรทัด)", isCorrect: false },
          { text: "Notebook (สมุด)", isCorrect: false }
        ],
        hint: "มีหลายสีในกล่อง เช่น แดง เหลือง น้ำเงิน สำหรับระบายสีสวยงาม",
        explanation: "Crayon แปลว่า สีเทียน จัดเป็นอุปกรณ์การเรียนในหมวด School Things"
      },
      {
        id: "5-2",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Who works in green fields, grows rice, and raises farm animals? 👨‍🌾",
        questionTh: "ใครทำงานในทุ่งนากว้างขวาง ปลูกข้าว และเลี้ยงสัตว์ในฟาร์ม?",
        options: [
          { text: "Farmer (ชาวนา / เกษตรกร)", isCorrect: true },
          { text: "Pilot (นักบิน)", isCorrect: false },
          { text: "Chef (พ่อครัว)", isCorrect: false },
          { text: "Police (ตำรวจ)", isCorrect: false }
        ],
        hint: "กระดูกสันหลังของชาติ ปลูกพืชผลทางการเกษตรให้พวกเราได้รับประทาน",
        explanation: "Farmer แปลว่า ชาวนาหรือเกษตรกร จัดอยู่ในหมวด Jobs"
      },
      {
        id: "5-3",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Match each word with its category! (จับคู่คำศัพท์ให้ถูกต้อง)",
        questionTh: "จับคู่เสือ พิซซ่า และคุณหมอ กับหมวดหมู่ที่สัมพันธ์กัน",
        pairs: [
          { left: "Tiger 🐯", right: "Animals", categoryKey: "animals" },
          { left: "Pizza 🍕", right: "Food & Fruits", categoryKey: "food" },
          { left: "Doctor 👨‍⚕️", right: "Jobs", categoryKey: "jobs" }
        ],
        hint: "Tiger สัตว์ป่าดุร้าย, Pizza อาหารอิตาเลียน, Doctor หมอรักษาคนไข้",
        explanation: "Tiger ➔ Animals | Pizza ➔ Food & Fruits | Doctor ➔ Jobs"
      },
      {
        id: "5-4",
        type: "choice",
        category: "animals",
        categoryName: "Animals (สัตว์)",
        question: "Which majestic animal is known as the 'King of the Jungle'? 🦁",
        questionTh: "สัตว์ผู้สง่างามชนิดใดที่ได้รับการขนานนามว่าเป็น 'เจ้าป่า'?",
        options: [
          { text: "Lion (สิงโต)", isCorrect: true },
          { text: "Monkey (ลิง)", isCorrect: false },
          { text: "Rabbit (กระต่าย)", isCorrect: false },
          { text: "Dog (สุนัข)", isCorrect: false }
        ],
        hint: "ตัวผู้มีแผงคอหนาสีทอง คำรามเสียงดังก้องกังวาน",
        explanation: "Lion แปลว่า สิงโต เจ้าแห่งผืนป่า จัดอยู่ในหมวด Animals"
      },
      {
        id: "5-5",
        type: "choice",
        category: "clothes",
        categoryName: "Clothes (เครื่องแต่งกาย)",
        question: "What one-piece clothing with a flowing skirt do girls often wear? 👗",
        questionTh: "เสื้อผ้าชิ้นเดียวที่มีส่วนกระโปรงบานพลิ้วไหวที่เด็กผู้หญิงนิยมสวมใส่คืออะไร?",
        options: [
          { text: "Dress (ชุดกระโปรง / เดรส)", isCorrect: true },
          { text: "Hat (หมวก)", isCorrect: false },
          { text: "Socks (ถุงเท้า)", isCorrect: false },
          { text: "Shoes (รองเท้า)", isCorrect: false }
        ],
        hint: "เสื้อผ้าชิ้นยาวชิ้นเดียวคลุมตั้งแต่ไหล่ลงมาถึงช่วงขา",
        explanation: "Dress แปลว่า ชุดเดรสหรือชุดกระโปรง จัดอยู่ในหมวด Clothes"
      },
      {
        id: "5-6",
        type: "choice",
        category: "food",
        categoryName: "Food & Fruits (อาหารและผลไม้)",
        question: "Which crispy round fruit can be red or green and keeps the doctor away? 🍎",
        questionTh: "ผลไม้ทรงกลมกรุบกรอบ มีทั้งสีแดงและสีเขียว มีประโยชน์ต่อสุขภาพคืออะไร?",
        options: [
          { text: "Apple (แอปเปิ้ล)", isCorrect: true },
          { text: "Rice (ข้าว)", isCorrect: false },
          { text: "Pizza (พิซซ่า)", isCorrect: false },
          { text: "Sandwich (แซนด์วิช)", isCorrect: false }
        ],
        hint: "สุภาษิตฝรั่งกล่าวว่า 'An apple a day keeps the doctor away'",
        explanation: "Apple แปลว่า แอปเปิ้ล จัดเป็นผลไม้ในหมวด Food & Fruits"
      },
      {
        id: "5-7",
        type: "matching",
        category: "mixed",
        categoryName: "Matching Challenge",
        question: "Connect words to their category! (โยงคำศัพท์ให้ถูกต้อง)",
        questionTh: "จับคู่กระเป๋านักเรียน หมวก และพยาบาล",
        pairs: [
          { left: "Schoolbag 🎒", right: "School Things", categoryKey: "school" },
          { left: "Hat 🧢", right: "Clothes", categoryKey: "clothes" },
          { left: "Nurse 👩‍⚕️", right: "Jobs", categoryKey: "jobs" }
        ],
        hint: "Schoolbag ใส่หนังสือ, Hat หมวกกันแดด, Nurse พยาบาลใจดี",
        explanation: "Schoolbag ➔ School Things | Hat ➔ Clothes | Nurse ➔ Jobs"
      },
      {
        id: "5-8",
        type: "choice",
        category: "school",
        categoryName: "School Things (อุปกรณ์การเรียน)",
        question: "What straight tool with inch and centimeter markings is used to measure length? 📏",
        questionTh: "อุปกรณ์เส้นตรงที่มีขีดบอกเซนติเมตรใช้สำหรับวัดความยาวและขีดเส้นคืออะไร?",
        options: [
          { text: "Ruler (ไม้บรรทัด)", isCorrect: true },
          { text: "Pencil (ดินสอ)", isCorrect: false },
          { text: "Eraser (ยางลบ)", isCorrect: false },
          { text: "Scissors (กรรไกร)", isCorrect: false }
        ],
        hint: "ใช้วางทาบลงบนกระดาษแล้วลากเส้นตรงตามแนวขอบ",
        explanation: "Ruler แปลว่า ไม้บรรทัด จัดอยู่ในหมวด School Things"
      },
      {
        id: "5-9",
        type: "choice",
        category: "jobs",
        categoryName: "Jobs (อาชีพ)",
        question: "Who works closely with doctors to take care of patients in the hospital? 👩‍⚕️",
        questionTh: "ใครทำงานร่วมกับคุณหมอเพื่อคอยดูแลและให้ยาผู้ป่วยในโรงพยาบาล?",
        options: [
          { text: "Nurse (พยาบาล)", isCorrect: true },
          { text: "Teacher (ครู)", isCorrect: false },
          { text: "Pilot (นักบิน)", isCorrect: false },
          { text: "Farmer (ชาวนา)", isCorrect: false }
        ],
        hint: "สวมชุดสีขาวหรือเครื่องแบบพยาบาล คอยวัดไข้และฉีดยา",
        explanation: "Nurse แปลว่า พยาบาล จัดเป็นอาชีพในหมวด Jobs"
      },
      {
        id: "5-10",
        type: "choice",
        category: "food",
        categoryName: "Food & Fruits (อาหารและผลไม้)",
        question: "Which word does NOT belong to the 'Food & Fruits 🍎' category? (ข้อใด 'ไม่ใช่' อาหาร)",
        questionTh: "คำศัพท์ข้อใด 'ไม่ได้' จัดอยู่ในหมวดหมู่อาหารและผลไม้?",
        options: [
          { text: "Pencil (ดินสอ)", isCorrect: true },
          { text: "Banana (กล้วย)", isCorrect: false },
          { text: "Apple (แอปเปิ้ล)", isCorrect: false },
          { text: "Rice (ข้าว)", isCorrect: false }
        ],
        hint: "มองหาแท่งไม้ไส้แกรไฟต์สำหรับเขียนหนังสือ ทานไม่ได้เด็ดขาด!",
        explanation: "Pencil แปลว่า ดินสอ เป็นอุปกรณ์การเรียน (School Things) จึงไม่ใช่อาหาร"
      }
    ]
  }
];

// -------------------------------------------------------------------------
// 4. RANK & SHIELD SYSTEM
// -------------------------------------------------------------------------
const RANKS = [
  { name: "เริ่มต้น", min: 0, max: 99, icon: "🛡️", badgeClass: "rank-badge-novice", titleEn: "Novice", desc: "นักสำรวจคำศัพท์มือใหม่" },
  { name: "ปกติ", min: 100, max: 299, icon: "🛡️", badgeClass: "rank-badge-adventurer", titleEn: "Adventurer", desc: "นักผจญภัยคล่องแคล่ว" },
  { name: "สุดยอด", min: 300, max: 599, icon: "🥇", badgeClass: "rank-badge-master", titleEn: "Master", desc: "ยอดฝีมือคำศัพท์แม่นยำ" },
  { name: "ตำนาน", min: 600, max: 999, icon: "💎", badgeClass: "rank-badge-legend", titleEn: "Legend", desc: "ผู้พิทักษ์หมวดหมู่ระดับตำนาน" },
  { name: "ปีลึก", min: 1000, max: 1499, icon: "🔥", badgeClass: "rank-badge-ancient", titleEn: "Ancient Grandmaster", desc: "จอมปราชญ์ภาษาอังกฤษขั้นสูง" },
  { name: "เก่ามาก", min: 1500, max: Infinity, icon: "👑", badgeClass: "rank-badge-mythic", titleEn: "Eternal Mythic", desc: "จักรพรรดิผู้รอบรู้ตลอดกาล" }
];

function getRankData(score) {
  const s = Number(score) || 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (s >= RANKS[i].min) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

// -------------------------------------------------------------------------
// 5. APPLICATION STATE
// -------------------------------------------------------------------------
const state = {
  currentUser: null,
  userHistory: [],
  leaderboard: [],
  lastPlayedSetIndex: -1,
  selectedSetPreference: 'auto', // 'auto' หรือ 0, 1, 2, 3, 4
  currentGame: {
    currentSetIndex: 0,
    setName: "ชุดที่ 1",
    questions: [],
    currentIndex: 0,
    answers: {}, // questionId: answer
    matchingState: {}, // questionId: { selectedLeft: null, pairs: {} }
    startTime: null
  },
  soundEnabled: true
};

// -------------------------------------------------------------------------
// 6. SYNTHESIZED SOUND EFFECTS ENGINE (Web Audio API)
// -------------------------------------------------------------------------
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type, duration, startTime = 0) {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  click() {
    this.playTone(600, 'sine', 0.08);
  }

  select() {
    this.playTone(750, 'sine', 0.12);
  }

  correct() {
    this.playTone(523.25, 'triangle', 0.1, 0);      // C5
    this.playTone(659.25, 'triangle', 0.1, 0.08);   // E5
    this.playTone(783.99, 'triangle', 0.2, 0.16);   // G5
    this.playTone(1046.50, 'triangle', 0.35, 0.24); // C6
  }

  error() {
    this.playTone(240, 'sawtooth', 0.15, 0);
    this.playTone(190, 'sawtooth', 0.25, 0.12);
  }

  hint() {
    this.playTone(880, 'sine', 0.15, 0);
    this.playTone(1100, 'sine', 0.25, 0.1);
  }

  celebrate() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.25, idx * 0.1);
    });
  }
}

const soundFX = new SoundFX();

// Text to Speech
function speakWord(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85; // slightly slower for Grade 3 kids
  window.speechSynthesis.speak(utterance);
}

// -------------------------------------------------------------------------
// 7. INITIALIZATION & ROUTING
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Check localStorage for saved session
  loadSavedUser();
  setupEventListeners();
  renderLessons();
  renderLeaderboard();
});

function loadSavedUser() {
  const savedUserJson = localStorage.getItem("english_grade3_user");
  if (savedUserJson) {
    try {
      state.currentUser = JSON.parse(savedUserJson);
      updateUserUI();
      fetchUserDataFromSheets(state.currentUser.fullName);
    } catch (e) {
      console.warn("Error reading stored user:", e);
    }
  }
}

function setupEventListeners() {
  // Sound toggle button
  const soundBtn = document.getElementById("btnSoundToggle");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      soundBtn.innerHTML = state.soundEnabled 
        ? `<i class="fa-solid fa-volume-high text-emerald-600"></i>` 
        : `<i class="fa-solid fa-volume-xmark text-rose-500"></i>`;
    });
  }
}

function switchView(viewName) {
  soundFX.click();
  const views = ["viewHome", "viewLessons", "viewGame", "viewSummary", "viewLeaderboard", "viewPlan"];
  views.forEach(v => {
    const el = document.getElementById(v);
    if (el) el.classList.add("hidden");
  });

  const active = document.getElementById(viewName);
  if (active) {
    active.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (viewName === "viewLeaderboard") {
    fetchLeaderboardFromSheets();
  }
}

// -------------------------------------------------------------------------
// 8. USER AUTHENTICATION & GOOGLE SHEETS SYNC
// -------------------------------------------------------------------------
function openLoginModal() {
  soundFX.click();
  document.getElementById("modalLogin").classList.remove("hidden");
  document.getElementById("inputFullName").focus();
}

function closeLoginModal() {
  document.getElementById("modalLogin").classList.add("hidden");
}

async function handleLoginOrRegister() {
  const nameInput = document.getElementById("inputFullName");
  const fullName = (nameInput.value || "").trim();

  if (!fullName) {
    alert("กรุณากรอกชื่อ-นามสกุล ของนักเรียนก่อนนะจ๊ะ");
    return;
  }

  soundFX.click();
  const loginBtn = document.getElementById("btnLoginSubmit");
  const originalBtnText = loginBtn.innerHTML;
  loginBtn.disabled = true;
  loginBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> กำลังตรวจสอบข้อมูล...`;

  try {
    // If SCRIPT_URL is provided and not default placeholder, communicate with Google Apps Script
    let remoteUserData = null;
    let remoteHistory = [];

    if (SCRIPT_URL && SCRIPT_URL !== "ใส่ลิงก์ของคุณที่นี่") {
      try {
        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "loginOrRegister",
            fullName: fullName
          })
        });
        const result = await response.json();
        if (result.status === "success") {
          remoteUserData = result.user;
          remoteHistory = result.history || [];
        }
      } catch (networkErr) {
        console.warn("GAS Connection failed, using local fallback:", networkErr);
      }
    }

    if (remoteUserData) {
      state.currentUser = remoteUserData;
      state.userHistory = remoteHistory;
    } else {
      // Local fallback mode
      let localUser = JSON.parse(localStorage.getItem(`user_${fullName}`) || "null");
      if (!localUser) {
        localUser = {
          fullName: fullName,
          totalScore: 0,
          gamesPlayed: 0,
          lastScore: 0,
          rank: "เริ่มต้น",
          createdAt: new Date().toISOString()
        };
      }
      state.currentUser = localUser;
      state.userHistory = JSON.parse(localStorage.getItem(`history_${fullName}`) || "[]");
    }

    // Persist session
    localStorage.setItem("english_grade3_user", JSON.stringify(state.currentUser));
    localStorage.setItem(`user_${fullName}`, JSON.stringify(state.currentUser));

    updateUserUI();
    closeLoginModal();
    soundFX.correct();

    // Show welcome toast
    showToast(`ยินดีต้อนรับ ${fullName}! พร้อมลุยคำศัพท์ภาษาอังกฤษหรือยัง? 🌟`, "success");

  } catch (err) {
    console.error("Login Error:", err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
  } finally {
    loginBtn.disabled = false;
    loginBtn.innerHTML = originalBtnText;
  }
}

async function fetchUserDataFromSheets(fullName) {
  if (!SCRIPT_URL || SCRIPT_URL === "ใส่ลิงก์ของคุณที่นี่") return;
  try {
    const url = `${SCRIPT_URL}?action=getUserProfile&fullName=${encodeURIComponent(fullName)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "success" && data.user) {
      state.currentUser = data.user;
      state.userHistory = data.history || [];
      localStorage.setItem("english_grade3_user", JSON.stringify(state.currentUser));
      updateUserUI();
    }
  } catch (e) {
    console.warn("Could not fetch remote user profile:", e);
  }
}

function handleLogout() {
  if (confirm("ต้องการออกจากระบบหรือไม่?")) {
    state.currentUser = null;
    state.userHistory = [];
    localStorage.removeItem("english_grade3_user");
    updateUserUI();
    showToast("ออกจากระบบเรียบร้อยแล้ว", "info");
  }
}

function updateUserUI() {
  const unauthHeader = document.getElementById("headerUnauth");
  const authHeader = document.getElementById("headerAuth");
  const homeBannerGuest = document.getElementById("homeBannerGuest");
  const homeBannerUser = document.getElementById("homeBannerUser");

  if (state.currentUser) {
    unauthHeader.classList.add("hidden");
    authHeader.classList.remove("hidden");
    homeBannerGuest.classList.add("hidden");
    homeBannerUser.classList.remove("hidden");

    const rank = getRankData(state.currentUser.totalScore);

    // Update names and rank badges
    document.querySelectorAll(".user-name-display").forEach(el => el.textContent = state.currentUser.fullName);
    document.querySelectorAll(".user-score-display").forEach(el => el.textContent = state.currentUser.totalScore.toLocaleString());
    document.querySelectorAll(".user-games-display").forEach(el => el.textContent = state.currentUser.gamesPlayed || 0);
    document.querySelectorAll(".user-last-display").forEach(el => el.textContent = state.currentUser.lastScore || 0);

    // Shield badges
    const shieldIcons = document.querySelectorAll(".user-rank-shield");
    shieldIcons.forEach(el => {
      el.textContent = rank.icon;
    });

    const rankTitles = document.querySelectorAll(".user-rank-title");
    rankTitles.forEach(el => {
      el.textContent = rank.name;
      el.className = `user-rank-title px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${rank.badgeClass}`;
    });

    // XP Progress Bar to next rank
    updateProgressBar(state.currentUser.totalScore);

  } else {
    unauthHeader.classList.remove("hidden");
    authHeader.classList.add("hidden");
    homeBannerGuest.classList.remove("hidden");
    homeBannerUser.classList.add("hidden");
  }
}

function updateProgressBar(score) {
  const currentRank = getRankData(score);
  const nextRank = RANKS.find(r => r.min > currentRank.min);
  const progressBar = document.getElementById("userXpProgress");
  const progressText = document.getElementById("userXpText");

  if (!progressBar || !progressText) return;

  if (nextRank) {
    const range = nextRank.min - currentRank.min;
    const progress = Math.min(score - currentRank.min, range);
    const percent = Math.round((progress / range) * 100);
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${score} / ${nextRank.min} คะแนน (อีก ${nextRank.min - score} คะแนน จะได้ยศ "${nextRank.name} ${nextRank.icon}")`;
  } else {
    progressBar.style.width = "100%";
    progressText.textContent = `คะแนนสะสม ${score} (ถึงระดับสูงสุด "${currentRank.name} ${currentRank.icon}" แล้ว! 🎉)`;
  }
}

// -------------------------------------------------------------------------
// 9. LESSONS & LEARNING MATERIALS (สื่อการสอน)
// -------------------------------------------------------------------------
function renderLessons(filter = "all") {
  const container = document.getElementById("lessonsCardsContainer");
  if (!container) return;

  container.innerHTML = "";

  Object.values(CATEGORIES_DATA).forEach(category => {
    if (filter !== "all" && category.id !== filter) return;

    const catCard = document.createElement("div");
    catCard.className = "bg-white rounded-3xl p-6 shadow-md border-2 border-slate-100 hover:shadow-xl transition-all";
    catCard.id = `lesson-cat-${category.id}`;

    let wordsHtml = category.words.map(w => `
      <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition-colors">
        <div class="flex items-center gap-3">
          <span class="text-3xl">${w.emoji}</span>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-800 text-lg">${w.en}</span>
              <span class="text-xs text-slate-400 font-mono">${w.phonetics}</span>
            </div>
            <div class="text-sm text-slate-600">${w.th} <span class="text-xs text-emerald-600">(${w.sound})</span></div>
          </div>
        </div>
        <button onclick="speakWord('${w.en}')" class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center justify-center transition-all shadow-sm active:scale-90" title="ฟังการออกเสียง">
          <i class="fa-solid fa-volume-high text-sm"></i>
        </button>
      </div>
    `).join("");

    catCard.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center text-3xl shadow-md">
            ${category.icon}
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-800">${category.nameEn}</h3>
            <p class="text-sm text-slate-500 font-medium">หมวด: ${category.nameTh}</p>
          </div>
        </div>
        <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
          ${category.words.length} คำศัพท์
        </span>
      </div>

      <p class="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
        ${category.description}
      </p>

      <div class="mb-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5">
        <i class="fa-solid fa-lightbulb text-amber-500 mt-1 text-sm"></i>
        <div class="text-xs text-amber-800 leading-relaxed">
          <strong class="font-bold">เคล็ดลับการจำ (Trick):</strong> ${category.trick}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        ${wordsHtml}
      </div>
    `;

    container.appendChild(catCard);
  });
}

function filterLessons(categoryId) {
  soundFX.click();
  document.querySelectorAll(".lesson-tab-btn").forEach(btn => {
    btn.className = "lesson-tab-btn px-4 py-2 rounded-2xl font-bold text-sm bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all";
  });
  const activeBtn = document.getElementById(`tab-${categoryId}`);
  if (activeBtn) {
    activeBtn.className = "lesson-tab-btn px-4 py-2 rounded-2xl font-bold text-sm bg-emerald-600 text-white shadow-md transition-all";
  }
  renderLessons(categoryId);
}

// -------------------------------------------------------------------------
// 10. GAME ENGINE (Multiple Choice & Drag/Click Matching)
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// 10. GAME ENGINE (5 Sets, Random Question Order, Shuffled Choices & Matching)
// -------------------------------------------------------------------------
function selectQuestionSet(setVal) {
  state.selectedSetPreference = setVal; // 'auto' หรือ '0', '1', '2', '3', '4'
  soundFX.click();
  
  // Highlight active selector in UI
  document.querySelectorAll(".btn-set-choice").forEach(btn => {
    btn.classList.remove("ring-4", "ring-emerald-400", "bg-emerald-100", "font-black");
    btn.classList.add("bg-white", "text-slate-700");
  });
  
  const activeBtn = document.getElementById(`btnSetSelect-${setVal}`);
  if (activeBtn) {
    activeBtn.classList.remove("bg-white", "text-slate-700");
    activeBtn.classList.add("ring-4", "ring-emerald-400", "bg-emerald-100", "font-black", "text-emerald-900");
  }
}

function startGame(chosenSet = null) {
  if (!state.currentUser) {
    alert("กรุณาลงชื่อเข้าสู่ระบบก่อนเริ่มเล่นเกมเพื่อบันทึกคะแนนสะสมนะจ๊ะ 😊");
    openLoginModal();
    return;
  }

  soundFX.click();

  // 1. กำหนดชุดคำถาม (1 จาก 5 ชุด)
  let setIndex = 0;
  if (chosenSet !== null && chosenSet !== undefined && chosenSet !== "auto") {
    setIndex = Number(chosenSet);
  } else if (state.selectedSetPreference && state.selectedSetPreference !== "auto") {
    setIndex = Number(state.selectedSetPreference);
  } else {
    // สุ่มชุดคำถามที่ไม่ซ้ำกับรอบที่แล้ว เพื่อให้โจทย์ไม่ซ้ำกันในแต่ละรอบ!
    const availableSets = [0, 1, 2, 3, 4].filter(idx => idx !== state.lastPlayedSetIndex);
    setIndex = availableSets[Math.floor(Math.random() * availableSets.length)];
  }

  state.lastPlayedSetIndex = setIndex;
  try {
    localStorage.setItem("english_grade3_last_set", setIndex);
  } catch(e){}

  const selectedSetData = QUESTION_SETS[setIndex];

  // 2. คัดลอกคำถาม 10 ข้อในชุดนั้น
  let rawQuestions = JSON.parse(JSON.stringify(selectedSetData.questions));

  // 3. สลับลำดับคำถามในรอบนั้น (Fisher-Yates) เพื่อให้โจทย์ไม่เรียงซ้ำเดิม
  rawQuestions = shuffleArray(rawQuestions);

  // 4. สลับตัวเลือกคำตอบถูก-ผิด (Options) ในแต่ละข้อ เพื่อให้ตำแหน่งข้อถูกสลับที่ ไม่ซ้ำตำแหน่งเดิมในแต่ละรอบ!
  rawQuestions.forEach((q, idx) => {
    q.roundOrder = idx + 1; // ลำดับ 1 - 10
    if (q.type === "choice") {
      q.options = shuffleArray(q.options);
    } else if (q.type === "matching") {
      // สลับตำแหน่งคอลัมน์ฝั่งขวา (Category) เพื่อไม่ให้ตรงกับฝั่งซ้ายแบบตายตัว
      q.shuffledRightItems = shuffleArray(q.pairs.map(p => p.right));
    }
  });

  state.currentGame = {
    currentSetIndex: setIndex,
    setName: selectedSetData.name,
    questions: rawQuestions,
    currentIndex: 0,
    answers: {},
    matchingState: {},
    startTime: new Date()
  };

  // เตรียม State สำหรับข้อสอบประเภทโยงจับคู่
  state.currentGame.questions.forEach(q => {
    if (q.type === "matching") {
      state.currentGame.matchingState[q.id] = {
        selectedLeft: null,
        pairs: {}
      };
    }
  });

  // อัปเดตข้อมูลชุดคำถามบนแถบหัวเกม
  const setBadgeEl = document.getElementById("gameSetBadge");
  if (setBadgeEl) {
    setBadgeEl.textContent = `ชุดที่ ${setIndex + 1}/5 (สลับข้อถูก)`;
    setBadgeEl.title = selectedSetData.name;
  }

  renderQuestionNav();
  loadQuestion(0);
  switchView("viewGame");
}

function renderQuestionNav() {
  const container = document.getElementById("questionNavPills");
  if (!container) return;
  container.innerHTML = "";

  state.currentGame.questions.forEach((q, idx) => {
    const isAnswered = isQuestionAnswered(q.id);
    const isCurrent = idx === state.currentGame.currentIndex;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
      isCurrent 
        ? "bg-blue-600 text-white shadow-md ring-4 ring-blue-200 scale-105" 
        : isAnswered 
        ? "bg-emerald-500 text-white hover:bg-emerald-600" 
        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
    }`;
    btn.innerHTML = isAnswered && !isCurrent ? `<i class="fa-solid fa-check text-xs"></i>` : `${idx + 1}`;
    btn.title = `ข้อที่ ${idx + 1} (${isAnswered ? "ตอบแล้ว" : "ยังไม่ตอบ"})`;
    btn.onclick = () => {
      soundFX.click();
      loadQuestion(idx);
    };
    container.appendChild(btn);
  });
}

function isQuestionAnswered(qId) {
  const q = state.currentGame.questions.find(item => item.id === qId);
  if (!q) return false;

  if (q.type === "choice") {
    return state.currentGame.answers[qId] !== undefined;
  } else if (q.type === "matching") {
    const matchedPairs = state.currentGame.matchingState[qId]?.pairs || {};
    return Object.keys(matchedPairs).length === q.pairs.length;
  }
  return false;
}

function loadQuestion(index) {
  if (index < 0 || index >= state.currentGame.questions.length) return;
  state.currentGame.currentIndex = index;

  const q = state.currentGame.questions[index];

  // อัปเดตตัวเลขแสดงผลบนหัวข้อ
  document.getElementById("gameCurrentQNumber").textContent = index + 1;
  document.getElementById("gameTotalQNumber").textContent = state.currentGame.questions.length;
  document.getElementById("gameCategoryBadge").textContent = q.categoryName;
  
  const setBadgeEl = document.getElementById("gameSetBadge");
  if (setBadgeEl) {
    setBadgeEl.textContent = `ชุดที่ ${state.currentGame.currentSetIndex + 1}/5 (สลับข้อถูก)`;
  }

  // Toggle Next / Submit buttons
  const isLast = index === state.currentGame.questions.length - 1;
  const btnNext = document.getElementById("btnNextQuestion");
  const btnSubmit = document.getElementById("btnSubmitGame");

  if (isLast) {
    btnNext.classList.add("hidden");
    btnSubmit.classList.remove("hidden");
  } else {
    btnNext.classList.remove("hidden");
    btnSubmit.classList.add("hidden");
  }

  // Back button disabled on index 0
  document.getElementById("btnPrevQuestion").disabled = (index === 0);

  // Render question content
  if (q.type === "choice") {
    renderChoiceQuestion(q);
  } else if (q.type === "matching") {
    renderMatchingQuestion(q);
  }

  // Close hint box if open
  hideHintBox();
  renderQuestionNav();
}

function renderChoiceQuestion(q) {
  const card = document.getElementById("gameQuestionCard");
  const selectedAnswer = state.currentGame.answers[q.id];

  let optionsHtml = q.options.map((opt, optIdx) => {
    const isSelected = selectedAnswer === optIdx;
    return `
      <div onclick="selectChoiceOption('${q.id}', ${optIdx})" 
           class="choice-card p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-all ${isSelected ? 'selected' : 'bg-white'}">
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-xl font-bold flex items-center justify-center text-sm ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}">
            ${String.fromCharCode(65 + optIdx)}
          </span>
          <span class="font-bold text-slate-800 text-lg">${opt.text}</span>
        </div>
        ${isSelected ? `<i class="fa-solid fa-circle-check text-blue-600 text-xl"></i>` : `<i class="fa-regular fa-circle text-slate-300 text-xl"></i>`}
      </div>
    `;
  }).join("");

  card.innerHTML = `
    <div class="mb-4">
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wide">
          <i class="fa-solid fa-circle-question"></i> แบบทดสอบเลือกตอบ (Multiple Choice)
        </div>
        <span class="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
          🔀 ตัวเลือกสลับตำแหน่งทุกรอบ
        </span>
      </div>
      <h2 class="text-2xl font-bold text-slate-900 mb-2 font-display">${q.question}</h2>
      <p class="text-sm text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        🇹🇭 ${q.questionTh}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
      ${optionsHtml}
    </div>
  `;
}

function selectChoiceOption(qId, optIdx) {
  soundFX.select();
  state.currentGame.answers[qId] = optIdx;
  loadQuestion(state.currentGame.currentIndex);
}

function renderMatchingQuestion(q) {
  const card = document.getElementById("gameQuestionCard");
  const mState = state.currentGame.matchingState[q.id];
  const matchedPairs = mState.pairs; // leftText -> rightCategory

  // Left items (Words)
  const leftItems = q.pairs.map(p => {
    const isMatched = matchedPairs[p.left] !== undefined;
    const isSelected = mState.selectedLeft === p.left;
    return `
      <div onclick="handleMatchLeftClick('${q.id}', '${p.left}')"
           class="match-item p-4 rounded-2xl border-2 font-bold text-slate-800 flex items-center justify-between ${
             isMatched 
               ? 'matched' 
               : isSelected 
               ? 'active-source' 
               : 'bg-white border-slate-200'
           }">
        <span>${p.left}</span>
        ${isMatched ? `<i class="fa-solid fa-check-circle text-emerald-600"></i>` : `<i class="fa-solid fa-link text-slate-300 text-sm"></i>`}
      </div>
    `;
  }).join("");

  // Right items (Categories) - ใช้รายการที่สลับตำแหน่งแล้ว เพื่อไม่ให้ตรงกับข้อซ้ายมือ
  const rightList = q.shuffledRightItems || q.pairs.map(p => p.right);
  const rightItems = rightList.map(rightCategory => {
    // Check if matched
    const matchedKey = Object.keys(matchedPairs).find(k => matchedPairs[k] === rightCategory);
    return `
      <div onclick="handleMatchRightClick('${q.id}', '${rightCategory}')"
           class="match-item p-4 rounded-2xl border-2 font-bold text-slate-800 flex items-center justify-between ${
             matchedKey 
               ? 'matched' 
               : 'bg-white border-slate-200'
           }">
        <span>${rightCategory}</span>
        ${matchedKey ? `<span class="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-normal">คู่กับ: ${matchedKey}</span>` : `<i class="fa-solid fa-arrow-right text-slate-300 text-sm"></i>`}
      </div>
    `;
  }).join("");

  card.innerHTML = `
    <div class="mb-4">
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wide">
          <i class="fa-solid fa-shuffle"></i> เกมโยงจับคู่คำศัพท์ (Matching Connect)
        </div>
        <span class="text-[11px] bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">
          🔀 หมวดหมู่สลับตำแหน่งทุกรอบ
        </span>
      </div>
      <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2 font-display">${q.question}</h2>
      <p class="text-sm text-slate-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
        💡 <strong>วิธีเล่น:</strong> คลิกเลือกคำศัพท์ในช่องซ้าย ➔ แล้วคลิกหมวดหมู่ในช่องขวาที่สอดคล้องกัน
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="space-y-3">
        <div class="text-xs font-bold text-slate-500 uppercase">1. เลือกคำศัพท์ (Vocabulary)</div>
        ${leftItems}
      </div>
      <div class="space-y-3">
        <div class="text-xs font-bold text-slate-500 uppercase">2. เลือกหมวดหมู่ (Category)</div>
        ${rightItems}
      </div>
    </div>
  `;
}

function handleMatchLeftClick(qId, leftText) {
  soundFX.click();
  const mState = state.currentGame.matchingState[qId];
  if (mState.pairs[leftText]) {
    // Unmatch if clicked again
    delete mState.pairs[leftText];
    mState.selectedLeft = null;
  } else {
    mState.selectedLeft = leftText;
  }
  loadQuestion(state.currentGame.currentIndex);
}

function handleMatchRightClick(qId, rightCategory) {
  const mState = state.currentGame.matchingState[qId];
  if (!mState.selectedLeft) {
    alert("กรุณาคลิกเลือกคำศัพท์ทางซ้ายมือก่อนนะจ๊ะ");
    return;
  }

  // Remove any previous match to this rightCategory
  Object.keys(mState.pairs).forEach(k => {
    if (mState.pairs[k] === rightCategory) {
      delete mState.pairs[k];
    }
  });

  mState.pairs[mState.selectedLeft] = rightCategory;
  mState.selectedLeft = null;
  soundFX.select();
  loadQuestion(state.currentGame.currentIndex);
}

// -------------------------------------------------------------------------
// 11. CONTROLS: NEXT, BACK, HINT, CANCEL & COMPLETION CHECK
// -------------------------------------------------------------------------
function nextQuestion() {
  soundFX.click();
  if (state.currentGame.currentIndex < state.currentGame.questions.length - 1) {
    loadQuestion(state.currentGame.currentIndex + 1);
  }
}

function prevQuestion() {
  soundFX.click();
  if (state.currentGame.currentIndex > 0) {
    loadQuestion(state.currentGame.currentIndex - 1);
  }
}

function toggleHint() {
  soundFX.hint();
  const hintBox = document.getElementById("gameHintContainer");
  const q = state.currentGame.questions[state.currentGame.currentIndex];

  if (hintBox.classList.contains("hidden")) {
    document.getElementById("gameHintText").textContent = q.hint || "ลองสังเกตคำแปลและลักษณะของสิ่งนั้นดูนะ!";
    hintBox.classList.remove("hidden");
  } else {
    hintBox.classList.add("hidden");
  }
}

function hideHintBox() {
  const hintBox = document.getElementById("gameHintContainer");
  if (hintBox) hintBox.classList.add("hidden");
}

// Cancel Game Dialog
function openCancelDialog() {
  soundFX.click();
  document.getElementById("modalCancelGame").classList.remove("hidden");
}

function closeCancelDialog() {
  soundFX.click();
  document.getElementById("modalCancelGame").classList.add("hidden");
}

function confirmCancelGame() {
  soundFX.click();
  closeCancelDialog();
  switchView("viewHome");
  showToast("ยกเลิกการเล่นเกมแล้ว คะแนนรอบนี้จะไม่ถูกบันทึก", "info");
}

// System Check: Ensure all questions are answered
function validateAndSubmitGame() {
  soundFX.click();
  const unansweredIndices = [];

  state.currentGame.questions.forEach((q, idx) => {
    if (!isQuestionAnswered(q.id)) {
      unansweredIndices.push(idx);
    }
  });

  // If there are missed questions, auto jump to the first missed question!
  if (unansweredIndices.length > 0) {
    soundFX.error();
    const firstMissed = unansweredIndices[0];
    const missedNumbers = unansweredIndices.map(i => i + 1).join(", ");

    // Show friendly alert dialog
    document.getElementById("unansweredListText").textContent = `ข้อที่ยังไม่ได้ตอบ: ${missedNumbers}`;
    document.getElementById("modalUnansweredAlert").classList.remove("hidden");

    // Auto navigate upon closing or button click
    window.autoJumpIndex = firstMissed;
    return;
  }

  // All completed! Submit game
  finishGame();
}

function handleJumpToUnanswered() {
  soundFX.click();
  document.getElementById("modalUnansweredAlert").classList.add("hidden");
  if (window.autoJumpIndex !== undefined) {
    loadQuestion(window.autoJumpIndex);
  }
}

// -------------------------------------------------------------------------
// 12. SUMMARY, ANALYSIS & RECOMMENDATION ENGINE
// -------------------------------------------------------------------------
async function finishGame() {
  soundFX.celebrate();

  let score = 0;
  const mistakes = [];
  const weakCategoriesMap = {};

  state.currentGame.questions.forEach(q => {
    if (q.type === "choice") {
      const userChoiceIdx = state.currentGame.answers[q.id];
      const correctChoice = q.options.find(o => o.isCorrect);
      const isCorrect = userChoiceIdx !== undefined && q.options[userChoiceIdx]?.isCorrect;

      if (isCorrect) {
        score++;
      } else {
        mistakes.push({
          questionId: q.id,
          question: q.question,
          userAnswer: userChoiceIdx !== undefined ? q.options[userChoiceIdx].text : "ไม่ได้ตอบ",
          correctAnswer: correctChoice ? correctChoice.text : "",
          category: q.category,
          categoryName: q.categoryName,
          explanation: q.explanation
        });
        weakCategoriesMap[q.category] = (weakCategoriesMap[q.category] || 0) + 1;
      }
    } else if (q.type === "matching") {
      const userPairs = state.currentGame.matchingState[q.id]?.pairs || {};
      let allPairsCorrect = true;

      q.pairs.forEach(p => {
        if (userPairs[p.left] !== p.right) {
          allPairsCorrect = false;
        }
      });

      if (allPairsCorrect) {
        score++;
      } else {
        mistakes.push({
          questionId: q.id,
          question: q.question,
          userAnswer: "จับคู่ไม่ถูกต้องครบทุกคู่",
          correctAnswer: q.explanation,
          category: q.category,
          categoryName: q.categoryName,
          explanation: q.explanation
        });
        weakCategoriesMap[q.category] = (weakCategoriesMap[q.category] || 0) + 1;
      }
    }
  });

  const totalQuestions = state.currentGame.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const weakCategoriesList = Object.keys(weakCategoriesMap);

  // Compare with previous attempt
  const previousLastScore = state.currentUser ? (state.currentUser.lastScore || 0) : 0;
  const scoreDiff = score - previousLastScore;

  // Render Result Summary View
  renderSummaryUI(score, totalQuestions, percentage, previousLastScore, scoreDiff, mistakes, weakCategoriesList);

  // Switch to summary view
  switchView("viewSummary");

  // Save to Google Apps Script & localStorage
  saveGameResults(score, totalQuestions, mistakes.length, weakCategoriesList);
}

function renderSummaryUI(score, total, percentage, prevScore, scoreDiff, mistakes, weakCategories) {
  document.getElementById("summaryScoreDisplay").textContent = `${score} / ${total}`;
  document.getElementById("summaryPercentDisplay").textContent = `${percentage}%`;

  const setNameBadge = document.getElementById("summarySetNameBadge");
  if (setNameBadge) {
    setNameBadge.textContent = state.currentGame.setName || `ชุดที่ ${state.currentGame.currentSetIndex + 1}`;
  }

  // Star rating
  let starsHtml = "";
  if (score >= 9) starsHtml = "⭐⭐⭐ ยอดเยี่ยมที่สุด!";
  else if (score >= 6) starsHtml = "⭐⭐ ดีมาก เก่งจังเลย!";
  else starsHtml = "⭐ สู้ๆ นะ ฝึกฝนอีกนิดเก่งแน่นอน!";
  document.getElementById("summaryStarsDisplay").textContent = starsHtml;

  // Comparison with previous score
  const compEl = document.getElementById("summaryComparisonCard");
  let compText = "";
  let compClass = "";

  if (state.currentUser && state.currentUser.gamesPlayed > 0) {
    if (scoreDiff > 0) {
      compText = `📈 <strong>มีพัฒนาการยอดเยี่ยม!</strong> ทำได้ดีกว่ารอบที่แล้ว +${scoreDiff} คะแนน (ครั้งก่อน: ${prevScore} | ครั้งนี้: ${score})`;
      compClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
    } else if (scoreDiff === 0) {
      compText = `🎯 <strong>คงความเก่งสม่ำเสมอ!</strong> ได้คะแนนเท่ากับครั้งก่อน (${score} คะแนน) ทบทวนอีกนิดจะได้คะแนนเต็มนะ`;
      compClass = "bg-blue-50 text-blue-800 border-blue-200";
    } else {
      compText = `💡 <strong>สู้ต่อไปนะ!</strong> คะแนนครั้งนี้น้อยกว่ารอบที่แล้ว ${Math.abs(scoreDiff)} คะแนน แวะไปดูข้อที่ผิดแล้วทบทวนกันใหม่นะ`;
      compClass = "bg-amber-50 text-amber-800 border-amber-200";
    }
  } else {
    compText = `🎉 <strong>ยินดีด้วยกับการเล่นรอบแรก!</strong> เริ่มต้นได้ยอดเยี่ยมมาก คะแนนรอบแรกบันทึกไว้แล้ว`;
    compClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
  }

  compEl.innerHTML = compText;
  compEl.className = `p-4 rounded-2xl border text-sm leading-relaxed ${compClass}`;

  // Recommendations & Mistakes Breakdown
  const mistakesContainer = document.getElementById("summaryMistakesList");
  const recoSection = document.getElementById("summaryRecommendations");

  if (mistakes.length === 0) {
    mistakesContainer.innerHTML = `
      <div class="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
        <div class="text-4xl mb-2">🎉🏆✨</div>
        <h4 class="font-bold text-emerald-800 text-lg">ยินดีด้วย! น้องตอบถูกครบทุกข้อ ไม่มีข้อผิดเลย</h4>
        <p class="text-sm text-emerald-600 mt-1">น้องมีความเข้าใจเรื่องหมวดหมู่คำศัพท์ภาษาอังกฤษระดับยอดเยี่ยมมาก!</p>
      </div>
    `;
    recoSection.classList.add("hidden");
  } else {
    recoSection.classList.remove("hidden");

    // Recommendations with Direct Lesson Links
    const recoContainer = document.getElementById("recommendationLinksList");
    recoContainer.innerHTML = weakCategories.map(catKey => {
      const cat = CATEGORIES_DATA[catKey] || { nameTh: catKey, nameEn: catKey, icon: "📚" };
      return `
        <div class="p-4 rounded-2xl bg-white border-2 border-amber-200 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${cat.icon}</span>
            <div>
              <div class="font-bold text-slate-800">หมวดหมู่: ${cat.nameEn} (${cat.nameTh})</div>
              <p class="text-xs text-slate-500">มีข้อผิดพลาดในหมวดหมู่นี้ ควรกลับไปทบทวนคำศัพท์</p>
            </div>
          </div>
          <button onclick="goToLessonTopic('${catKey}')" class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all">
            <span>ทบทวนเรื่องนี้</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;
    }).join("");

    // Mistakes List
    mistakesContainer.innerHTML = mistakes.map((m, idx) => `
      <div class="p-4 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
            ข้อผิดพลาดที่ ${idx + 1} (${m.categoryName})
          </span>
        </div>
        <p class="font-bold text-slate-800 text-sm">${m.question}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div class="p-2 rounded-xl bg-rose-50 text-rose-800 border border-rose-100">
            ❌ <strong>คำตอบของน้อง:</strong> ${m.userAnswer}
          </div>
          <div class="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
            ✅ <strong>คำตอบที่ถูกต้อง:</strong> ${m.correctAnswer}
          </div>
        </div>
        <div class="text-xs text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
          💡 <strong>คำอธิบาย:</strong> ${m.explanation}
        </div>
      </div>
    `).join("");
  }
}

function goToLessonTopic(categoryKey) {
  soundFX.click();
  switchView("viewLessons");
  filterLessons(categoryKey);
  const target = document.getElementById(`lesson-cat-${categoryKey}`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

async function saveGameResults(score, total, mistakesCount, weakCategories) {
  if (!state.currentUser) return;

  const fullName = state.currentUser.fullName;
  const newTotalScore = (state.currentUser.totalScore || 0) + score;
  const newGamesPlayed = (state.currentUser.gamesPlayed || 0) + 1;
  const newRank = getRankData(newTotalScore).name;

  // Update local state
  state.currentUser.totalScore = newTotalScore;
  state.currentUser.gamesPlayed = newGamesPlayed;
  state.currentUser.lastScore = score;
  state.currentUser.rank = newRank;

  localStorage.setItem("english_grade3_user", JSON.stringify(state.currentUser));
  localStorage.setItem(`user_${fullName}`, JSON.stringify(state.currentUser));

  updateUserUI();

  // Save to Google Apps Script
  if (SCRIPT_URL && SCRIPT_URL !== "ใส่ลิงก์ของคุณที่นี่") {
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "saveGameResult",
          fullName: fullName,
          score: score,
          totalQuestions: total,
          gameMode: state.currentGame.setName || `ชุดที่ ${state.currentGame.currentSetIndex + 1}`,
          mistakesCount: mistakesCount,
          weakCategories: weakCategories
        })
      });
      console.log("Game result successfully synced to Google Sheets!");
    } catch (e) {
      console.warn("GAS save failed:", e);
    }
  }
}

// -------------------------------------------------------------------------
// 13. LEADERBOARD & RANKS DISPLAY
// -------------------------------------------------------------------------
async function fetchLeaderboardFromSheets() {
  const container = document.getElementById("leaderboardList");
  if (!container) return;

  container.innerHTML = `
    <div class="p-8 text-center text-slate-400">
      <i class="fa-solid fa-spinner fa-spin text-2xl mb-2 text-emerald-500"></i>
      <p class="text-sm">กำลังโหลดข้อมูลกระดานผู้นำจาก Google Sheets...</p>
    </div>
  `;

  let leaderboardData = [];

  if (SCRIPT_URL && SCRIPT_URL !== "ใส่ลิงก์ของคุณที่นี่") {
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getLeaderboard`);
      const json = await res.json();
      if (json.status === "success" && json.leaderboard) {
        leaderboardData = json.leaderboard;
      }
    } catch (e) {
      console.warn("Could not fetch remote leaderboard:", e);
    }
  }

  // Fallback to sample data + current user if empty
  if (!leaderboardData || leaderboardData.length === 0) {
    leaderboardData = getSampleLeaderboard();
    if (state.currentUser) {
      const existingIdx = leaderboardData.findIndex(u => u.fullName.toLowerCase() === state.currentUser.fullName.toLowerCase());
      if (existingIdx >= 0) {
        leaderboardData[existingIdx] = state.currentUser;
      } else {
        leaderboardData.push(state.currentUser);
      }
      leaderboardData.sort((a, b) => b.totalScore - a.totalScore);
    }
  }

  state.leaderboard = leaderboardData;
  renderLeaderboard();
}

function getSampleLeaderboard() {
  return [
    { fullName: "ด.ช. พงศกร มุ่งมั่น", totalScore: 1650, gamesPlayed: 25, rank: "เก่ามาก" },
    { fullName: "ด.ญ. ปณิดา รักเรียน", totalScore: 1120, gamesPlayed: 18, rank: "ปีลึก" },
    { fullName: "ด.ช. ภูริพัฒน์ ยอดเยี่ยม", totalScore: 780, gamesPlayed: 12, rank: "ตำนาน" },
    { fullName: "ด.ญ. กานต์พิชชา สายขยัน", totalScore: 450, gamesPlayed: 8, rank: "สุดยอด" },
    { fullName: "ด.ช. ธนกฤต แสงสว่าง", totalScore: 230, gamesPlayed: 4, rank: "ปกติ" },
    { fullName: "ด.ญ. ชัญญา ชูใจ", totalScore: 80, gamesPlayed: 2, rank: "เริ่มต้น" }
  ];
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboardList");
  if (!container) return;

  const data = state.leaderboard.length > 0 ? state.leaderboard : getSampleLeaderboard();

  container.innerHTML = data.map((item, idx) => {
    const isMe = state.currentUser && (state.currentUser.fullName.toLowerCase() === item.fullName.toLowerCase());
    const rankInfo = getRankData(item.totalScore);

    let medalIcon = `<span class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-sm">${idx + 1}</span>`;
    if (idx === 0) medalIcon = `<span class="w-8 h-8 rounded-full bg-amber-400 text-white font-bold flex items-center justify-center text-sm shadow-md">🥇</span>`;
    else if (idx === 1) medalIcon = `<span class="w-8 h-8 rounded-full bg-slate-300 text-white font-bold flex items-center justify-center text-sm shadow-md">🥈</span>`;
    else if (idx === 2) medalIcon = `<span class="w-8 h-8 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-sm shadow-md">🥉</span>`;

    return `
      <div class="flex items-center justify-between p-4 rounded-2xl transition-all ${
        isMe 
          ? "bg-blue-50 border-2 border-blue-400 shadow-md transform scale-[1.01]" 
          : "bg-white border border-slate-100 hover:border-slate-200"
      }">
        <div class="flex items-center gap-3">
          ${medalIcon}
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-800 ${isMe ? 'text-blue-900' : ''}">${item.fullName}</span>
              ${isMe ? `<span class="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">ฉัน</span>` : ''}
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <span class="px-2 py-0.5 rounded-full ${rankInfo.badgeClass} text-white font-bold text-[10px]">
                ${rankInfo.icon} ${rankInfo.name}
              </span>
              <span>เล่นแล้ว: ${item.gamesPlayed || 0} รอบ</span>
            </div>
          </div>
        </div>

        <div class="text-right">
          <div class="text-xl font-black text-slate-800 font-display">
            ${Number(item.totalScore || 0).toLocaleString()}
          </div>
          <div class="text-[11px] text-slate-400 font-medium">คะแนนสะสม</div>
        </div>
      </div>
    `;
  }).join("");
}

// -------------------------------------------------------------------------
// 14. TOAST NOTIFICATIONS
// -------------------------------------------------------------------------
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  const bg = type === "success" ? "bg-emerald-600" : type === "warning" ? "bg-amber-600" : "bg-slate-800";
  toast.className = `fixed bottom-6 right-6 ${bg} text-white px-5 py-3 rounded-2xl shadow-xl z-50 text-sm font-bold flex items-center gap-2.5 animate-bounce`;
  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
