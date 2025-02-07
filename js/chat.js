// Čekamo da se DOM učita
window.onload = function() {
    // Uzimamo sve potrebne elemente
    const header = document.querySelector('.chat-header');
    const body = document.querySelector('.chat-body');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Inicijalno sakrivamo chat body
    body.style.display = 'none';
    
    // Funkcija za toggle chat-a
    header.onclick = function() {
        if (body.style.display === 'none') {
            // Otvaramo chat
            body.style.display = 'block';
            body.style.opacity = '0';
            setTimeout(() => {
                body.style.opacity = '1';
                input.focus(); // Fokusiramo input polje
            }, 50);
        } else {
            // Zatvaramo chat
            body.style.opacity = '0';
            setTimeout(() => {
                body.style.display = 'none';
            }, 300);
        }
    };
    
    // Funkcija za dodavanje poruke u chat
    function addMessage(text, isUser = false) {
        const message = document.createElement('div');
        message.classList.add('message');
        message.classList.add(isUser ? 'user-message' : 'bot-message');
        message.textContent = text;
        
        // Dodajemo poruku sa fade-in efektom
        message.style.opacity = '0';
        messagesContainer.appendChild(message);
        setTimeout(() => {
            message.style.opacity = '1';
        }, 50);
        
        // Skrolujemo na dno
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Funkcija za slanje poruke
    function sendMessage() {
        const text = input.value.trim();
        if (text) {
            // Dodajemo korisničku poruku
            addMessage(text, true);
            
            // Čistimo input
            input.value = '';
            
            // Dobijamo odgovor od bota
            const response = findResponse(text);
            
            // Simuliramo kucanje (3 tačkice)
            setTimeout(() => {
                addMessage('...', false);
                
                // Nakon 1 sekunde zamenjujemo tačkice pravim odgovorom
                setTimeout(() => {
                    messagesContainer.removeChild(messagesContainer.lastChild);
                    addMessage(response, false);
                }, 1000);
            }, 500);
        }
    }
    
    // Event listener za slanje poruke
    sendBtn.onclick = sendMessage;
    
    // Event listener za Enter taster
    input.onkeypress = function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
};

// Definišemo mapu ključnih reči za prepoznavanje pitanja
const keywordMap = {
    // Osnovne informacije
    "sta_je": ["sta je", "šta je", "sta su", "šta su", "papermints", "coolcaps", "objasni", "proizvod", "kako radi", "reci mi više"],
    
    // Prodajna mesta
    "kupovina": ["gde kupiti", "gde da kupim", "prodaja", "prodavnica", "apoteka", "mesto", "nabaviti", "prodajno", "kupim", "nadjem", "nađem"],
    
    // Cena
    "cena": ["cena", "košta", "kosta", "cene", "koštanje", "kostanje", "dinara", "rsd"],
    
    // Ukusi
    "ukusi": ["ukus", "ukusi", "mentol", "jagoda", "aroma", "koji ukus", "dostupni ukusi", "ukuši"],
    
    // Upotreba
    "upotreba": ["kako koristiti", "upotreba", "način", "nacin", "kako se uzima", "kako jesti", "uputstvo"],
    
    // Pakovanja
    "pakovanja": ["pakovanje", "pakovanja", "tuba", "box40", "kutijica", "veličine", "velicine"],
    
    // Sastav i bezbednost
    "sastav": ["sastav", "sastojci", "prirodno", "šećer", "secer", "kalorije", "alergije"],
    
    // Isporuka
    "isporuka": ["isporuka", "dostava", "slanje", "shipping", "isporučuje", "isporucuje"],
    
    // Kontakt
    "kontakt": ["kontakt", "email", "telefon", "kontaktiraj"],
    
    // Zabavna pitanja
    "zabava": ["kako se zoveš", "koliko imaš godina", "voliš", "spavaš", "vic", "šta radiš"]
};

// Definišemo odgovore
const responses = {
    // Osnovne informacije o proizvodu
    "sta_je": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "kupovina": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "cena": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
    "ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "upotreba": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "pakovanja": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "sastav": "Ne, proizvod sadrži aspartam i sukralozu, ali su svi sastojci pažljivo birani i nisu štetni.",
    "isporuka": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "kontakt": "Možete nas kontaktirati putem sekcije za kontakte.",

    // Zabavni odgovori
    "kako se zoveš": "Ja sam PaperMints chatbot. Kako možem pomoći?",
    "koliko imaš godina": "Star sam kao prva kapsula PaperMints CoolCaps, uvek svež, nikad stariji od nekoliko sekundi.",
    "voliš svoj posao": "Naravno! Širenje svežine je moja životna misija.",
    "volim te": "A ja volim mentol i jagodu... i tebe, naravno!",
    "jedeš papermints": "Ne, ja sam virtuelan. Ali zato ti uživaj u njima i za mene!",
    "stvaran": "Koliko god virtuelni asistent može biti stvaran, tu sam za sva tvoja pitanja i osveženje.",
    "spavaš": "Nikad! Uvek sam budan, svež i spreman da ti pomognem.",
    "imaš devojku": "Moj jedini partner je tuba puna PaperMints CoolCaps.",
    "vic": "Naravno! Zašto mentol nikada ne kasni? Zato što je uvek svež!",
    "vic je glup": "Žao mi je",

    // Specifična pitanja
    "za decu": "Namenjeni su odraslima i deci starijoj od 12 godina.",
    "alergije": "Preporučujemo da proverite listu sastojaka na pakovanju ukoliko imate poznate alergije.",
    "kada koristiti": "Idealni su nakon obroka, kafe, cigareta ili kada želite dodatno osveženje.",
    "dnevna doza": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "broj kapsula": "Tuba sadrži 18 kapsula, dok Box40 pakovanje sadrži 40 kapsula za osveženje daha.",
    "miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",

    // Varijacije pitanja
    "šta su coolcaps": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "gde kupiti": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "koliko košta": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
    "koji ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "kako koristiti": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "koja pakovanja": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "sastojci": "Ne, proizvod sadrži aspartam i sukralozu, ali su svi sastojci pažljivo birani i nisu štetni.",
    "dostava": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "email": "Možete nas kontaktirati putem sekcije za kontakte.",
    "telefon": "Možete nas kontaktirati putem sekcije za kontakte.",

    // Default odgovor
    "default": "Izvinjavam se, nisam siguran kako da odgovorim na to pitanje. Možete nas kontaktirati direktno za više informacija."
};

// Funkcija za normalizaciju teksta
function normalizeText(text) {
    return text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,?!]/g, '');
}

// Funkcija za prepoznavanje pitanja i davanje odgovora
function findResponse(message) {
    const normalizedInput = normalizeText(message);
    
    // Dodajemo console.log za debugging
    console.log("Normalized input:", normalizedInput);
    
    for (let question in responses) {
        const normalizedQuestion = normalizeText(question);
        console.log("Checking question:", normalizedQuestion);
        
        if (normalizedInput.includes(normalizedQuestion) || normalizedQuestion.includes(normalizedInput)) {
            console.log("Match found! Response:", responses[question]);
            return responses[question];
        }
    }
    
    return responses["default"];
}

// Dodaj na početak fajla, odmah nakon const responses = {...}
function toggleAssistant() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
}

// Izmeni event listener sekciju na kraju fajla
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleAssistant');
    const chatWidget = document.evaluate('/html/body/div[2]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    if (toggleButton && chatWidget) {
        toggleButton.addEventListener('click', function() {
            const isHidden = chatWidget.style.display === 'none';
            chatWidget.style.display = isHidden ? 'block' : 'none';
            
            // Kada je chat otvoren, pomeri dugme na vrh
            if (isHidden) {
                toggleButton.style.bottom = '400px'; // visina chat-a
            } else {
                toggleButton.style.bottom = '20px'; // originalna pozicija
            }
        });
    }
}); 