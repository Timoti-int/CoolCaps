function scrollToProducts() {
    const productsSection = document.querySelector('.products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function openChat() {
    var chatContainer = document.getElementById('chatContainer');
    if(chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'block';
    } else {
        chatContainer.style.display = 'none';
    }
}

// Verzija sa jQuery (ako je jQuery uključen)
$(document).ready(function() {
    $("#assistantButton").click(function() {
        $("#chatContainer").toggle();
    });
});

// ILI čista JavaScript verzija
document.addEventListener('DOMContentLoaded', function() {
    var assistantButton = document.getElementById('assistantButton');
    var chatContainer = document.getElementById('chatContainer');
    
    assistantButton.onclick = function() {
        if(chatContainer.style.display === 'none') {
            chatContainer.style.display = 'block';
        } else {
            chatContainer.style.display = 'none';
        }
    };

    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    console.log('Chat button:', assistantButton); // Za debugging
    console.log('Chat container:', chatContainer); // Za debugging

    // Početna poruka asistenta
    addMessage('bot', 'Zdravo! Ja sam PaperMints asistent. Kako Vam mogu pomoći?');

    // Funkcija za slanje poruke
    function sendChatMessage() {
        const userInput = document.getElementById('userInput');
        const chatMessages = document.getElementById('chatMessages');
        const message = userInput.value.trim();
        
        if (message) {
            // Dodaj poruku korisnika
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-message';
            userDiv.textContent = message;
            chatMessages.appendChild(userDiv);
            
            // Očisti input
            userInput.value = '';
            
            // Scroll na dno
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simuliraj odgovor bota nakon 1 sekunde
            setTimeout(() => {
                const botDiv = document.createElement('div');
                botDiv.className = 'message bot-message';
                botDiv.textContent = 'Hvala na poruci! Uskoro ću vam odgovoriti.';
                chatMessages.appendChild(botDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
        return false;
    }

    // Funkcija za dodavanje poruke u chat
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listeneri za slanje poruke
    sendButton.addEventListener('click', sendChatMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Provera da li je JavaScript učitan
    console.log('JavaScript is loaded');
});

// Za testiranje
console.log('Script loaded');
document.getElementById('assistantButton').addEventListener('click', function() {
    console.log('Button clicked');
});

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer.style.display === 'none') {
        chatContainer.style.display = 'block';
        setTimeout(() => chatContainer.classList.add('active'), 10);
    } else {
        chatContainer.classList.remove('active');
        setTimeout(() => chatContainer.style.display = 'none', 300);
    }
}

function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';

    // Simuliramo razmišljanje asistenta
    setTimeout(() => {
        // Osnovni odgovori
        if (lowerMessage.includes('zdravo') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
            response = 'Zdravo! Kako Vam mogu pomoći?';
        }
        else if (lowerMessage.includes('cena') || lowerMessage.includes('koštaju')) {
            response = 'Za informacije o cenama, molimo Vas kontaktirajte nas putem telefona ili email-a.';
        }
        else if (lowerMessage.includes('gde kupiti') || lowerMessage.includes('kupovina')) {
            response = 'Naše proizvode možete kupiti u svim većim maloprodajnim objektima.';
        }
        else if (lowerMessage.includes('sastav') || lowerMessage.includes('sastojci')) {
            response = 'Naši proizvodi su napravljeni od najkvalitetnijih prirodnih sastojaka.';
        }
        else if (lowerMessage.includes('kontakt') || lowerMessage.includes('telefon') || lowerMessage.includes('email')) {
            response = 'Možete nas kontaktirati putem email-a: info@papermints.com ili telefona: +381 XX XXX XXX';
        }
        else {
            response = 'Izvinite, nisam siguran kako da odgovorim na to pitanje. Možete li ga preformulisati ili postaviti drugo pitanje?';
        }
        
        addMessage('bot', response);
    }, 1000);
}

function handleSubmit(event) {
    event.preventDefault(); // Sprečava refresh stranice
    
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = userInput.value.trim();
    
    if (message) {
        // Dodaj poruku korisnika
        const userDiv = document.createElement('div');
        userDiv.className = 'message user-message';
        userDiv.textContent = message;
        chatMessages.appendChild(userDiv);
        
        // Očisti input
        userInput.value = '';
        
        // Scroll na dno
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simuliraj odgovor bota nakon 1 sekunde
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-message';
            botDiv.textContent = 'Hvala na poruci! Uskoro ću vam odgovoriti.';
            chatMessages.appendChild(botDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
} 