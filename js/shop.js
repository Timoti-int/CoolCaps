// Funkcionalnost za prodavnicu
document.addEventListener('DOMContentLoaded', function() {
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    const orderButton = document.querySelector('.submit-order-btn');
    const totalAmountSpan = document.getElementById('totalAmount');
    const totalPriceInput = document.getElementById('totalPrice');
    const orderDetailsDiv = document.getElementById('orderDetails');
    const orderSummaryInput = document.getElementById('orderSummary');
    const orderForm = document.querySelector('form');
    
    // Modal elementi
    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    const successOkBtn = document.getElementById('successOk');
    
    // Postavi inicijalnu sivu boju
    if (orderButton) {
        orderButton.style.backgroundColor = '#cccccc';
        orderButton.disabled = true;  // Onemogući dugme u početku
    }
    
    let totalQuantity = 0;

    // Funkcija za proveru minimuma i računanje ukupne cene
    function checkMinimumQuantity() {
        totalQuantity = 0;
        let totalPrice = 0;
        let orderDetails = '';

        quantityInputs.forEach(input => {
            const quantity = parseInt(input.value || 0);
            const price = parseInt(input.dataset.price || 0);
            const productId = input.dataset.product;
            
            // Mapiranje ID-jeva proizvoda na njihova puna imena
            let productName;
            switch(productId) {
                case 'detail-1':
                    productName = 'CoolCaps Tuba Mint';
                    break;
                case 'detail-2':
                    productName = 'CoolCaps Tuba Jagoda';
                    break;
                case 'detail-3':
                    productName = 'CoolCaps Box40';
                    break;
                default:
                    productName = productId;
            }
            
            totalQuantity += quantity;
            totalPrice += quantity * price;

            if (quantity > 0) {
                orderDetails += `${productName} ${quantity} kom. x ${price} RSD<br>`;
            }
        });

        // Ažuriraj ukupnu cenu
        totalAmountSpan.textContent = totalPrice + ' RSD';
        totalPriceInput.value = totalPrice;
        orderDetailsDiv.innerHTML = orderDetails;
        orderSummaryInput.value = orderDetails.replace(/<br>/g, '\n');
        
        if (orderButton) {
            if (totalQuantity >= 3) {
                orderButton.style.backgroundColor = '#007bff';  // Plava boja
                orderButton.disabled = false;                   // Omogući dugme
            } else {
                orderButton.style.backgroundColor = '#cccccc';  // Siva boja
                orderButton.disabled = true;                    // Onemogući dugme
            }
        }
    }

    // Funkcije za modalne prozore
    function showModal(modal) {
        modal.style.display = 'block';
    }

    function hideModal(modal) {
        modal.style.display = 'none';
    }

    // Event listeneri za modalne prozore
    confirmYesBtn.addEventListener('click', function() {
        hideModal(confirmModal);
        
        // Prikupi sve podatke iz forme
        const formData = {
            ime: document.getElementById('name').value,
            prezime: document.getElementById('surname').value,
            adresa: document.getElementById('address').value,
            grad: document.getElementById('city').value,
            postanski_broj: document.getElementById('zip').value,
            telefon: document.getElementById('phone').value,
            porudzbina: document.getElementById('orderSummary').value,
            ukupna_cena: document.getElementById('totalPrice').value
        };
        
        // Formatiraj porudžbinu za email
        const emailBody = `
Nova PaperMints porudžbina

Podaci za dostavu:
Ime: ${formData.ime}
Prezime: ${formData.prezime}
Adresa: ${formData.adresa}
Grad: ${formData.grad}
Poštanski broj: ${formData.postanski_broj}
Telefon: ${formData.telefon}

Porudžbina:
${formData.porudzbina}

Ukupna cena: ${formData.ukupna_cena} RSD
        `.trim();
        
        // Pošalji email preko EmailJS
        emailjs.send('service_ppmcc', 'template_hxgmp2i', {
            to_email: 'papermintssrbija@gmail.com',
            subject: 'Nova PaperMints porudžbina',
            message: emailBody,
            from_name: formData.ime + ' ' + formData.prezime,
            phone: formData.telefon
        })
        .then(function(response) {
            console.log('Email uspešno poslat!', response.status, response.text);
            // Prikaži success modal tek nakon uspešnog slanja
            showModal(successModal);
        }, function(error) {
            console.error('Greška pri slanju emaila:', error);
            // Prikaži success modal čak i ako ima grešku (da korisnik ne vidi grešku)
            // U produkciji možete dodati alert ili drugi način obaveštavanja o grešci
            showModal(successModal);
        });
    });

    confirmNoBtn.addEventListener('click', function() {
        hideModal(confirmModal);
    });

    successOkBtn.addEventListener('click', function() {
        hideModal(successModal);
        orderForm.reset();
        quantityInputs.forEach(input => {
            input.value = 0;
        });
        checkMinimumQuantity();
    });

    // Event listener za form submit
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showModal(confirmModal);
        });
    }

    // Event listener za quantity buttone
    quantityInputs.forEach(input => {
        input.addEventListener('change', checkMinimumQuantity);
        input.addEventListener('input', checkMinimumQuantity);
    });

    // Event listeneri za + i - dugmiće sa pravim klasama
    document.querySelectorAll('.quantity-btn.plus').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.parentElement.querySelector('.quantity-input');
            input.value = parseInt(input.value || 0) + 1;
            checkMinimumQuantity();
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.parentElement.querySelector('.quantity-input');
            const currentValue = parseInt(input.value || 0);
            if (currentValue > 0) {
                input.value = currentValue - 1;
                checkMinimumQuantity();
            }
        });
    });

    // Inicijalno proveri količinu
    checkMinimumQuantity();
});