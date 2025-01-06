// Chatbot logika
const chatbot = {
    greetings: [
        "Zdravo! Kako vam mogu pomoći?",
        "Dobrodošli u PaperMints! Pitajte me šta vas zanima.",
        "Pozdrav! Tu sam da odgovorim na vaša pitanja."
    ],
    responses: {
        "gde kupiti": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
        "cena": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
        "sastav": "PaperMints ne sadrži šećer i koristi pažljivo odabrane sastojke za osveženje daha.",
        "isporuka": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
        "kontakt": "Možete nas kontaktirati putem sekcije za kontakte.",
        "default": "Izvinjavam se, nisam siguran kako da odgovorim na to pitanje. Možete nas kontaktirati direktno za više informacija."
    },

    getGreeting() {
        return this.greetings[Math.floor(Math.random() * this.greetings.length)];
    },

    getResponse(input) {
        input = input.toLowerCase();
        
        for (let key in this.responses) {
            if (input.includes(key)) {
                return this.responses[key];
            }
        }
        return this.responses.default;
    }
};

// DOM elementi
document.addEventListener('DOMContentLoaded', () => {
    const chatHeader = document.querySelector('#chatHeader');
    const chatBody = document.querySelector('.chat-body');
    const chatMessages = document.querySelector('.chat-messages');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');

    // Toggle chat na klik bilo gde u header-u
    chatHeader.addEventListener('click', () => {
        chatBody.style.display = chatBody.style.display === 'none' ? 'block' : 'none';
        if (chatBody.style.display === 'block' && chatMessages.children.length === 0) {
            addMessage(chatbot.getGreeting(), 'bot');
        }
    });

    // Slanje poruke
    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage(chatbot.getResponse(message), 'bot');
            }, 500);
            input.value = '';
        }
    }

    // Event listeneri
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Dodavanje poruke u chat
    function addMessage(text, sender) {
        const message = document.createElement('div');
        message.classList.add('message', `${sender}-message`);
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}); 