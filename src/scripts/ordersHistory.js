
document.addEventListener('DOMContentLoaded', () => {
    const lineaSample = document.getElementById("linea-sample");
    const container = document.getElementById("grid-container");
    const panel = document.getElementById('order-details-panel');
    const closeBtn = document.getElementById('close-order-details');

    let orders = GetSavedOrders();

    container.innerHTML = "";
    orders.forEach(order => {
        let lineaObj = lineaSample.cloneNode(true);
        lineaObj.querySelector('[data-id]').innerHTML = `#${order.newOrder.id}`;
        lineaObj.querySelector('[data-name]').innerHTML = `${order.newOrder.customer.name}`;
        const formatted = new Date(order.newOrder.orderDate).toLocaleDateString('en-GB');
        lineaObj.querySelector('[data-date]').innerHTML = formatted;
        lineaObj.querySelector('[data-status]').innerHTML = order.newOrder.status;

        const total = order.newOrder.products.reduce((sum, prod) => sum + prod.price, 0);
        const tip = parseFloat(order.newOrder.tip || 0);
        lineaObj.querySelector('[data-total]').innerHTML = (total+tip).toFixed(2);

        lineaObj.addEventListener('click', () => {
            //alert("En la siguiente actualizacion se abrira un panel para mostrar todos los detalles de la orden #"+order.newOrder.id);
            renderOrderDetails(order.newOrder)
        });
        container.appendChild(lineaObj);
    });
    if (closeBtn && panel) {
        closeBtn.addEventListener('click', () => {
            panel.classList.add('hidden');
            panel.classList.remove('flex');
        });
        // Cierra al hacer click en el fondo oscuro
        panel.addEventListener('click', (e) => {
            if (e.target === panel) {
                panel.classList.add('hidden');
                panel.classList.remove('flex');
            }
        });
    }
});

function renderOrderDetails(order) {
    const panel = document.getElementById('order-details-panel');
    const content = document.getElementById('order-details-content');
    if (!panel || !content) return;

    // Formatea la fecha
    const date = new Date(order.orderDate);
    const formattedDate = date.toLocaleDateString('es-ES');

    // Agrupa productos por id y nota
    const productMap = {};
    order.products.forEach(prod => {
        const key = prod.id + (prod.note || '');
        if (!productMap[key]) {
            productMap[key] = { ...prod, quantity: 1 };
        } else {
            productMap[key].quantity += 1;
        }
    });
    const products = Object.values(productMap);

    // Calcula el total
    const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const tip = parseFloat(order.tip || 0);

    // Construye el HTML de los productos
    const productRows = products.map(prod => `
        <div class="flex flex-col md:flex-row md:items-center bg-gray-50 rounded p-2">
            <div class="flex-1">
                <div class="font-medium md:font-normal">${prod.name}</div>
                ${prod.note ? `<div class="text-xs text-blue-600">Nota: ${prod.note}</div>` : ''}
            </div>
            <div class="flex md:hidden text-sm text-gray-700">
                <span class="font-semibold">Cantidad:</span> ${prod.quantity}
            </div>
            <div class="flex md:hidden text-sm text-gray-700">
                <span class="font-semibold">Precio:</span> Q${prod.price.toFixed(2)}
            </div>
            <div class="flex md:hidden text-sm text-gray-800">
                <span class="font-semibold">Subtotal:</span> Q${(prod.price * prod.quantity).toFixed(2)}
            </div>
            <div class="hidden md:flex w-24 justify-center items-center">
                ${prod.quantity}
            </div>
            <div class="hidden md:flex w-28 justify-center items-center font-semibold">
                Q${prod.price.toFixed(2)}
            </div>
            <div class="hidden md:flex w-28 justify-end items-center font-semibold">
                Q${(prod.price * prod.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');

    // Actualiza el contenido del panel
    content.innerHTML = `
        <div class="flex flex-col space-y-6">

            <!-- Encabezado de la orden -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4">
                <div>
                    <div class="text-lg font-semibold">Orden #${order.id}</div>
                    <div class="text-sm text-gray-600 font-semibold">Fecha: <span class="font-normal">${formattedDate}</span></div>
                </div>
            </div>

            <!-- Cliente -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4">
                <div>
                    <p class="text-gray-600 font-semibold">Cliente: <span class="font-normal">${order.customer.name}</span></p>
                </div>
                <div class="mt-2 md:mt-0">
                    <p class="text-gray-600 font-semibold">NIT: <span class="font-normal">${order.customer.NIT}</span></p>
                </div>
                <div class="text-gray-600 font-semibold">Estado: <span class="font-normal">${order.status}</span></div>
                <div class="mt-2 md:mt-0">
                    <p class="text-gray-600 font-semibold">Atendió: <span class="font-normal">${order.employee.name}</span></p>
                </div>
            </div>

            <!-- Productos -->
            <div class="mt-8">
                <div class="bg-white rounded-lg shadow p-6 flex flex-col ">
                    <div class="hidden md:flex font-semibold border-b pb-1">
                        <div class="flex-1">Producto</div>
                        <div class="w-24 text-center">Cantidad</div>
                        <div class="w-28 text-center">Precio unitario</div>
                        <div class="w-28 text-right">Subtotal</div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        ${productRows}
                    </div>
                    <div class="text-right text-base font-semibold text-gray-800 border-t pt-4">
                        Propina: Q${tip.toFixed(2)}
                    </div>
                    <div class="text-right text-lg font-bold text-gray-800">
                        Total: Q${(total + tip).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Muestra el panel
    panel.classList.remove('hidden');
    panel.classList.add('flex');

    // Asigna función al botón de imprimir
    const printBtn = document.getElementById('print-invoice-btn');
    if (printBtn) {
        printBtn.onclick = () => {
            generarPDFFactura(order)
        };
    }

    const sendBtn = document.getElementById('send-email-btn');
    if (sendBtn) {
        sendBtn.onclick = () => {
            alert("Actualiza a premium para esta funcion ;)")
        };
    }
}