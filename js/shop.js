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
            const productName = input.dataset.product;
            
            totalQuantity += quantity;
            totalPrice += quantity * price;

            if (quantity > 0) {
                orderDetails += `${productName}: ${quantity} kom x ${price} RSD\n`;
            }
        });

        // Ažuriraj ukupnu cenu
        totalAmountSpan.textContent = totalPrice + ' RSD';
        totalPriceInput.value = totalPrice;
        orderDetailsDiv.textContent = orderDetails;
        orderSummaryInput.value = orderDetails;
        
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
        const formData = new FormData(orderForm);
        
        // Prvo prikaži success modal
        showModal(successModal);
        
        // Zatim pošalji formu
        fetch(orderForm.action, {
            method: 'POST',
            body: formData
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