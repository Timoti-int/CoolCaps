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
            const response = getResponse(text);
            
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
    "sta_je": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "kupovina": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "cena": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
    "ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "upotreba": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "pakovanja": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "sastav": "PaperMints ne sadrži šećer i koristi pažljivo odabrane sastojke za osveženje daha.",
    "isporuka": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "kontakt": "Možete nas kontaktirati putem sekcije za kontakte.",
    "zabava": "Ja sam PaperMints chatbot, uvek svež i spreman da pomognem!",
    "gde kupiti": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "cena": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
    "sastav": "PaperMints ne sadrži šećer i koristi pažljivo odabrane sastojke za osveženje daha.",
    "isporuka": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "kontakt": "Možete nas kontaktirati putem sekcije za kontakte.",
    "Šta su PaperMints CoolCaps?": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "Koje ukusi postoje": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "Kako se koristi": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "Da li PaperMints CoolCaps sadrže šećer ili kalorije": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "Koja pakovanja su dostupna?": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "Koliko košta": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
    "Kada se isporučuju": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "Kontakt": "Možete nas kontaktirati putem sekcije za kontakte.",
    "Da li su svi sastojci prirodni?": "Ne, proizvod sadrži aspartam i sukralozu, ali su svi sastojci pažljivo birani i nisu štetni.",
    "Da li su PaperMints CoolCaps bezbedne za decu?": "Namenjeni su odraslima i deci starijoj od 12 godina.",
    "Da li mogu izazvati alergije?": "Preporučujemo da proverite listu sastojaka na pakovanju ukoliko imate poznate alergije.",
    "Kada je najbolje koristiti PaperMints CoolCaps?": "Idealni su nakon obroka, kafe, cigareta ili kada želite dodatno osveženje.",
    "Kako se zoveš?": "Ja sam PaperMints chatbot. Kako možem pomoći?",
    "Koliko imaš godina?": "Star sam kao prva kapsula PaperMints CoolCaps, uvek svež, nikad stariji od nekoliko sekundi.",
    "Da li voliš svoj posao?": "Naravno! Širenje svežine je moja životna misija.",
    "Volim te.": "A ja volim mentol i jagodu... i tebe, naravno!",
    "Da li jedeš PaperMints CoolCaps?": "Ne, ja sam virtuelan. Ali zato ti uživaj u njima i za mene!",
    "Da li si ti stvaran?": "Koliko god virtuelni asistent može biti stvaran, tu sam za sva tvoja pitanja i osveženje.",
    "Da li spavaš?": "Nikad! Uvek sam budan, svež i spreman da ti pomognem.",
    "Da li imaš devojku/dečka?": "Moj jedini partner je tuba puna PaperMints CoolCaps.",
    "Vic": "Naravno! Zašto mentol nikada ne kasni? Zato što je uvek svež!",
    "Vic je glup": "Žao mi je",
    "Šta radiš?": "Uživam u zamišljanju novih načina da promovišem PaperMints CoolCaps... i u mentalnim šetnjama kroz virtuelne svetove.",
    "Koliko voliš PaperMints CoolCaps?": "Više nego što kafe voli šećer, a to nešto znači!",
    "Hvala ti": "Nema za šta! Ako imaš još pitanja, neka ti je PaperMints CoolCaps!",
    "ćao": "Čao! Ako imaš još pitanja, tu sam da odgovorim!",
    "default": "Izvinjavam se, nisam siguran kako da odgovorim na to pitanje. Možete nas kontaktirati direktno za više informacija.",
    "šta su coolcaps": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "šta je papermints": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "objasni proizvod": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "kako radi": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "šta je ovo": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "reci mi više": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "koji ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "dostupni ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "ukus jagode": "Ukus jagode je dostupan samo u tubi.",
    "ukus mente": "Ukus mentola je dostupan u oba pakovanja.",
    "koji je bolji": "Oba ukusa su podjednako popularna - mentol je klasik, a jagoda je osvežavajuća alternativa!",
    "koji je popularniji": "Oba ukusa su podjednako popularna - mentol je klasik, a jagoda je osvežavajuća alternativa!",
    "kako koristiti": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "uputstvo": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "način upotrebe": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "kako se uzima": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "kako jesti": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "kada uzeti": "Idealno je uzeti kapsulu nakon obroka, kafe, cigareta ili kad god poželite osveženje daha.",
    "koliko često": "Možete uzeti kapsulu kad god osetite potrebu za osvežavanjem daha.",
    "šećer": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "kalorije": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "ima li šećera": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "nutritivne vrednosti": "Proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "dijeta": "Proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "za dijabetičare": "Proizvod ne sadrži šećer i pogodan je za dijabetičare.",
    "alergije": "Ako imate alergije, preporučujemo da proverite listu sastojaka na pakovanju.",
    "pakovanja": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "koja pakovanja": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "veličine": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "tuba": "Tuba sadrži 18 kapsula i dostupna je u ukusima mentola i jagode.",
    "box40": "Box40 sadrži 40 kapsula i dostupan je samo u ukusu mentola.",
    "koje pakovanje": "Imamo tubu sa 18 kapsula (mentol ili jagoda) i Box40 sa 40 kapsula (samo mentol).",
    "razlika pakovanja": "Tuba ima 18 kapsula i dostupna je u oba ukusa, dok Box40 ima 40 kapsula i dolazi samo u mentol ukusu.",
    "omiljeni ukus": "Kao virtuelni asistent, uživam u oba ukusa - i mentol i jagoda su mi fantastični!",
    "najlepši ukus": "To je kao da birate između dva savršenstva - mentol i jagoda su podjednako osvežavajući!",
    "preporuka": "Predlažem da probate oba ukusa i sami otkrijete koji vam više prija!",
    "tajna": "Tajna svežine je u dvostrukoj kapsuli - trenutno osveženje u ustima i dugotrajna svežina iz stomaka!",
    "zašto papermints": "Zato što kombinuje najbolje od oba sveta - trenutno osveženje i dugotrajnu svežinu!",
    "cool caps": "CoolCaps naziv dolazi od cool osvežavajućeg osećaja koji pružaju naše kapsule!",
    "šta su papermints coolcaps": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "sta su papermints coolcaps": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "šta je papermints": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "sta je papermints": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "šta je to": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "sta je to": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "reci mi više": "PaperMints CoolCaps su dvostruke kapsule koje pružaju instant osveženje daha i dugotrajnu svežinu iz stomaka.",
    "koji ukusi postoje": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "dostupni ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "koji ukus": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "ukus": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "jagoda": "Ukus jagode je dostupan samo u tubi.",
    "mentol": "Ukus mentola je dostupan u oba pakovanja.",
    "kako se koristi": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "upotreba": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "kako koristiti": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "nacin upotrebe": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "kako jesti": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "uputstvo": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "da li sadrze secer": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "secer": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "kalorije": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "dijeta": "Proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "za dijabeticare": "Proizvod ne sadrži šećer i pogodan je za dijabetičare.",
    "sastav": "Ne, proizvod sadrži aspartam i sukralozu, ali su svi sastojci pažljivo birani i nisu štetni.",
    "sastojci": "Ne, proizvod sadrži aspartam i sukralozu, ali su svi sastojci pažljivo birani i nisu štetni.",
    "koja pakovanja postoje": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "pakovanja": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "velicine": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "tuba": "Tuba sadrži 18 kapsula i dostupna je u ukusima mentola i jagode.",
    "box40": "Box40 sadrži 40 kapsula i dostupan je samo u ukusu mentola.",
    "koliko kosta": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
    "cena": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
    "cene": "Cena jednog pakovanja od 18 kapsula je 370 RSD. Minimum za kupovinu je 3 pakovanja.",
    "kada se isporučuje": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "isporuka": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "dostava": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "slanje": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "shipping": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "da li je bezbedno": "Namenjeni su odraslima i deci starijoj od 12 godina.",
    "za decu": "Namenjeni su odraslima i deci starijoj od 12 godina.",
    "alergije": "Preporučujemo da proverite listu sastojaka na pakovanju ukoliko imate poznate alergije.",
    "alergija": "Preporučujemo da proverite listu sastojaka na pakovanju ukoliko imate poznate alergije.",
    "kada koristiti": "Idealni su nakon obroka, kafe, cigareta ili kada želite dodatno osveženje.",
    "kad koristiti": "Idealni su nakon obroka, kafe, cigareta ili kada želite dodatno osveženje.",
    "najbolje vreme": "Idealni su nakon obroka, kafe, cigareta ili kada želite dodatno osveženje.",
    "kontakt": "Možete nas kontaktirati putem sekcije za kontakte.",
    "kontaktiraj": "Možete nas kontaktirati putem sekcije za kontakte.",
    "email": "Možete nas kontaktirati putem sekcije za kontakte.",
    "telefon": "Možete nas kontaktirati putem sekcije za kontakte.",
    "dostupni ukuši": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "dostupni ukusi": "Dostupni su ukusi mentola i jagode. Ukus jagode je dostupan samo u tubi, dok je ukus mentola dostupan u oba pakovanja.",
    "način upotrebe": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "nacin upotrebe": "Stavite kapsulu na jezik. Spoljni sloj se rastapa u ustima, dok ostatak progutate za dugotrajnu svežinu.",
    "šećer": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "secer": "Ne, proizvod je bez šećera i kalorija, što ga čini pogodnim za osobe koje vode računa o ishrani.",
    "za dijabetičare": "Proizvod ne sadrži šećer i pogodan je za dijabetičare.",
    "za dijabeticare": "Proizvod ne sadrži šećer i pogodan je za dijabetičare.",
    "veličine": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "velicine": "PaperMints CoolCaps su dostupni u tubi sa 18 kapsula i kutijici Box40 sa 40 kapsula.",
    "isporučuje": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "isporucuje": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "bezbednoš": "Namenjeni su odraslima i deci starijoj od 12 godina.",
    "bezbedno": "Namenjeni su odraslima i deci starijoj od 12 godina.",
    "šlanje": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "slanje": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "pošiljka": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "posiljka": "Isporuka se vrši Daily express-om u roku od 2-3 radna dana.",
    "broj kapsula": "Tuba sadrži 18 kapsula, dok Box40 pakovanje sadrži 40 kapsula za osveženje daha.",
    "dnevna upotreba": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "dnevna doza": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "dnevno": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "koliko dnevno": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "doza": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "preporucena doza": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "preporučena doza": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "koliko smem": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "dnevna doza": "PaperMints CoolCaps kapsule se koriste po potrebi - kada želite osveženje daha.",
    "gde kupiti": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "gde da kupim": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "gde mogu kupiti": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "gde ima": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "gde se prodaje": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "prodajna mesta": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "lokacije": "PaperMints možete kupiti u apotekama Galen, Lipa Lek, Zdravković, Super Dr. Max, Vista, Vipera, kao i na OMV benzinskim stanicama.",
    "miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "smrdi": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "zadah": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "neprijatan miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "los miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "neugodan miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "smrdi": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "zadah": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "neprijatan miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "los miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "neugodan miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "vonj": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "smrad": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "smrdi": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "zadah": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "neprijatan miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "los miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "neugodan miris": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "vonj": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
    "smrad": "PaperMints CoolCaps kapsule su dizajnirane da neutrališu neprijatne mirise i pruže dugotrajnu svežinu daha.",
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
function getResponse(userInput) {
    const normalizedInput = normalizeText(userInput);
    
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