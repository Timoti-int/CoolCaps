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
    
    // Prodajna mesta (proširena lista)
    "kupovina": [
        "gde kupiti", 
        "gde da kupim", 
        "gde ima da se kupi",
        "gde može da se kupi",
        "gde mogu da kupim",
        "prodaja", 
        "prodavnica", 
        "apoteka", 
        "mesto", 
        "nabaviti", 
        "prodajno", 
        "kupim", 
        "nadjem", 
        "nađem",
        "prodajna mesta",
        "lokacije",
        "gde prodajete",
        "gde se prodaje"
    ],
    
    // Cena (proširena lista)
    "cena": [
        "cena", 
        "košta", 
        "kosta", 
        "cene", 
        "koštanje", 
        "kostanje", 
        "dinara", 
        "rsd",
        "koliko para",
        "koja je cena",
        "cena proizvoda",
        "koliko je",
        "koliko košta",
        "koliko kosta"
    ],
    
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
    "zabava": ["kako se zoveš", "koliko imaš godina", "voliš", "spavaš", "vic", "šta radiš"],
    
    // Doziranje
    "doziranje": [
        "koliko sme", 
        "koliko može", 
        "koliko dnevno", 
        "dnevna doza", 
        "koliko da popijem",
        "koliko da pojedem",
        "koliko da uzmem",
        "koliko kapsula",
        "maksimalna doza",
        "preporučena doza",
        "preporucena doza",
        "koliko puta dnevno",
        "koliko često",
        "koliko cesto"
    ],
};

// Definišemo odgovore
const responses = {
    // Osnovne informacije o proizvodu
    "sta_je": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "kupovina": "PaperMints CoolCaps možete kupiti na sledećim mestima:\n\n" +
               "🏪 Apoteke:\n" +
               "- Galen\n" +
               "- Lipa Lek\n" +
               "- Zdravković\n" +
               "- Super Dr. Max\n" +
               "- Vista\n" +
               "- Vipera\n\n" +
               "⛽ Benzinske stanice:\n" +
               "- OMV\n\n" +
               "🏥 Zdravstvene ustanove:\n" +
               "- International Health",
    "cena": "💰 Cene PaperMints CoolCaps:\n\n" +
            "• Tuba (18 kapsula): 370 RSD\n" +
            "• Box40 (40 kapsula): 690 RSD\n\n" +
            "📦 Napomena za online kupovinu:\n" +
            "Minimum za online porudžbinu je 3 komada.",
    "ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "upotreba": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "pakovanja": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "sastav": "Ne, proizvod sadrži aspartam i sukralozu, ali su svi sastojci pažljivo birani i nisu štetni.",
    "isporuka": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "kontakt": "Možete nas kontaktirati putem sekcije za kontakte.",
    "zabava": "Ja sam PaperMints chatbot, uvek svež i spreman da pomognem!",
    "doziranje": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha. 😊\n\n" +
                "Idealno je uzeti kapsulu:\n" +
                "• Nakon obroka\n" +
                "• Posle kafe\n" +
                "• Nakon cigareta\n" +
                "• Ili kad god poželite svež dah",
    "default": "Izvinjavam se, nisam siguran kako da odgovorim na to pitanje. Možete pitati o cenama, ukusima, gde kupiti, načinu upotrebe ili sastavu proizvoda."
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
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendButton = document.getElementById('sendMessage');

    // Toggle chat
    if (toggleButton && chatContainer) {
        toggleButton.addEventListener('click', function() {
            const isHidden = chatContainer.style.display === 'none';
            chatContainer.style.display = isHidden ? 'block' : 'none';
            toggleButton.classList.toggle('active');
        });
    }

    // Funkcija za dodavanje poruke
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Funkcija za prepoznavanje pitanja
    function identifyQuestion(input) {
        const lowercaseInput = input.toLowerCase();
        
        for (let category in keywordMap) {
            for (let keyword of keywordMap[category]) {
                if (lowercaseInput.includes(keyword)) {
                    return category;
                }
            }
        }
        return "default";
    }

    // Funkcija za dobijanje odgovora
    function getResponse(input) {
        const questionType = identifyQuestion(input);
        return responses[questionType] || responses["default"];
    }

    // Event listener za slanje poruke
    if (sendButton && userInput) {
        sendButton.addEventListener('click', function() {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                const response = getResponse(message);
                setTimeout(() => addMessage(response), 500);
                userInput.value = '';
            }
        });

        // Enter taster
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
    }
}); 