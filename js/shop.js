// Funkcionalnost za prodavnicu
document.addEventListener('DOMContentLoaded', function() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const orderForm = document.getElementById('orderForm');
    const orderDetails = document.getElementById('orderDetails');
    const totalAmount = document.getElementById('totalAmount');
    const submitButton = document.querySelector('.submit-order-btn');

    // Funkcija za ažuriranje ukupne cene i detalja porudžbine
    function updateOrderSummary() {
        let total = 0;
        let totalItems = 0;
        let details = '';
        let orderText = '';

        quantityInputs.forEach(input => {
            const quantity = parseInt(input.value);
            const price = parseInt(input.dataset.price);
            const productName = input.closest('.product-card').querySelector('h3').textContent;
            
            if (quantity > 0) {
                const subtotal = quantity * price;
                total += subtotal;
                totalItems += quantity;
                details += `<p>${productName} x ${quantity} = ${subtotal} RSD</p>`;
                orderText += `${productName}: ${quantity} kom. (${subtotal} RSD)\n`;
            }
        });

        orderDetails.innerHTML = details;
        totalAmount.textContent = `${total} RSD`;
        
        // Ažuriranje skrivenih polja za FormSubmit
        document.getElementById('orderSummary').value = orderText;
        document.getElementById('totalPrice').value = `${total} RSD`;
        
        // Omogući dugme samo ako je ukupna količina 3 ili više
        submitButton.disabled = totalItems < 3;
    }

    // Event listeneri za dugmiće + i -
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            const currentValue = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                input.value = currentValue + 1;
            } else if (this.classList.contains('minus') && currentValue > 0) {
                input.value = currentValue - 1;
            }
            
            updateOrderSummary();
        });
    });

    // Event listener za direktan unos količine
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < 0) this.value = 0;
            updateOrderSummary();
        });
    });

    // Event listener za slanje forme
    orderForm.addEventListener('submit', function(e) {
        let totalItems = 0;
        quantityInputs.forEach(input => {
            totalItems += parseInt(input.value);
        });

        if (totalItems < 3) {
            e.preventDefault();
            alert('Minimalna porudžbina je 3 komada.');
            return;
        }

        if (!confirm('Da li ste sigurni da želite da pošaljete porudžbinu?')) {
            e.preventDefault();
            return;
        }
    });
}); 