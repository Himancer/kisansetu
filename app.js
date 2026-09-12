/* KisanSetu: browser-only, free and privacy-first prototype. */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const SUPPORTED = ["en", "hi", "kn"];

let lang = SUPPORTED.includes(localStorage.getItem("kisansetu_lang"))
  ? localStorage.getItem("kisansetu_lang")
  : "en";
let regionId = localStorage.getItem("kisansetu_region") || "karnataka";
let slide = 0;
let carouselPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let carouselTimer;

const T = {
  en: {
    appTitle: "KisanSetu — Your farm, one trusted companion",
    freeTools: "100% free farmer tools", authHeadline: "Your farm, understood.",
    authCopy: "Plan, protect, sell and record each crop decision in the language you use at home.",
    welcome: "Welcome to KisanSetu", authLead: "Enter your name to begin. Your profile stays only in this browser.",
    farmerName: "Farmer name", nameHint: "e.g. Savitha", continue: "Continue",
    noCost: "No paid feature, card or subscription required.", signout: "Sign out",
    today: "Today", crops: "My crops", benefits: "Benefits & updates", knowledge: "Kisan Gyan",
    services: "Farm services", diary: "Farm diary", profileMeta: "1.6 acres · Tomato",
    location: "Farm location", language: "Language", todaySub: "Here is what your farm needs today.",
    askVoice: "Ask by voice", heroTitle: "Better daily decisions, from seed to sale.",
    heroCopy: "Weather, crop planning, official benefits and simple farm records—built around your location.",
    weatherChip: "Live weather", benefitChip: "Official benefits", languageChip: "Your language",
    carouselLabel1: "Today’s decision", carouselLabel2: "Benefit finder", carouselTitle2: "See schemes for your state.",
    carouselText2: "Choose your location to view official farmer services.", carouselLabel3: "Low-cost practice",
    carouselTitle3: "Start with a soil test.", carouselText3: "It helps avoid unnecessary input costs and improves planning.",
    previousSlide: "Previous card", nextSlide: "Next card", actToday: "ACT TODAY", weather: "Weather",
    loadingWeather: "Loading free live forecast…", cropHealth: "Tomato health", healthGood: "Good",
    healthDetail: "Next scan due in 2 days", farmPlan: "Farm plan", acres: "acres",
    farmPlanDetail: "Tomato · growth stage", seasonJourney: "Tomato season journey", journeyHint: "Day 47 of 110",
    sow: "Sow", done: "Done", grow: "Grow", now: "Now", protect: "Protect", harvest: "Harvest",
    protectDate: "Sep 13", harvestDate: "Oct 10", marketHint: "Better selling decision",
    marketSub: "Compare net value, not only price.", sampleMarketTitle: "Sample market comparison",
    sampleMarketLine: "Illustrative only — check your state mandi portal", transportOptionTitle: "Transport-aware choice",
    transportOptionLine: "Include distance and handling cost", illustrative: "Demo", quickActions: "Do more, without leaving the farm",
    scan: "Scan crop issue", scanSub: "Safe photo guidance", findBenefits: "Find benefits", benefitsSub: "Official state links",
    bookService: "Find a service", serviceSub: "Nearby support", addRecord: "Add a record", recordSub: "Keep a farm history",
    cropsSub: "Simple decisions based on your field.", tomatoTitle: "Tomato · 1.6 acres",
    tomatoInfo: "Hybrid variety · Sown July 24 · Growth stage", soilType: "Soil type", alluvial: "Alluvial",
    black: "Black (regur)", red: "Red", laterite: "Laterite", sandy: "Sandy / arid", clayey: "Clayey",
    season: "Season", kharif: "Kharif (monsoon)", rabi: "Rabi (winter)", zaid: "Zaid (summer)",
    irrigation: "Irrigation available?", yes: "Yes", no: "No (rain-fed)", land: "Land size (acres)",
    recommend: "Get crop plan", advisorSafety: "Planning support only. Verify fertiliser doses and plant-protection choices with a soil test and a local agriculture officer before spending money.",
    scanHint: "Choose a leaf photo for a safe prototype review. It stays on this device.", choosePhoto: "Choose photo",
    benefitsPageSub: "Verified Government of India and state portals tailored to your selected location.",
    nationalBenefits: "Government of India", benefitNote: "Always confirm eligibility, deadlines and documents on the official website. KisanSetu never asks for Aadhaar, bank or scheme-login details.",
    knowledgeSub: "Seed knowledge and low-cost practices in one place.", seedKnowledge: "Seed knowledge", wasteManure: "Home-waste manure",
    servicesSub: "Find the support your farm needs.", sprayer: "Sprayer rental", sprayerSub: "Compare nearby providers",
    soilTest: "Soil test", soilTestSub: "Use verified local labs", storage: "Cold storage", storageSub: "Plan storage capacity",
    fpo: "Find an FPO", fpoSub: "Sell collectively", diarySub: "Keep useful field notes on this device.",
    footer: "Free, privacy-first farmer tools. Prototype information is not a substitute for local expert advice.",
    nameRequired: "Please enter your name.", photoSafe: "Photo selected. This prototype does not diagnose a pest or prescribe treatment. Please consult a verified agriculture officer before applying any input.",
    statePortal: "Open the official state portal for current services, notices and scheme details.",
    nationalPortal: "Open the official Government of India portal for current scheme information.", official: "Official portal",
    lastVerified: "Curated links, last checked 12 September 2026.", stateBenefits: "State benefits & services",
    stateService: "Official state service", governmentIndia: "Government of India", feelsLike: "feels like", rainChance: "rain chance",
    voiceUnsupported: "Voice input is unavailable in this browser. You can use the crop planner instead.", voiceListening: "Listening…",
    recordPrompt: "What would you like to record?", recordAdded: "Record added to your diary.", noRecords: "No records yet.",
    serviceMessage: "This demo helps you plan. Connect a verified local provider before booking or paying.",
    planHeading: "Suggested crop plan", planNote: "These are suitability ideas, not guaranteed recommendations. Confirm locally before planting.",
    rainAction: "Rain is likely soon—avoid spraying until conditions are safe.", normalAction: "Conditions look stable. Check your crop and irrigation plan today.",
    heatAction: "High heat expected—check irrigation and mulch before midday.", weatherOffline: "Offline forecast shown. Refresh when you are online.",
    pauseCarousel: "Pause carousel", resumeCarousel: "Resume carousel", diaryDialogTitle: "Add a farm record", diaryRecordLabel: "What happened on your farm?",
    diaryRecordHint: "e.g. Irrigated the tomato plot", cancel: "Cancel", saveRecord: "Save record", landRequired: "Enter a land size of at least 0.1 acre."
  },
  hi: {
    appTitle: "किसानसेतु — आपके खेत का भरोसेमंद साथी", freeTools: "100% निःशुल्क किसान उपकरण",
    authHeadline: "आपके खेत को समझने वाला साथी।", authCopy: "अपनी भाषा में हर फसल के फैसले की योजना बनाएं, बचाएं, बेचें और दर्ज करें।",
    welcome: "किसानसेतु में आपका स्वागत है", authLead: "शुरू करने के लिए अपना नाम दर्ज करें। आपका प्रोफ़ाइल केवल इस ब्राउज़र में रहता है।",
    farmerName: "किसान का नाम", nameHint: "जैसे सविता", continue: "आगे बढ़ें", noCost: "कोई भुगतान, कार्ड या सदस्यता नहीं।", signout: "साइन आउट",
    today: "आज", crops: "मेरी फसलें", benefits: "लाभ और अपडेट", knowledge: "किसान ज्ञान", services: "कृषि सेवाएं", diary: "फार्म डायरी",
    profileMeta: "1.6 एकड़ · टमाटर", location: "खेत का स्थान", language: "भाषा", todaySub: "आज आपके खेत के लिए जरूरी जानकारी।",
    askVoice: "बोलकर पूछें", heroTitle: "बीज से बिक्री तक बेहतर दैनिक फैसले।", heroCopy: "मौसम, फसल योजना, सरकारी लाभ और खेत रिकॉर्ड—आपके स्थान के अनुसार।",
    weatherChip: "लाइव मौसम", benefitChip: "सरकारी लाभ", languageChip: "आपकी भाषा", carouselLabel1: "आज का फैसला",
    carouselLabel2: "लाभ खोजें", carouselTitle2: "अपने राज्य की योजनाएं देखें।", carouselText2: "सरकारी किसान सेवाएं देखने के लिए स्थान चुनें।",
    carouselLabel3: "कम लागत अभ्यास", carouselTitle3: "मिट्टी परीक्षण से शुरुआत करें।", carouselText3: "यह अनावश्यक खर्च कम कर योजना सुधारता है।",
    previousSlide: "पिछला कार्ड", nextSlide: "अगला कार्ड", actToday: "आज करें", weather: "मौसम", loadingWeather: "मुफ्त लाइव मौसम लोड हो रहा है…",
    cropHealth: "टमाटर स्वास्थ्य", healthGood: "अच्छा", healthDetail: "अगला स्कैन 2 दिन में", farmPlan: "खेत योजना", acres: "एकड़",
    farmPlanDetail: "टमाटर · वृद्धि अवस्था", seasonJourney: "टमाटर फसल यात्रा", journeyHint: "110 में से दिन 47",
    sow: "बुआई", done: "पूर्ण", grow: "वृद्धि", now: "अभी", protect: "सुरक्षा", harvest: "कटाई", protectDate: "13 सित.", harvestDate: "10 अक्तू.",
    marketHint: "बेहतर बिक्री फैसला", marketSub: "केवल भाव नहीं, शुद्ध मूल्य तुलना करें।", sampleMarketTitle: "नमूना बाजार तुलना",
    sampleMarketLine: "केवल उदाहरण — अपने राज्य के मंडी पोर्टल पर जांचें", transportOptionTitle: "परिवहन सहित विकल्प",
    transportOptionLine: "दूरी और संभाल लागत शामिल करें", illustrative: "डेमो", quickActions: "खेत छोड़े बिना और करें",
    scan: "फसल समस्या जांचें", scanSub: "सुरक्षित फोटो मार्गदर्शन", findBenefits: "लाभ खोजें", benefitsSub: "आधिकारिक राज्य लिंक",
    bookService: "सेवा खोजें", serviceSub: "नजदीकी सहायता", addRecord: "रिकॉर्ड जोड़ें", recordSub: "खेत का इतिहास रखें",
    cropsSub: "आपके खेत पर आधारित सरल फैसले।", tomatoTitle: "टमाटर · 1.6 एकड़", tomatoInfo: "हाइब्रिड किस्म · 24 जुलाई बोवाई · वृद्धि अवस्था",
    soilType: "मिट्टी का प्रकार", alluvial: "जलोढ़", black: "काली (रेगुर)", red: "लाल", laterite: "लैटराइट", sandy: "रेतीली / शुष्क", clayey: "चिकनी",
    season: "मौसम", kharif: "खरीफ (मानसून)", rabi: "रबी (सर्दी)", zaid: "जायद (गर्मी)", irrigation: "सिंचाई उपलब्ध है?", yes: "हाँ", no: "नहीं (वर्षा आधारित)", land: "जमीन (एकड़)",
    recommend: "फसल योजना पाएं", advisorSafety: "यह केवल योजना सहायता है। खर्च या उपयोग से पहले मिट्टी परीक्षण और स्थानीय कृषि अधिकारी से खाद एवं सुरक्षा सलाह की पुष्टि करें।",
    scanHint: "सुरक्षित प्रोटोटाइप समीक्षा के लिए पत्ती की फोटो चुनें। यह इसी डिवाइस पर रहती है।", choosePhoto: "फोटो चुनें",
    benefitsPageSub: "आपके चुने हुए स्थान के लिए सत्यापित भारत सरकार और राज्य पोर्टल।", nationalBenefits: "भारत सरकार",
    benefitNote: "पात्रता, तारीख और दस्तावेज हमेशा आधिकारिक वेबसाइट पर जांचें। किसानसेतु कभी आधार, बैंक या योजना लॉगिन विवरण नहीं मांगता।",
    knowledgeSub: "एक ही जगह बीज ज्ञान और कम लागत के तरीके।", seedKnowledge: "बीज ज्ञान", wasteManure: "घरेलू कचरा खाद",
    servicesSub: "अपने खेत के लिए आवश्यक सहायता पाएं।", sprayer: "स्प्रेयर किराया", sprayerSub: "नजदीकी प्रदाता तुलना करें",
    soilTest: "मिट्टी परीक्षण", soilTestSub: "सत्यापित स्थानीय प्रयोगशाला", storage: "कोल्ड स्टोरेज", storageSub: "भंडारण योजना बनाएं", fpo: "FPO खोजें", fpoSub: "सामूहिक बिक्री करें",
    diarySub: "इस डिवाइस पर उपयोगी खेत नोट्स रखें।", footer: "मुफ्त, गोपनीयता-आधारित किसान उपकरण। प्रोटोटाइप जानकारी स्थानीय विशेषज्ञ सलाह का विकल्प नहीं है।",
    nameRequired: "कृपया अपना नाम दर्ज करें।", photoSafe: "फोटो चुनी गई। यह प्रोटोटाइप कीट या रोग का निदान अथवा उपचार नहीं बताता। कोई भी इनपुट लगाने से पहले सत्यापित कृषि अधिकारी से सलाह लें।",
    statePortal: "वर्तमान सेवाओं, नोटिस और योजना विवरण के लिए आधिकारिक राज्य पोर्टल खोलें।", nationalPortal: "वर्तमान योजना जानकारी के लिए भारत सरकार का आधिकारिक पोर्टल खोलें।",
    official: "आधिकारिक पोर्टल", lastVerified: "क्यूरेटेड लिंक, अंतिम जांच 12 सितंबर 2026।", stateBenefits: "राज्य लाभ और सेवाएं",
    stateService: "आधिकारिक राज्य सेवा", governmentIndia: "भारत सरकार", feelsLike: "जैसा महसूस", rainChance: "बारिश की संभावना",
    voiceUnsupported: "इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। आप फसल योजनाकार का उपयोग कर सकते हैं।", voiceListening: "सुन रहा है…",
    recordPrompt: "आप क्या दर्ज करना चाहते हैं?", recordAdded: "रिकॉर्ड फार्म डायरी में जोड़ दिया गया।", noRecords: "अभी तक कोई रिकॉर्ड नहीं।",
    serviceMessage: "यह डेमो योजना में मदद करता है। बुकिंग या भुगतान से पहले सत्यापित स्थानीय प्रदाता से संपर्क करें।",
    planHeading: "सुझाई गई फसल योजना", planNote: "ये उपयुक्तता के विचार हैं, गारंटी नहीं। बुआई से पहले स्थानीय पुष्टि करें।",
    rainAction: "जल्द बारिश की संभावना है—स्थिति सुरक्षित होने तक छिड़काव से बचें।", normalAction: "स्थिति स्थिर है। आज फसल और सिंचाई योजना जांचें।",
    heatAction: "तेज गर्मी अपेक्षित है—दोपहर से पहले सिंचाई और मल्च जांचें।", weatherOffline: "ऑफलाइन पूर्वानुमान दिख रहा है। ऑनलाइन होने पर रिफ्रेश करें।",
    pauseCarousel: "कार्ड बदलना रोकें", resumeCarousel: "कार्ड बदलना शुरू करें", diaryDialogTitle: "खेत का रिकॉर्ड जोड़ें", diaryRecordLabel: "आपके खेत में क्या हुआ?",
    diaryRecordHint: "जैसे टमाटर की क्यारी में सिंचाई की", cancel: "रद्द करें", saveRecord: "रिकॉर्ड सहेजें", landRequired: "कम से कम 0.1 एकड़ जमीन दर्ज करें।"
  },
  kn: {
    appTitle: "ಕಿಸಾನ್‌ಸೇತು — ನಿಮ್ಮ ಹೊಲದ ವಿಶ್ವಾಸಾರ್ಹ ಸಂಗಾತಿ", freeTools: "100% ಉಚಿತ ರೈತ ಸಾಧನಗಳು",
    authHeadline: "ನಿಮ್ಮ ಹೊಲವನ್ನು ಅರಿಯುವ ಸಂಗಾತಿ.", authCopy: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಬೆಳೆ ನಿರ್ಧಾರವನ್ನು ಯೋಜಿಸಿ, ರಕ್ಷಿಸಿ, ಮಾರಾಟ ಮಾಡಿ ಮತ್ತು ದಾಖಲಿಸಿ.",
    welcome: "ಕಿಸಾನ್‌ಸೇತುವಿಗೆ ಸ್ವಾಗತ", authLead: "ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ. ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಈ ಬ್ರೌಸರ್‌ನಲ್ಲೇ ಉಳಿಯುತ್ತದೆ.",
    farmerName: "ರೈತರ ಹೆಸರು", nameHint: "ಉದಾ. ಸವಿತಾ", continue: "ಮುಂದುವರಿಸಿ", noCost: "ಯಾವುದೇ ಪಾವತಿ, ಕಾರ್ಡ್ ಅಥವಾ ಚಂದಾದಾರಿಕೆ ಬೇಡ.", signout: "ಸೈನ್ ಔಟ್",
    today: "ಇಂದು", crops: "ನನ್ನ ಬೆಳೆಗಳು", benefits: "ಸೌಲಭ್ಯಗಳು ಮತ್ತು ನವೀಕರಣಗಳು", knowledge: "ಕಿಸಾನ್ ಜ್ಞಾನ", services: "ಕೃಷಿ ಸೇವೆಗಳು", diary: "ಕೃಷಿ ದಿನಚರಿ",
    profileMeta: "1.6 ಎಕರೆ · ಟೊಮೆಟೊ", location: "ಹೊಲದ ಸ್ಥಳ", language: "ಭಾಷೆ", todaySub: "ಇಂದು ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಬೇಕಾದ ಮಾಹಿತಿ ಇಲ್ಲಿದೆ.",
    askVoice: "ಧ್ವನಿಯಿಂದ ಕೇಳಿ", heroTitle: "ಬೀಜದಿಂದ ಮಾರಾಟದವರೆಗೆ ಉತ್ತಮ ದೈನಂದಿನ ನಿರ್ಧಾರಗಳು.", heroCopy: "ಹವಾಮಾನ, ಬೆಳೆ ಯೋಜನೆ, ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಹೊಲದ ದಾಖಲೆಗಳು—ನಿಮ್ಮ ಸ್ಥಳಕ್ಕೆ ಅನುಗುಣವಾಗಿ.",
    weatherChip: "ಲೈವ್ ಹವಾಮಾನ", benefitChip: "ಸರ್ಕಾರಿ ಸೌಲಭ್ಯ", languageChip: "ನಿಮ್ಮ ಭಾಷೆ", carouselLabel1: "ಇಂದಿನ ನಿರ್ಧಾರ",
    carouselLabel2: "ಸೌಲಭ್ಯ ಹುಡುಕಾಟ", carouselTitle2: "ನಿಮ್ಮ ರಾಜ್ಯದ ಯೋಜನೆಗಳನ್ನು ನೋಡಿ.", carouselText2: "ಸರ್ಕಾರಿ ರೈತ ಸೇವೆಗಳನ್ನು ನೋಡಲು ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ.",
    carouselLabel3: "ಕಡಿಮೆ ವೆಚ್ಚದ ಅಭ್ಯಾಸ", carouselTitle3: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ.", carouselText3: "ಇದು ಅನಗತ್ಯ ವೆಚ್ಚ ಕಡಿಮೆ ಮಾಡಿ ಯೋಜನೆಯನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.",
    previousSlide: "ಹಿಂದಿನ ಕಾರ್ಡ್", nextSlide: "ಮುಂದಿನ ಕಾರ್ಡ್", actToday: "ಇಂದು ಮಾಡಿ", weather: "ಹವಾಮಾನ", loadingWeather: "ಉಚಿತ ಲೈವ್ ಮುನ್ಸೂಚನೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ…",
    cropHealth: "ಟೊಮೆಟೊ ಆರೋಗ್ಯ", healthGood: "ಚೆನ್ನಾಗಿದೆ", healthDetail: "ಮುಂದಿನ ಸ್ಕ್ಯಾನ್ 2 ದಿನಗಳಲ್ಲಿ", farmPlan: "ಹೊಲ ಯೋಜನೆ", acres: "ಎಕರೆ",
    farmPlanDetail: "ಟೊಮೆಟೊ · ಬೆಳವಣಿಗೆಯ ಹಂತ", seasonJourney: "ಟೊಮೆಟೊ ಬೆಳೆ ಪಯಣ", journeyHint: "110 ರಲ್ಲಿ ದಿನ 47",
    sow: "ಬಿತ್ತನೆ", done: "ಮುಗಿದಿದೆ", grow: "ಬೆಳವಣಿಗೆ", now: "ಈಗ", protect: "ರಕ್ಷಣೆ", harvest: "ಕೊಯ್ಲು", protectDate: "ಸೆಪ್. 13", harvestDate: "ಅಕ್ಟೋ. 10",
    marketHint: "ಉತ್ತಮ ಮಾರಾಟ ನಿರ್ಧಾರ", marketSub: "ಬೆಲೆ ಮಾತ್ರವಲ್ಲ, ನಿವ್ವಳ ಮೌಲ್ಯ ಹೋಲಿಸಿ.", sampleMarketTitle: "ಮಾದರಿ ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ",
    sampleMarketLine: "ಮಾದರಿಗಾಗಿ ಮಾತ್ರ — ನಿಮ್ಮ ರಾಜ್ಯದ ಮಂಡಿ ಪೋರ್ಟಲ್ ಪರಿಶೀಲಿಸಿ", transportOptionTitle: "ಸಾಗಣೆ-ಸಹಿತ ಆಯ್ಕೆ",
    transportOptionLine: "ದೂರ ಮತ್ತು ನಿರ್ವಹಣಾ ವೆಚ್ಚ ಸೇರಿಸಿ", illustrative: "ಡೆಮೋ", quickActions: "ಹೊಲ ಬಿಡದೆ ಇನ್ನಷ್ಟು ಮಾಡಿ",
    scan: "ಬೆಳೆ ಸಮಸ್ಯೆ ಪರಿಶೀಲಿಸಿ", scanSub: "ಸುರಕ್ಷಿತ ಫೋಟೋ ಮಾರ್ಗದರ್ಶನ", findBenefits: "ಸೌಲಭ್ಯ ಹುಡುಕಿ", benefitsSub: "ಅಧಿಕೃತ ರಾಜ್ಯ ಲಿಂಕ್‌ಗಳು",
    bookService: "ಸೇವೆ ಹುಡುಕಿ", serviceSub: "ಹತ್ತಿರದ ನೆರವು", addRecord: "ದಾಖಲೆ ಸೇರಿಸಿ", recordSub: "ಹೊಲದ ಇತಿಹಾಸ ಉಳಿಸಿ",
    cropsSub: "ನಿಮ್ಮ ಹೊಲದ ಆಧಾರದ ಮೇಲೆ ಸರಳ ನಿರ್ಧಾರಗಳು.", tomatoTitle: "ಟೊಮೆಟೊ · 1.6 ಎಕರೆ", tomatoInfo: "ಹೈಬ್ರಿಡ್ ತಳಿ · ಜುಲೈ 24 ಬಿತ್ತನೆ · ಬೆಳವಣಿಗೆಯ ಹಂತ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ", alluvial: "ಮೆಕ್ಕಲು", black: "ಕಪ್ಪು (ರೆಗುರ)", red: "ಕೆಂಪು", laterite: "ಲ್ಯಾಟರೈಟ್", sandy: "ಮರಳು / ಶುಷ್ಕ", clayey: "ಜೇಡಿಮಣ್ಣು",
    season: "ಋತು", kharif: "ಖರೀಫ್ (ಮಳೆ)", rabi: "ರಬಿ (ಚಳಿ)", zaid: "ಜೈದ್ (ಬೇಸಿಗೆ)", irrigation: "ನೀರಾವರಿ ಲಭ್ಯವಿದೆಯೇ?", yes: "ಹೌದು", no: "ಇಲ್ಲ (ಮಳೆ ಆಧಾರಿತ)", land: "ಜಮೀನು (ಎಕರೆ)",
    recommend: "ಬೆಳೆ ಯೋಜನೆ ಪಡೆಯಿರಿ", advisorSafety: "ಇದು ಕೇವಲ ಯೋಜನಾ ನೆರವು. ವೆಚ್ಚ ಅಥವಾ ಬಳಕೆಗೆ ಮುನ್ನ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮತ್ತು ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯಿಂದ ಗೊಬ್ಬರ ಮತ್ತು ರಕ್ಷಣೆ ಸಲಹೆ ದೃಢೀಕರಿಸಿ.",
    scanHint: "ಸುರಕ್ಷಿತ ಪ್ರೋಟೋಟೈಪ್ ಪರಿಶೀಲನೆಗಾಗಿ ಎಲೆಯ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ. ಇದು ಈ ಸಾಧನದಲ್ಲೇ ಉಳಿಯುತ್ತದೆ.", choosePhoto: "ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
    benefitsPageSub: "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಸ್ಥಳಕ್ಕೆ ಹೊಂದುವ ಪರಿಶೀಲಿತ ಭಾರತ ಸರ್ಕಾರ ಮತ್ತು ರಾಜ್ಯ ಪೋರ್ಟಲ್‌ಗಳು.", nationalBenefits: "ಭಾರತ ಸರ್ಕಾರ",
    benefitNote: "ಅರ್ಹತೆ, ದಿನಾಂಕ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಯಾವಾಗಲೂ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ. ಕಿಸಾನ್‌ಸೇತು ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಅಥವಾ ಯೋಜನೆ ಲಾಗಿನ್ ವಿವರ ಕೇಳುವುದಿಲ್ಲ.",
    knowledgeSub: "ಬೀಜ ಜ್ಞಾನ ಮತ್ತು ಕಡಿಮೆ ವೆಚ್ಚದ ವಿಧಾನಗಳು ಒಂದೇ ಕಡೆ.", seedKnowledge: "ಬೀಜ ಜ್ಞಾನ", wasteManure: "ಮನೆಯ ತ್ಯಾಜ್ಯ ಗೊಬ್ಬರ",
    servicesSub: "ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಅಗತ್ಯ ನೆರವು ಹುಡುಕಿ.", sprayer: "ಸ್ಪ್ರೇಯರ್ ಬಾಡಿಗೆ", sprayerSub: "ಹತ್ತಿರದ ಪೂರೈಕೆದಾರರನ್ನು ಹೋಲಿಸಿ",
    soilTest: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ", soilTestSub: "ಪರಿಶೀಲಿತ ಸ್ಥಳೀಯ ಪ್ರಯೋಗಾಲಯ", storage: "ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್", storageSub: "ಶೇಖರಣಾ ಯೋಜನೆ ಮಾಡಿ", fpo: "FPO ಹುಡುಕಿ", fpoSub: "ಒಟ್ಟಾಗಿ ಮಾರಾಟ ಮಾಡಿ",
    diarySub: "ಈ ಸಾಧನದಲ್ಲಿ ಉಪಯುಕ್ತ ಹೊಲದ ಟಿಪ್ಪಣಿಗಳನ್ನು ಉಳಿಸಿ.", footer: "ಉಚಿತ, ಗೌಪ್ಯತೆ-ಮೊದಲ ರೈತ ಸಾಧನಗಳು. ಪ್ರೋಟೋಟೈಪ್ ಮಾಹಿತಿ ಸ್ಥಳೀಯ ತಜ್ಞರ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.",
    nameRequired: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.", photoSafe: "ಫೋಟೋ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ. ಈ ಪ್ರೋಟೋಟೈಪ್ ಕೀಟ ಅಥವಾ ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚುವುದಿಲ್ಲ ಮತ್ತು ಚಿಕಿತ್ಸೆಯನ್ನು ಸೂಚಿಸುವುದಿಲ್ಲ. ಯಾವುದೇ ಇನ್‌ಪುಟ್ ಬಳಸುವ ಮೊದಲು ಪರಿಶೀಲಿತ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    statePortal: "ಪ್ರಸ್ತುತ ಸೇವೆಗಳು, ಸೂಚನೆಗಳು ಮತ್ತು ಯೋಜನೆ ವಿವರಗಳಿಗಾಗಿ ಅಧಿಕೃತ ರಾಜ್ಯ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ.", nationalPortal: "ಪ್ರಸ್ತುತ ಯೋಜನೆ ಮಾಹಿತಿಗಾಗಿ ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ.",
    official: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್", lastVerified: "ಆಯ್ದ ಲಿಂಕ್‌ಗಳು, ಕೊನೆಯ ಪರಿಶೀಲನೆ 12 ಸೆಪ್ಟೆಂಬರ್ 2026.", stateBenefits: "ರಾಜ್ಯ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸೇವೆಗಳು",
    stateService: "ಅಧಿಕೃತ ರಾಜ್ಯ ಸೇವೆ", governmentIndia: "ಭಾರತ ಸರ್ಕಾರ", feelsLike: "ಅನಿಸುತ್ತದೆ", rainChance: "ಮಳೆ ಸಾಧ್ಯತೆ",
    voiceUnsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಲಭ್ಯವಿಲ್ಲ. ನೀವು ಬೆಳೆ ಯೋಜಕವನ್ನು ಬಳಸಬಹುದು.", voiceListening: "ಆಲಿಸುತ್ತಿದೆ…",
    recordPrompt: "ನೀವು ಏನನ್ನು ದಾಖಲಿಸಲು ಬಯಸುತ್ತೀರಿ?", recordAdded: "ದಾಖಲೆಯನ್ನು ಕೃಷಿ ದಿನಚರಿಗೆ ಸೇರಿಸಲಾಗಿದೆ.", noRecords: "ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆಗಳಿಲ್ಲ.",
    serviceMessage: "ಈ ಡೆಮೋ ಯೋಜನೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಬುಕಿಂಗ್ ಅಥವಾ ಪಾವತಿಗೆ ಮುನ್ನ ಪರಿಶೀಲಿತ ಸ್ಥಳೀಯ ಪೂರೈಕೆದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    planHeading: "ಸೂಚಿಸಲಾದ ಬೆಳೆ ಯೋಜನೆ", planNote: "ಇವು ಹೊಂದಾಣಿಕೆಯ ಕಲ್ಪನೆಗಳು, ಖಾತರಿ ಅಲ್ಲ. ಬಿತ್ತನೆಗೂ ಮುನ್ನ ಸ್ಥಳೀಯ ದೃಢೀಕರಣ ಪಡೆಯಿರಿ.",
    rainAction: "ಶೀಘ್ರದಲ್ಲೇ ಮಳೆ ಸಾಧ್ಯತೆ ಇದೆ—ಪರಿಸ್ಥಿತಿ ಸುರಕ್ಷಿತವಾಗುವವರೆಗೆ ಸಿಂಪಡಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ.", normalAction: "ಪರಿಸ್ಥಿತಿ ಸ್ಥಿರವಾಗಿದೆ. ಇಂದು ಬೆಳೆ ಮತ್ತು ನೀರಾವರಿ ಯೋಜನೆ ಪರಿಶೀಲಿಸಿ.",
    heatAction: "ತೀವ್ರ ಬಿಸಿಲು ನಿರೀಕ್ಷೆ—ಮಧ್ಯಾಹ್ನದ ಮೊದಲು ನೀರಾವರಿ ಮತ್ತು ಮಲ್ಚ್ ಪರಿಶೀಲಿಸಿ.", weatherOffline: "ಆಫ್‌ಲೈನ್ ಮುನ್ಸೂಚನೆ ತೋರಿಸಲಾಗಿದೆ. ಆನ್‌ಲೈನ್ ಆದಾಗ ರಿಫ್ರೆಶ್ ಮಾಡಿ.",
    pauseCarousel: "ಕಾರ್ಡ್ ಬದಲಾವಣೆ ನಿಲ್ಲಿಸಿ", resumeCarousel: "ಕಾರ್ಡ್ ಬದಲಾವಣೆ ಪ್ರಾರಂಭಿಸಿ", diaryDialogTitle: "ಹೊಲದ ದಾಖಲೆ ಸೇರಿಸಿ", diaryRecordLabel: "ನಿಮ್ಮ ಹೊಲದಲ್ಲಿ ಏನಾಯಿತು?",
    diaryRecordHint: "ಉದಾ. ಟೊಮೆಟೊ ಪ್ಲಾಟ್‌ಗೆ ನೀರು ಹಾಕಿದೆ", cancel: "ರದ್ದುಮಾಡಿ", saveRecord: "ದಾಖಲೆ ಉಳಿಸಿ", landRequired: "ಕನಿಷ್ಠ 0.1 ಎಕರೆ ಜಮೀನು ನಮೂದಿಸಿ."
  }
};

const REGIONS = {
  karnataka: { name: { en: "Hesaraghatta, Karnataka", hi: "हेसरघट्टा, कर्नाटक", kn: "ಹೆಸರಘಟ್ಟ, ಕರ್ನಾಟಕ" }, state: { en: "Karnataka", hi: "कर्नाटक", kn: "ಕರ್ನಾಟಕ" }, emoji: "🌿", lat: 13.13, lon: 77.48 },
  punjab: { name: { en: "Ludhiana, Punjab", hi: "लुधियाना, पंजाब", kn: "ಲುಧಿಯಾನಾ, ಪಂಜಾಬ್" }, state: { en: "Punjab", hi: "पंजाब", kn: "ಪಂಜಾಬ್" }, emoji: "🌾", lat: 30.9, lon: 75.85 },
  uttar_pradesh: { name: { en: "Lucknow, Uttar Pradesh", hi: "लखनऊ, उत्तर प्रदेश", kn: "ಲಖನೌ, ಉತ್ತರ ಪ್ರದೇಶ" }, state: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश", kn: "ಉತ್ತರ ಪ್ರದೇಶ" }, emoji: "🌱", lat: 26.85, lon: 80.95 },
  maharashtra: { name: { en: "Nagpur, Maharashtra", hi: "नागपुर, महाराष्ट्र", kn: "ನಾಗಪುರ, ಮಹಾರಾಷ್ಟ್ರ" }, state: { en: "Maharashtra", hi: "महाराष्ट्र", kn: "ಮಹಾರಾಷ್ಟ್ರ" }, emoji: "🍊", lat: 21.15, lon: 79.09 },
  west_bengal: { name: { en: "Bardhaman, West Bengal", hi: "बर्धमान, पश्चिम बंगाल", kn: "ಬರ್ಧಮಾನ, ಪಶ್ಚಿಮ ಬಂಗಾಳ" }, state: { en: "West Bengal", hi: "पश्चिम बंगाल", kn: "ಪಶ್ಚಿಮ ಬಂಗಾಳ" }, emoji: "🌾", lat: 23.24, lon: 87.86 },
  tamil_nadu: { name: { en: "Coimbatore, Tamil Nadu", hi: "कोयंबटूर, तमिलनाडु", kn: "ಕೊಯಮತ್ತೂರು, ತಮಿಳುನಾಡು" }, state: { en: "Tamil Nadu", hi: "तमिलनाडु", kn: "ತಮಿಳುನಾಡು" }, emoji: "🌴", lat: 11, lon: 76.96 },
  rajasthan: { name: { en: "Jodhpur, Rajasthan", hi: "जोधपुर, राजस्थान", kn: "ಜೋಧಪುರ, ರಾಜಸ್ಥಾನ" }, state: { en: "Rajasthan", hi: "राजस्थान", kn: "ರಾಜಸ್ಥಾನ" }, emoji: "☀️", lat: 26.24, lon: 73.02 }
};

const STATE_BENEFITS = {
  karnataka: [["Raita Mitra", "https://raitamitra.karnataka.gov.in/"], ["FRUITS", "https://fruitspmk.karnataka.gov.in/"], ["Samrakshane", "https://samrakshane.karnataka.gov.in/"], ["Krishi Marata Vahini", "https://krishimaratavahini.karnataka.gov.in/"]],
  punjab: [["Punjab Agriculture Department", "https://punjab.gov.in/government/departments/department-of-agriculture/"], ["e-Mandikaran Punjab", "https://www.emandikaran-pb.in/"], ["Punjab Mandi Board", "https://mandiboard.nic.in/"]],
  uttar_pradesh: [["AgriDarshan Uttar Pradesh", "https://agridarshan.up.gov.in/"], ["Nand Baba Dugdh Mission", "https://www.nandbabadugdhmission.up.gov.in/"]],
  maharashtra: [["MahaDBT Farmer", "https://mahadbt.maharashtra.gov.in/Farmer/AgriLogin/AgriLogin"], ["Maharashtra Agriculture Department", "https://krishi.maharashtra.gov.in/"]],
  west_bengal: [["West Bengal Agriculture Department", "https://agriculture.wb.gov.in/"], ["Krishak Bandhu", "https://krishakbandhu.wb.gov.in/"], ["Bangla Sahayata Kendra", "https://bsk.wb.gov.in/scheme_bsk/"]],
  tamil_nadu: [["Uzhavan", "https://www.tnagrisnet.tn.gov.in/people_app/dashboard/main/en"], ["Tamil Nadu Agrisnet", "https://www.tnagrisnet.tn.gov.in/home/schemes/"], ["Tamil Mannvalam", "https://tnagrisnet.tn.gov.in/mannvalam/welcome/downloads"]],
  rajasthan: [["Raj Kisan", "https://rajkisan.rajasthan.gov.in/"], ["Jan Soochna Agriculture", "https://jansoochna.rajasthan.gov.in/Scheme/Index?departmentId=105"], ["Jan Aadhaar", "https://janaadhaar.rajasthan.gov.in/content/raj/janaadhaar/en/performance-dashboard/jan-aadhaar-services1.html"]]
};

const NATIONAL = [
  ["PM-KISAN", "https://pmkisan.gov.in/"],
  ["PM Fasal Bima Yojana", "https://pmfby.gov.in/"],
  ["Farmers’ Portal", "https://www.india.gov.in/category/agriculture-rural-environment/subcategory/research-marketing/details/farmers-portal"],
  ["Soil Health Card", "https://soilhealth.dac.gov.in/"]
];

const CROP_RULES = {
  alluvial: { kharif: ["rice", "maize", "sugarcane"], rabi: ["wheat", "mustard", "chickpea"], zaid: ["moong", "cucumber"] },
  black: { kharif: ["cotton", "soybean", "pigeonPea"], rabi: ["sorghum", "safflower", "wheat"], zaid: ["groundnut"] },
  red: { kharif: ["groundnut", "ragi", "pigeonPea"], rabi: ["sunflower", "chickpea"], zaid: ["sesame"] },
  laterite: { kharif: ["cashew", "paddy"], rabi: ["horseGram"], zaid: ["okra"] },
  sandy: { kharif: ["bajra", "mothBean"], rabi: ["mustard", "barley"], zaid: ["watermelon"] },
  clayey: { kharif: ["rice", "jute"], rabi: ["wheat", "lentil"], zaid: ["leafyVeg"] }
};

const CROP_NAMES = {
  rice: { en: "Rice", hi: "धान", kn: "ಭತ್ತ" }, maize: { en: "Maize", hi: "मक्का", kn: "ಮೆಕ್ಕೆಜೋಳ" }, sugarcane: { en: "Sugarcane", hi: "गन्ना", kn: "ಕಬ್ಬು" },
  wheat: { en: "Wheat", hi: "गेहूं", kn: "ಗೋಧಿ" }, mustard: { en: "Mustard", hi: "सरसों", kn: "ಸಾಸಿವೆ" }, chickpea: { en: "Chickpea", hi: "चना", kn: "ಕಡಲೆ" },
  moong: { en: "Moong", hi: "मूंग", kn: "ಹೆಸರುಕಾಳು" }, cucumber: { en: "Cucumber", hi: "खीरा", kn: "ಸೌತೆಕಾಯಿ" }, cotton: { en: "Cotton", hi: "कपास", kn: "ಹತ್ತಿ" },
  soybean: { en: "Soybean", hi: "सोयाबीन", kn: "ಸೋಯಾಬೀನ್" }, pigeonPea: { en: "Pigeon pea", hi: "अरहर", kn: "ತೊಗರಿ" }, sorghum: { en: "Sorghum", hi: "ज्वार", kn: "ಜೋಳ" },
  safflower: { en: "Safflower", hi: "कुसुम", kn: "ಕುಸುಬೆ" }, groundnut: { en: "Groundnut", hi: "मूंगफली", kn: "ಕಡಲೆಕಾಯಿ" }, ragi: { en: "Ragi", hi: "रागी", kn: "ರಾಗಿ" },
  sunflower: { en: "Sunflower", hi: "सूरजमुखी", kn: "ಸೂರ್ಯಕಾಂತಿ" }, sesame: { en: "Sesame", hi: "तिल", kn: "ಎಳ್ಳು" }, cashew: { en: "Cashew", hi: "काजू", kn: "ಗೋಡಂಬಿ" },
  paddy: { en: "Paddy", hi: "धान", kn: "ಭತ್ತ" }, horseGram: { en: "Horse gram", hi: "कुल्थी", kn: "ಹುರಳಿ" }, okra: { en: "Okra", hi: "भिंडी", kn: "ಬೆಂಡೆಕಾಯಿ" },
  bajra: { en: "Bajra", hi: "बाजरा", kn: "ಸಜ್ಜೆ" }, mothBean: { en: "Moth bean", hi: "मोठ", kn: "ಮೊಟ್ ಬೇಳೆ" }, barley: { en: "Barley", hi: "जौ", kn: "ಬಾರ್ಲಿ" },
  watermelon: { en: "Watermelon", hi: "तरबूज", kn: "ಕಲ್ಲಂಗಡಿ" }, jute: { en: "Jute", hi: "जूट", kn: "ಸೆಣಬು" }, lentil: { en: "Lentil", hi: "मसूर", kn: "ಮಸೂರ" },
  leafyVeg: { en: "Leafy vegetables", hi: "पत्तेदार सब्जियां", kn: "ಸೊಪ್ಪಿನ ತರಕಾರಿಗಳು" }
};

const KNOWLEDGE = {
  en: {
    seeds: [["🌾", "Rice", "Clayey or alluvial soil · warm, humid season · high water"], ["🌾", "Wheat", "Well-drained alluvial soil · cool season · moderate water"], ["🥜", "Groundnut", "Red or sandy loam · warm season · low to moderate water"]],
    waste: [["🍌", "Banana peels", "Chop and compost or bury shallowly for a potassium-rich addition."], ["🍂", "Dry leaves", "Compost for 2–3 months to improve soil structure."], ["🔥", "Wood ash", "Use only a thin layer; keep away from seedlings. It adds potassium and raises pH."]]
  },
  hi: {
    seeds: [["🌾", "धान", "चिकनी या जलोढ़ मिट्टी · गर्म व नम मौसम · अधिक पानी"], ["🌾", "गेहूं", "जल निकास वाली जलोढ़ मिट्टी · ठंडा मौसम · मध्यम पानी"], ["🥜", "मूंगफली", "लाल या रेतीली दोमट मिट्टी · गर्म मौसम · कम से मध्यम पानी"]],
    waste: [["🍌", "केले के छिलके", "पोटैशियम के लिए काटकर खाद बनाएं या उथली मिट्टी में दबाएं।"], ["🍂", "सूखी पत्तियां", "मिट्टी की संरचना सुधारने के लिए 2–3 महीने खाद बनाएं।"], ["🔥", "लकड़ी की राख", "केवल पतली परत लगाएं; अंकुर से दूर रखें। यह पोटैशियम देती और pH बढ़ाती है।"]]
  },
  kn: {
    seeds: [["🌾", "ಭತ್ತ", "ಜೇಡಿಮಣ್ಣು ಅಥವಾ ಮೆಕ್ಕಲು ಮಣ್ಣು · ಬೆಚ್ಚಗಿನ, ಆರ್ದ್ರ ಋತು · ಹೆಚ್ಚು ನೀರು"], ["🌾", "ಗೋಧಿ", "ನೀರು ಬಸಿಯುವ ಮೆಕ್ಕಲು ಮಣ್ಣು · ಚಳಿಯ ಋತು · ಮಧ್ಯಮ ನೀರು"], ["🥜", "ಕಡಲೆಕಾಯಿ", "ಕೆಂಪು ಅಥವಾ ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು · ಬೆಚ್ಚಗಿನ ಋತು · ಕಡಿಮೆ–ಮಧ್ಯಮ ನೀರು"]],
    waste: [["🍌", "ಬಾಳೆ ಸಿಪ್ಪೆಗಳು", "ಪೊಟ್ಯಾಸಿಯಂಗಾಗಿ ತುಂಡು ಮಾಡಿ ಗೊಬ್ಬರಗೊಳಿಸಿ ಅಥವಾ ಮೇಲ್ಮಟ್ಟದ ಮಣ್ಣಿನಲ್ಲಿ ಹೂತುಬಿಡಿ."], ["🍂", "ಒಣ ಎಲೆಗಳು", "ಮಣ್ಣಿನ ರಚನೆ ಸುಧಾರಿಸಲು 2–3 ತಿಂಗಳು ಗೊಬ್ಬರಗೊಳಿಸಿ."], ["🔥", "ಮರದ ಬೂದಿ", "ತೆಳುವಾದ ಪದರ ಮಾತ್ರ ಬಳಸಿ; ಮೊಳಕೆಯಿಂದ ದೂರವಿಡಿ. ಇದು ಪೊಟ್ಯಾಸಿಯಂ ನೀಡುತ್ತದೆ ಮತ್ತು pH ಹೆಚ್ಚಿಸುತ್ತದೆ."]]
  }
};

const t = (key) => T[lang][key] ?? T.en[key] ?? key;
const localName = (values) => values[lang] || values.en;
const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));

function refreshRegionOptions() {
  Object.entries(REGIONS).forEach(([id, region]) => {
    const option = $(`#region option[value="${id}"]`);
    if (option) option.textContent = localName(region.name);
  });
}

function updateProfile() {
  const name = localStorage.getItem("kisansetu_name") || t("farmerName");
  const hour = new Date().getHours();
  const greetings = {
    en: hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening",
    hi: hour < 12 ? "सुप्रभात" : hour < 17 ? "नमस्ते" : "शुभ संध्या",
    kn: hour < 12 ? "ಶುಭೋದಯ" : hour < 17 ? "ನಮಸ್ಕಾರ" : "ಶುಭ ಸಂಜೆ"
  };
  $("#greeting").textContent = `${greetings[lang]}, ${name} 👋`;
  $("#sideName").textContent = name;
  $("#avatar").textContent = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function updateMarket() {
  $("#marketOne").textContent = t("sampleMarketTitle");
  $("#marketLineOne").textContent = t("sampleMarketLine");
  $("#marketTwo").textContent = t("transportOptionTitle");
  $("#marketLineTwo").textContent = t("transportOptionLine");
  $("#marketValueOne").textContent = t("illustrative");
  $("#marketValueTwo").textContent = t("illustrative");
}

function renderBenefits() {
  const region = REGIONS[regionId];
  if (!region) return;
  $("#stateBanner").innerHTML = `<div class="state-emblem">${region.emoji}</div><div><h2>${escapeHTML(t("stateBenefits"))} · ${escapeHTML(localName(region.state))}</h2><p>${escapeHTML(localName(region.name))} · ${escapeHTML(t("lastVerified"))}</p></div>`;
  $("#stateBenefits").innerHTML = STATE_BENEFITS[regionId].map(([name, url]) => benefitCard(name, url, "state")).join("");
  $("#nationalBenefits").innerHTML = NATIONAL.map(([name, url]) => benefitCard(name, url, "national")).join("");
}

function benefitCard(name, url, scope) {
  const isState = scope === "state";
  const label = isState ? t("stateService") : t("governmentIndia");
  const description = isState ? t("statePortal") : t("nationalPortal");
  return `<a class="benefit-card" href="${url}" target="_blank" rel="noopener noreferrer"><span class="benefit-tag">${escapeHTML(label)}</span><h3>${escapeHTML(name)}</h3><p>${escapeHTML(description)}</p><span class="link-arrow">${escapeHTML(t("official"))} ↗</span></a>`;
}

async function loadWeather() {
  const region = REGIONS[regionId];
  if (!region) return;
  $("#weatherDetail").textContent = t("loadingWeather");
  try {
    const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=temperature_2m,apparent_temperature,weather_code&daily=precipitation_probability_max,temperature_2m_max&timezone=Asia%2FKolkata`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("weather response");
    const data = await response.json();
    const current = data.current;
    const rain = data.daily.precipitation_probability_max?.[0] ?? 0;
    const high = data.daily.temperature_2m_max?.[0] ?? 0;
    const icon = current.weather_code < 3 ? "☀️" : current.weather_code < 60 ? "🌦️" : "🌧️";
    $("#weatherValue").textContent = `${icon} ${Math.round(current.temperature_2m)}°C`;
    $("#weatherDetail").textContent = `${localName(region.name)} · ${Math.round(current.apparent_temperature)}° ${t("feelsLike")}`;
    const action = rain > 50 ? "rainAction" : high > 38 ? "heatAction" : "normalAction";
    $("#actionTitle").textContent = t(action);
    $("#actionText").textContent = `${rain}% ${t("rainChance")}`;
    $("#heroAlert").textContent = t(action);
    $("#heroAlertDetail").textContent = $("#weatherDetail").textContent;
  } catch {
    $("#weatherValue").textContent = "🌦 25°C";
    $("#weatherDetail").textContent = t("weatherOffline");
    $("#actionTitle").textContent = t("normalAction");
    $("#actionText").textContent = t("weatherOffline");
    $("#heroAlert").textContent = t("normalAction");
    $("#heroAlertDetail").textContent = t("weatherOffline");
  }
}

function renderKnowledge() {
  const content = KNOWLEDGE[lang];
  const createCards = (items) => items.map(([icon, title, copy]) => `<article class="knowledge-card"><div class="emoji">${icon}</div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(copy)}</p></article>`).join("");
  $("#seedCards").innerHTML = createCards(content.seeds);
  $("#wasteCards").innerHTML = createCards(content.waste);
}

function renderDiary() {
  let records = [];
  try { records = JSON.parse(localStorage.getItem("kisansetu_diary") || "[]"); } catch { records = []; }
  $("#diaryList").innerHTML = records.length
    ? records.map((record) => `<div class="profit-item"><div><b>${escapeHTML(record.text)}</b><div class="small">${escapeHTML(record.date)}</div></div><span>✓</span></div>`).join("")
    : `<div class="small">${escapeHTML(t("noRecords"))}</div>`;
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.title = t("appTitle");
  $$('[data-t]').forEach((element) => { element.textContent = t(element.dataset.t); });
  $$('[data-t-placeholder]').forEach((element) => { element.placeholder = t(element.dataset.tPlaceholder); });
  $("#language").value = lang;
  $("#previousSlide").setAttribute("aria-label", t("previousSlide"));
  $("#nextSlide").setAttribute("aria-label", t("nextSlide"));
  updateCarouselControl();
  $$("#nav button").forEach((button) => button.setAttribute("aria-label", t(button.dataset.page)));
  refreshRegionOptions();
  updateProfile();
  updateMarket();
  renderBenefits();
  renderKnowledge();
  renderDiary();
  loadWeather();
  localStorage.setItem("kisansetu_lang", lang);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 3400);
}

function go(page) {
  $$(".nav button").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  $$(".page").forEach((section) => section.classList.toggle("active", section.id === `page-${page}`));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showApp() {
  $("#auth").classList.add("hidden");
  $("#app").classList.remove("hidden");
  $("#region").value = regionId;
  applyLanguage();
}

function cropPlan() {
  const soil = $("#soil").value;
  const season = $("#season").value;
  const irrigation = $("#irrigation").value;
  const land = Number($("#land").value);
  if (!Number.isFinite(land) || land < 0.1) {
    showToast(t("landRequired"));
    $("#land").focus();
    return;
  }
  const crops = CROP_RULES[soil][season];
  $("#advisorResult").innerHTML = `<div class="panel"><h2>${escapeHTML(t("planHeading"))}</h2><p class="hint">${escapeHTML(land)} ${escapeHTML(t("acres"))} · ${escapeHTML(irrigation === "yes" ? t("yes") : t("no"))}</p><div class="recommendations">${crops.map((crop) => `<div class="recommendation"><b>${escapeHTML(localName(CROP_NAMES[crop]))}</b><p>${escapeHTML(t("planNote"))}</p></div>`).join("")}</div></div>`;
  showToast(t("planHeading"));
}

function openDiary() {
  const dialog = $("#diaryDialog");
  $("#diaryText").value = "";
  $("#diaryError").textContent = "";
  if (typeof dialog.showModal !== "function") { showToast(t("recordPrompt")); return; }
  dialog.showModal();
  $("#diaryText").focus();
}

function saveDiary(event) {
  event.preventDefault();
  const text = $("#diaryText").value.trim();
  if (!text) { $("#diaryError").textContent = t("recordPrompt"); $("#diaryText").focus(); return; }
  let records = [];
  try { records = JSON.parse(localStorage.getItem("kisansetu_diary") || "[]"); } catch { records = []; }
  const locale = lang === "hi" ? "hi-IN" : lang === "kn" ? "kn-IN" : "en-IN";
  records.unshift({ text: text.slice(0, 240), date: new Date().toLocaleDateString(locale) });
  localStorage.setItem("kisansetu_diary", JSON.stringify(records));
  renderDiary();
  $("#diaryDialog").close();
  showToast(t("recordAdded"));
}

function setSlide(next) {
  const slides = $$(".slide");
  slide = (next + slides.length) % slides.length;
  slides.forEach((item, index) => item.classList.toggle("active", index === slide));
}

function updateCarouselControl() {
  const button = $("#toggleCarousel");
  button.textContent = carouselPaused ? "▶" : "Ⅱ";
  button.setAttribute("aria-label", t(carouselPaused ? "resumeCarousel" : "pauseCarousel"));
  button.setAttribute("aria-pressed", String(carouselPaused));
}

function setCarouselAutoplay() {
  clearInterval(carouselTimer);
  if (!carouselPaused) carouselTimer = setInterval(() => setSlide(slide + 1), 6500);
  updateCarouselControl();
}

function startVoice() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { showToast(t("voiceUnsupported")); go("crops"); return; }
  const button = $("#voiceButton");
  const original = button.textContent;
  const recognition = new Recognition();
  recognition.lang = lang === "hi" ? "hi-IN" : lang === "kn" ? "kn-IN" : "en-IN";
  button.textContent = `🎙 ${t("voiceListening")}`;
  const reset = () => { button.textContent = original; };
  recognition.onresult = (event) => { showToast(event.results[0][0].transcript); };
  recognition.onerror = () => { showToast(t("voiceUnsupported")); };
  recognition.onend = reset;
  recognition.start();
}

$("#authForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("#farmerName").value.trim();
  if (!name) { $("#authError").textContent = t("nameRequired"); return; }
  localStorage.setItem("kisansetu_name", name);
  $("#authError").textContent = "";
  showApp();
});

$("#signout").addEventListener("click", () => {
  ["kisansetu_name", "kisansetu_diary", "kisansetu_lang", "kisansetu_region"].forEach((key) => localStorage.removeItem(key));
  lang = "en";
  regionId = "karnataka";
  $("#region").value = regionId;
  applyLanguage();
  localStorage.removeItem("kisansetu_lang");
  $("#photo").value = "";
  $("#photoName").textContent = "";
  $("#scanMessage").textContent = "";
  $("#scanMessage").classList.remove("show");
  $("#advisorResult").replaceChildren();
  $("#app").classList.add("hidden");
  $("#auth").classList.remove("hidden");
  $("#farmerName").focus();
});

$("#nav").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-page]");
  if (button) go(button.dataset.page);
});

$("#region").addEventListener("change", (event) => {
  regionId = event.target.value;
  localStorage.setItem("kisansetu_region", regionId);
  renderBenefits();
  loadWeather();
  showToast(`${t("stateBenefits")}: ${localName(REGIONS[regionId].state)}`);
});

$("#language").addEventListener("change", (event) => { lang = event.target.value; applyLanguage(); });
$("#advisorButton").addEventListener("click", cropPlan);
$("#photo").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  $("#photoName").textContent = file.name;
  $("#scanMessage").textContent = t("photoSafe");
  $("#scanMessage").classList.add("show");
});

$$('[data-action]').forEach((button) => button.addEventListener("click", () => {
  const action = button.dataset.action;
  if (action === "scan") go("crops");
  else if (action === "benefits") go("benefits");
  else if (action === "service") go("services");
  else { go("diary"); openDiary(); }
}));

$$('[data-service]').forEach((button) => button.addEventListener("click", () => showToast(t("serviceMessage"))));
$$('.tab').forEach((button) => button.addEventListener("click", () => {
  $$(".tab").forEach((item) => item.classList.toggle("active", item === button));
  $$(".tab-pane").forEach((item) => item.classList.toggle("active", item.id === `tab-${button.dataset.tab}`));
}));
$("#addDiary").addEventListener("click", openDiary);
$("#diaryForm").addEventListener("submit", saveDiary);
$("#cancelDiary").addEventListener("click", () => $("#diaryDialog").close());
$("#voiceButton").addEventListener("click", startVoice);
$("#previousSlide").addEventListener("click", () => setSlide(slide - 1));
$("#nextSlide").addEventListener("click", () => setSlide(slide + 1));
$("#toggleCarousel").addEventListener("click", () => { carouselPaused = !carouselPaused; setCarouselAutoplay(); });

applyLanguage();
setCarouselAutoplay();
if (localStorage.getItem("kisansetu_name")) showApp();
else $("#farmerName").focus();
