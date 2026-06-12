/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CropRecommendationResult } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

// Full knowledge-base and responses typed by language
export const SUGGESTED_QUESTIONS: Record<string, { label: string; text: string }[]> = {
  en: [
    { label: "🌾 Which crop is suitable for black soil?", text: "Which crop is suitable for black soil?" },
    { label: "🌦 Will it rain this week?", text: "Will it rain this week?" },
    { label: "🐛 How do I treat leaf spot disease?", text: "How do I treat leaf spot disease?" },
    { label: "🌱 Which fertilizer is best for cotton?", text: "Which fertilizer is best for cotton?" },
    { label: "📈 What is today's cotton market price?", text: "What is today's cotton market price?" },
    { label: "🏛 Tell me about PM-Kisan Scheme.", text: "What is PM-Kisan Scheme?" },
  ],
  hi: [
    { label: "🌾 काली मिट्टी के लिए कौन सी फसल उपयुक्त है?", text: "Which crop is suitable for black soil?" },
    { label: "🌦 क्या इस हफ्ते बारिश होगी?", text: "Will it rain this week?" },
    { label: "🐛 पत्ती धब्बा रोग का इलाज कैसे करें?", text: "How do I treat leaf spot disease?" },
    { label: "🌱 कपास के लिए कौन सा उर्वरक सबसे अच्छा है?", text: "Best fertilizer for cotton?" },
    { label: "📈 क्या कपास का आज का मूल्य क्या है?", text: "What is today's cotton market price?" },
    { label: "🏛 पीएम-किसान योजना के बारे में बताएं।", text: "What is PM-Kisan Scheme?" },
  ],
  mr: [
    { label: "🌾 काळ्या मातीसाठी कोणते पीक योग्य आहे?", text: "Which crop is suitable for black soil?" },
    { label: "🌦 या आठवड्यात पाऊस पडेल का?", text: "Will it rain this week?" },
    { label: "🐛 पानावरील ठिपके रोगावर काय उपचार करावेत?", text: "How do I treat leaf spot disease?" },
    { label: "🌱 कापसासाठी कोणते खत सर्वोत्तम आहे?", text: "Best fertilizer for cotton?" },
    { label: "📈 कापसाचे आजचे बाजार भाव काय आहेत?", text: "What is today's cotton market price?" },
    { label: "🏛 पीएम-किसान योजना काय आहे?", text: "What is PM-Kisan Scheme?" },
  ],
};

const KNOWLEDGE_BASE_RESPONSES: Record<string, Record<string, string>> = {
  en: {
    "which crop is suitable for black soil?": "Soybean, Cotton, and Tur Dal are commonly recommended for black soil due to their adaptability and yield potential.",
    "will it rain this week?": "Based on available weather data, moderate rainfall is expected during the coming week.",
    "how do i treat leaf spot disease?": "Leaf Spot is generally caused by fungal infection. Recommended treatment includes Mancozeb spray and proper field sanitation.",
    "best fertilizer for cotton?": "Cotton commonly benefits from Urea, DAP, and Potash depending on soil conditions.",
    "which fertilizer is best for cotton?": "Cotton commonly benefits from Urea, DAP, and Potash depending on soil conditions.",
    "what is today's cotton market price?": "Today's cotton (Kapas) market wholesale rates range from ₹6,800 to ₹7,600 per quintal across major APMCs, showing a stable weekly trend.",
    "what is pm-kisan scheme?": "PM-Kisan provides eligible farmers with financial assistance of ₹6,000 per year from the Government of India through direct benefit transfer (DBT) in three equal installments.",
  },
  hi: {
    "which crop is suitable for black soil?": "काली मिट्टी के लिए सोयाबीन, कपास और अरहर (तुअर) की सिफारिश की जाती है क्योंकि इसमें नमी बनाए रखने की उत्कृष्ट क्षमता होती है और उपज भी अच्छी होती है।",
    "will it rain this week?": "उपलब्ध मौसम के आंकड़ों के अनुसार, आने वाले सप्ताह के दौरान मध्यम वर्षा होने की उम्मीद है।",
    "how do i treat leaf spot disease?": "पत्ती धब्बा (लीफ स्पॉट) आमतौर पर फंगल संक्रमण के कारण होता है। अनुशंसित उपचार में मैनकोजेब स्प्रे और खेत की उचित स्वच्छता शामिल है।",
    "best fertilizer for cotton?": "मिट्टी की स्थिति के आधार पर कपास को यूरिया, डीएपी (DAP) और पोटाश से अत्यधिक लाभ मिलता है।",
    "which fertilizer is best for cotton?": "मिट्टी की स्थिति के आधार पर कपास को यूरिया, डीएपी (DAP) और पोटाश से अत्यधिक लाभ मिलता है।",
    "what is today's cotton market price?": "मुख्य एपीएमसी मंडियों में कपास के थोक भाव आज ₹6,800 से ₹7,600 प्रति क्विंटल के बीच दर्ज किए गए हैं, जो बाजार में स्थिरता दर्शाते हैं।",
    "what is pm-kisan scheme?": "पीएम-किसान (PM-Kisan) योजना के तहत भारत सरकार द्वारा पात्र किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता तीन समान किस्तों में सीधे बैंक खाते (DBT) में भेजी जाती है।",
  },
  mr: {
    "which crop is suitable for black soil?": "काळ्या मातीसाठी सोयाबीन, कापूस आणि तूर या पिकांची प्रामुख्याने शिफारस केली जाते, कारण या मातीत ओलावा टिकवून ठेवण्याची चांगली क्षमता असते आणि उत्तम कृषी उत्पादन मिळते.",
    "will it rain this week?": "उपलब्ध हवामान अंदाजानुसार, येत्या आठवड्यात विविध जिल्ह्यांमध्ये मध्यम स्वरूपाच्या पावसाची शक्यता वर्तवण्यात आली आहे.",
    "how do i treat leaf spot disease?": "पानावरील ठिपके (लीफ स्पॉट) हा आजार बुरशीजन्य संसर्गामुळे होतो. याच्या उपचारासाठी मँकोझेबची (Mancozeb) फवारणी आणि शेताची स्वच्छता राखणे आवश्यक आहे.",
    "best fertilizer for cotton?": "मातीच्या गरजेनुसार कापूस पिकासाठी सामान्यतः यूरिया, डीएपी (DAP) आणि पोटॅश देण्याची शिफारस केली जाते.",
    "which fertilizer is best for cotton?": "मातीच्या गरजेनुसार कापूस पिकासाठी सामान्यतः यूरिया, डीएपी (DAP) आणि पोटॅश देण्याची शिफारस केली जाते.",
    "what is today's cotton market price?": "आज प्रमुख एपीएमसी मंडईमध्ये कपाशीचे घाऊक दर ६,८०० रुपये ते ७,६०० रुपये प्रति क्विंटल असून बाजारात स्थिर कल दिसून येत आहे.",
    "what is pm-kisan scheme?": "पीएम-किसान योजनेअंतर्गत भारत सरकारकडून पात्र शेतकरी कुटुंबियांना वर्षाला ६,००० रुपयांची मदत तीन समान हप्त्यांमध्ये थेट बँक खात्यात (DBT) जमा केली जाते.",
  }
};

const KEYWORD_RESPONSES: Record<string, { keywords: string[]; response: string }[]> = {
  en: [
    {
      keywords: ["cotton", "kapas"],
      response: "For premium cotton cultivation, select hybrid seeds. It grows best in deep black soils. Keep check on pink bollworm infestation and balance NPK fertilizer application (typically 120:60:60 kg/ha)."
    },
    {
      keywords: ["disease", "spot", "leaf", "rot", "blight", "fungus"],
      response: "To diagnose leaf spots, rusts, or powdery mildew, please upload a photo in the 'Disease Analysis' page. Organic remedies include Neem Oil spray, while chemical remedies include Mancozeb or Carbendazim."
    },
    {
      keywords: ["fertilizer", "manure", "urea", "dap", "npk", "potash"],
      response: "Recommended fertilizer dosage should be based on soil health cards. For general crops, N:P:K ratio of 4:2:1 (like Urea, DAP, MOP) is ideal. Always apply compost or organic manure during tillage to enhance soil biological activity."
    },
    {
      keywords: ["weather", "rain", "temperature", "wind", "humidity"],
      response: "Our dynamic Weather Warnings page monitors active pressures, humidity, and cloudiness. High moisture levels combined with high temperature can trigger fungal pathogens, so adjust irrigation plans accordingly."
    },
    {
      keywords: ["price", "market", "mandi", "rate", "apmc"],
      response: "You can track live wholesale crop rates across state APMCs under our 'Mandi Sheets' section. Select your product and filter categories to compare rates."
    },
    {
      keywords: ["scheme", "government", "pm-kisan", "subsidies", "yojana"],
      response: "The Government offers vital assistance options like PM-Kisan Yojana, Pradhan Mantri Fasal Bima Yojana (Crop Insurance), and solar pump solar subsidies. Check the national portals or ask our support for registration details."
    }
  ],
  hi: [
    {
      keywords: ["cotton", "kapas", "कपास"],
      response: "कपास की अच्छी खेती के लिए बीटी (BT) या हाइब्रिड बीजों का चयन करें। यह गहरी काली मिट्टी में सबसे अच्छा बढ़ता है। गुलाबी सुंडी (Pink Bollworm) के प्रभाव पर नजर रखें और संतुलित एनपीके (NPK) उर्वरकों का उपयोग करें।"
    },
    {
      keywords: ["disease", "spot", "leaf", "rot", "blight", "fungus", "बीमारी", "रोग", "धब्बा"],
      response: "पत्तियों के धब्बे या फंगस के सटीक निदान के लिए 'रोग निदान' पेज पर जाकर पत्ती की फोटो अपलोड करें। जैविक उपचार के रूप में नीम के तेल का छिड़काव करें, या मैन्कोजेब जैसी कवकनाशी का प्रयोग करें।"
    },
    {
      keywords: ["fertilizer", "manure", "urea", "dap", "npk", "potash", "उर्वरक", "खाद", "यूरिया"],
      response: "सामान्य अनाजों के लिए एन:पी:के (N:P:K) का 4:2:1 अनुपात (जैसे यूरिया, डीएपी, पोटाश) आदर्श माना जाता है। मिट्टी की ताकत बढ़ाने के लिए जुताई के समय जैविक खाद या कम्पोस्ट अवश्य मिलाएं।"
    },
    {
      keywords: ["weather", "rain", "temperature", "wind", "humidity", "मौसम", "बारिश", "तापमान"],
      response: "मौसम सूचकांक अनुभाग सक्रिय वर्षा और आर्द्रता को ट्रैक करता है। उच्च आर्द्रता फसलों में फंगल बीमारी का कारण बन सकती है, इसलिए सिंचाई की योजना उसी अनुसार बनाएं।"
    },
    {
      keywords: ["price", "market", "mandi", "rate", "apmc", "भाव", "मंडी", "बाजार"],
      response: "आप हमारे 'मंडी शीट्स' अनुभाग के तहत राज्य एपीएमसी में लाइव थोक फसल दरों को ट्रैक कर सकते हैं। दरों की तुलना करने के लिए श्रेणियों को फ़िल्टर करें।"
    },
    {
      keywords: ["scheme", "government", "pm-kisan", "subsidies", "yojana", "योजना", "सरकारी"],
      response: "सरकार पीएम-किसान योजना, फसल बीमा योजना और सौर पंप जैसी सब्सिडी प्रदान करती है। आधिकारिक सरकारी कृषि पोर्टल पर इन योजनाओं के बारे में विस्तार से देखा जा सकता है।"
    }
  ],
  mr: [
    {
      keywords: ["cotton", "kapas", "कापूस", "कपाशी"],
      response: "कापसाच्या चांगल्या वाढीसाठी बीटी किंवा हायब्रिड बियाणे वापरा. हे पीक पाण्याचा निचरा होणाऱ्या काळ्या कसदार जमिनीत उत्तम येते. गुलाबी बोंडअळीपासून संरक्षणासाठी वेळोवेळी तपासणी करा."
    },
    {
      keywords: ["disease", "spot", "leaf", "rot", "blight", "fungus", "रोग", "आजार", "बुरशी", "ठिपके"],
      response: "पानावरील डाग आणि बुरशीजन्य आजारांवर अचूक सल्यासाठी 'पीक रोग निदान' पेजवर पानाचा फोटो स्कॅन करा. सेंद्रिय उपाय म्हणून निंबोळी अर्काची फवारणी फायदेशीर ठरते."
    },
    {
      keywords: ["fertilizer", "manure", "urea", "dap", "npk", "potash", "खत", "खते", "युरिया"],
      response: "नेहमी माती परीक्षणावर आधारित खत मात्रा द्या. तृणधान्य पिकांसाठी नत्र, स्फुरद व पालाश (N:P:K) यांचे ४:२:१ गुणोत्तर योग्य मानले जाते. शेतात शेणखत किंवा सेंद्रिय खतांचा वापर वाढवा."
    },
    {
      keywords: ["weather", "rain", "temperature", "wind", "humidity", "हवामान", "पाऊस", "तापमान", "वारा"],
      response: "हवामान चेतावणी ट्रॅकर तापमान आणि आर्द्रता मोजतो. अति उष्णता व अतिरिक्त ओलाव्यामुळे रोगांचा प्रादुर्भाव होऊ शकतो, त्यामुळे पाण्याचे नियोजन अचूक ठेवा."
    },
    {
      keywords: ["price", "market", "mandi", "rate", "apmc", "भाव", "मंडी", "बाजारभाव", "दर"],
      response: "तुम्ही आमच्या 'थेट मंडी बाजारभाव' विभागात विविध कृषी उत्पन्न बाजार समित्यांमधील थेट दर तपासू शकता. पिकांचे तुलनात्मक दर शोधण्यासाठी योग्य पर्याय निवडा."
    },
    {
      keywords: ["scheme", "government", "pm-kisan", "subsidies", "yojana", "योजना", "शासकीय", "सरकारी"],
      response: "शासनातर्फे पीएम-किसान सन्मान निधी, पीक विमा योजना, आणि सौर कृषी पंप योजना यांसारख्या अनेक योजना राबवल्या जातात. ऑनलाइन अधिकृत संकेतस्थळावरून या योजनेची अधिक माहिती मिळवू शकता."
    }
  ]
};

const FALLBACK_RESPONSES: Record<string, string> = {
  en: "I couldn't find an exact answer. Please try rephrasing your question or ask about crops, fertilizers, weather, diseases, or market prices.",
  hi: "मुझे कोई सटीक उत्तर नहीं मिला। कृपया अपने प्रश्न को दूसरी तरह से पूछने का प्रयास करें या फसलों, उर्वरक, मौसम, बीमारियों या मंडी भावों के बारे में पूछें।",
  mr: "मला अचूक उत्तर मिळाले नाही. कृपया आपला प्रश्न वेळग्या शब्दांत विचारा किंवा पीक प्रकार, खते, हवामान, रोग किंवा स्थानिक मंडी बाजारभावांबद्दल विचारा."
};

/**
 * Mock chatbot response loader with local storage fallback and smart keywords matching
 * TODO: Integrate direct Gemini API streaming response using @google/genai SDK when ready
 */
export async function mockChatbotResponse(question: string, lang: 'en' | 'hi' | 'mr'): Promise<string> {
  // Simulate natural typing delay (800ms)
  await new Promise((resolve) => setTimeout(resolve, 850));

  const cleanQuestion = question.trim().toLowerCase();
  
  // 1. Direct Knowledge Base Matching
  const exactResponse = KNOWLEDGE_BASE_RESPONSES[lang]?.[cleanQuestion];
  if (exactResponse) {
    return exactResponse;
  }

  // 2. Keyword Search Matching
  const list = KEYWORD_RESPONSES[lang] || KEYWORD_RESPONSES['en'];
  for (const item of list) {
    const matched = item.keywords.some((kw) => cleanQuestion.includes(kw));
    if (matched) {
      return item.response;
    }
  }

  // 3. General English check if lang is not en (just in case they type English questions under different setting)
  if (lang !== 'en') {
    const listEn = KEYWORD_RESPONSES['en'];
    for (const item of listEn) {
      const matched = item.keywords.some((kw) => cleanQuestion.includes(kw));
      if (matched) {
        // Find language equivalent or translate keyword response
        const fallbackTranslateIdx = listEn.indexOf(item);
        if (KEYWORD_RESPONSES[lang]?.[fallbackTranslateIdx]) {
          return KEYWORD_RESPONSES[lang][fallbackTranslateIdx].response;
        }
      }
    }
  }

  // 4. Default Fallback response
  return FALLBACK_RESPONSES[lang] || FALLBACK_RESPONSES['en'];
}

// Conversation Storage Helpers
export function saveChatHistory(history: ChatMessage[]): void {
  try {
    localStorage.setItem('krishimitra_chat_history', JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save chat history to localStorage", error);
  }
}

export function loadChatHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem('krishimitra_chat_history');
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to load chat history from localStorage", error);
    return [];
  }
}

export function clearChatHistory(): void {
  try {
    localStorage.removeItem('krishimitra_chat_history');
  } catch (error) {
    console.error("Failed to clear chat history from localStorage", error);
  }
}
