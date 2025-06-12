document.addEventListener('DOMContentLoaded', function () {
    orders = [];
    //Cliente
    const nitInput = document.getElementById('nit');
    const nameInput = document.getElementById('nombre_factura');
    const emailInput = document.getElementById('email_cliente');
    //Pago
    const efectivoRadio = document.getElementById('efectivoRadio');
    const efectivoSection = document.getElementById('efectivoSection');
    const pagoForm = document.getElementById('pagoForm');
    const efectivoRecibido = document.getElementById('efectivo_recibido');
    const cambioDiv = document.getElementById('cambio');
    const advertenciaDiv = document.getElementById('advertencia');
    const submitBtn = document.getElementById('submitBtn');
    let itemElement = document.querySelector(".orderSample");
    let porcentajePropina = 10;
    //Factura panel
    const confirmationPanel = document.getElementById('confirmationPanel');
    const sendPdfBtn = document.getElementById('sendPdfBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const goHomeBtn = document.getElementById('goHomeBtn');


    let subtotal = 0;
    let tip = 0;
    let total = 0;

    orders = GetSavedOrders();
    let order = orders[localStorage.getItem('currentOrder')]
    StartPayment()

    function StartPayment() {
        let newItem = itemElement;
        // Número de orden y estado
        newItem.querySelector("h2").innerHTML = "Orden #" + order.newOrder.id;
        newItem.querySelector('[data-status]').innerHTML = order.newOrder.status;
        nameInput.value = order.newOrder.customer.name;
        //Resumen de orden
        const list = newItem.querySelector(".orderList");
        list.innerHTML = "";
        order.newOrder.products.forEach(item => {
            const li = document.createElement('li');
            li.className = "flex justify-between";
            li.innerHTML = `
            <span>${item.name}</span>
            <span>Q${item.price.toFixed(2)}</span>
        `;
            list.appendChild(li);
            // Si hay nota especial
            if (item.note && item.note.trim() !== "") {
                let ul = document.createElement('ul');
                ul.className = "list-inside ml-8 text-red-700";
                let liNote = document.createElement('li');
                liNote.innerText = item.note;
                ul.appendChild(liNote);
                list.appendChild(ul);
            }
        });

        // Subtotal
        subtotal = order.newOrder.products.reduce((sum, item) => sum + item.price, 0);
        actualizarResumenPropina()
    }

    function FinishPayment() {
        order.newOrder.customer.name = nameInput.value;
        order.newOrder.customer.NIT = nitInput.value;
        order.newOrder.customer.email = emailInput.value;

        order.newOrder.status = "Pagada";
        order.newOrder.tip = tip;
        UpdateOrders(orders); //update db
    }


    const propinaBtns = document.querySelectorAll('.propina-btn');
    propinaBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Quitar estilos de seleccionado de todos los botones
            propinaBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('bg-gray-200');
            });
            // Agregar estilo azul al botón seleccionado
            btn.classList.remove('bg-gray-200');
            btn.classList.add('bg-blue-600', 'text-white');

            porcentajePropina = parseInt(btn.getAttribute('data-propina'));
            actualizarResumenPropina();
        });
    });

    // Función para actualizar el resumen de la orden con la propina seleccionada
    function actualizarResumenPropina() {
        tip = subtotal * (porcentajePropina / 100);
        total = subtotal + tip;

        itemElement.querySelector('#order-subtotal').textContent = `Q${subtotal.toFixed(2)}`;
        itemElement.querySelector('#order-tip').textContent = `Q${tip.toFixed(2)}`;
        itemElement.querySelector('#order-total').textContent = `Q${total.toFixed(2)}`;
        document.getElementById('order-tip-percent').textContent = `${porcentajePropina}%`;
    }

    // Mostrar/ocultar campo de efectivo según selección
    document.querySelectorAll('input[name="metodo_pago"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (efectivoRadio.checked) {
                efectivoSection.classList.remove('hidden');
                efectivoRecibido.required = true;
                calcularCambioYAdvertencia();
            } else {
                efectivoSection.classList.add('hidden');
                efectivoRecibido.required = false;
                efectivoRecibido.value = '';
                cambioDiv.textContent = '';
                advertenciaDiv.textContent = '';
                submitBtn.disabled = false;
            }
        });
    });

    function calcularCambioYAdvertencia() {
        // Calcula el subtotal y la propina según el resumen actual
        tip = subtotal * (porcentajePropina / 100);
        total = subtotal + tip;

        // Lee el valor ingresado por el usuario
        const efectivoVal = parseFloat(efectivoRecibido.value) || 0;

        // Validación y mensajes
        if (efectivoVal >= total) {
            cambioDiv.textContent = `Cambio: Q. ${(efectivoVal - total).toFixed(2)}`;
            advertenciaDiv.textContent = '';
            submitBtn.disabled = false;
        } else {
            cambioDiv.textContent = '';
            advertenciaDiv.textContent = `Falta recibir: Q. ${(total - efectivoVal).toFixed(2)}`;
            submitBtn.disabled = true;
        }
    }

    efectivoRecibido.addEventListener('input', calcularCambioYAdvertencia);

    // Cuando cambia la propina, también recalcula el cambio si el campo de efectivo está visible
    propinaBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!efectivoSection.classList.contains('hidden')) {
                calcularCambioYAdvertencia();
            }
        });
    });

    pagoForm.addEventListener('submit', function (e) {
        if (efectivoRadio.checked) {
            tip = subtotal * (porcentajePropina / 100);
            total = subtotal + tip;
            const efectivoVal = parseFloat(efectivoRecibido.value) || 0;
            if (efectivoVal < total) {
                e.preventDefault();
                advertenciaDiv.textContent = `Falta recibir: Q. ${(total - efectivoVal).toFixed(2)}`;
                submitBtn.disabled = true;
            }
        }
    });

    const metodoBtns = document.querySelectorAll('.metodo-btn');
    metodoBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            metodoBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'selected', 'ring-2', 'ring-blue-500');
            });
            btn.classList.add('bg-blue-600', 'text-white', 'selected', 'ring-2', 'ring-blue-500');

            // Sincronizar con el radio correspondiente
            const metodo = btn.getAttribute('data-metodo');
            document.getElementById(metodo + 'Radio').checked = true;
            document.getElementById(metodo + 'Radio').dispatchEvent(new Event('change'));
        });
    });

    submitBtn.addEventListener('click', function () {
        FinishPayment();
        confirmationPanel.classList.remove('hidden');
    })

    sendPdfBtn.addEventListener('click', function () {
        alert('Se ha enviado PDF por email. ;)');
    });

    downloadPdfBtn.addEventListener('click', function () {
        // Aquí llamas tu función para descargar el PDF
        generarPDFFactura(order)
        alert('Se descargo el PDF.');
    });

    goHomeBtn.addEventListener('click', function () {
        // Redirige a la página de inicio
        window.location.href = 'factuacionPage.html';
    });

    nitInput.addEventListener('input', function () {
        if (nitInput.value.length > 7) {
            order.newOrder.customer.NIT = nitInput.value;
            //nitInput.disabled = true;
        }
    });

    nameInput.addEventListener('input', function () {
        order.newOrder.customer.name = nameInput.value;
    });

    emailInput.addEventListener('input', function () {
        order.newOrder.customer.email = emailInput.value;
    });

});
