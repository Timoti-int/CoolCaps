// Funkcionalnost za prodavnicu
document.addEventListener('DOMContentLoaded', function() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const orderDetails = document.getElementById('orderDetails');
    const orderSummary = document.getElementById('orderSummary');
    const totalAmount = document.getElementById('totalAmount');
    const totalPriceInput = document.getElementById('totalPrice');
    const submitButton = document.querySelector('.submit-order-btn');
    const orderForm = document.getElementById('orderForm');

    // Dodajemo event listener za formu
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Zaustavljamo automatsko slanje forme
        
        // Prikazujemo confirm dijalog
        const isConfirmed = confirm('Da li ste sigurni da želite da potvrdite porudžbinu?');
        
        // Ako je korisnik potvrdio, nastavljamo sa slanjem forme
        if (isConfirmed) {
            this.submit();
        }
    });

    // Event listeners za dugmiće + i -
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            if (this.classList.contains('plus')) {
                input.value = parseInt(input.value) + 1;
            } else if (this.classList.contains('minus') && input.value > 0) {
                input.value = parseInt(input.value) - 1;
            }
            updateOrderSummary();
        });
    });

    // Event listeners za direktan unos količine
    quantityInputs.forEach(input => {
        input.addEventListener('input', updateOrderSummary);
    });

    function updateOrderSummary() {
        let total = 0;
        let totalItems = 0;
        let orderText = '';
        let detailsHtml = '';

        quantityInputs.forEach(input => {
            const quantity = parseInt(input.value);
            const price = parseInt(input.dataset.price);
            const productName = input.closest('.product-card').querySelector('h3').textContent;
            
            if (quantity > 0) {
                const subtotal = quantity * price;
                total += subtotal;
                totalItems += quantity;
                
                orderText += `${productName}: ${quantity} kom. (${subtotal} RSD)\n`;
                detailsHtml += `
                    <div class="order-item">
                        <span>${productName}</span>
                        <span>${quantity} x ${price} = ${subtotal} RSD</span>
                    </div>
                `;
            }
        });

        orderDetails.innerHTML = detailsHtml;
        orderSummary.value = orderText;
        totalAmount.textContent = total + ' RSD';
        totalPriceInput.value = total;

        // Omogući dugme za naručivanje ako je minimalna količina dostignuta
        submitButton.disabled = totalItems < 3;
    }
}); 