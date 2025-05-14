    // Función para abrir el modal de facturación
    function openFacturacionModal() {
        const modal = document.getElementById("facturacion-modal");
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }

     // Script para abrir/cerrar el menú
     function toggleMenu() {
        const menu = document.getElementById("mobile-menu");
        menu.classList.toggle("hidden");
    }
    


    // Función para cerrar el modal de facturación
    function closeFacturacionModal() {
        const modal = document.getElementById("facturacion-modal");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }



    //trata de obtener un numero de orden existente 

    const obj = JSON.parse(localStorage.getItem('NumeroDeOrden'));
    console.log(obj);
    console.log(obj.orden + "linea 30 imprime");



    // Simulación de agregar orden a las mesas
    let orders = { 1: null, 2: null, 3: null, 4: null };

    function generateOrderNumber() {
        return Math.floor(Math.random() * 1000);
    }

    function updateOrderNumber(mesaId) {




        //genera nuevo numero de orden


        const orderNumber = Math.floor(Math.random() * 1000);
        const orderKey = 'NumeroDeOrden';
        const orderData = {
            mesa: mesaId,
            orden: orderNumber,
            productos: []
        };
        localStorage.setItem(orderKey, JSON.stringify(orderData));

        document.getElementById(`order-number-${mesaId}`).textContent = `Orden: ${obj.orden}`;

    }


    /*
    // Redirigir a la página de menú
    document.getElementById('order-btn-1').addEventListener('click', function () {
        updateOrderNumber(1);
        window.location.href = 'menu2.html?mesa=1';

    });

    document.getElementById('order-btn-2').addEventListener('click', function () {
        updateOrderNumber(2);
        window.location.href = 'menu2.html?mesa=2';
    });

    document.getElementById('order-btn-3').addEventListener('click', function () {
        updateOrderNumber(3);
        window.location.href = 'menu2.html?mesa=3';
    });

    document.getElementById('order-btn-4').addEventListener('click', function () {
        updateOrderNumber(4);
        window.location.href = 'menu2.html?mesa=4';
    });

*/

    /*
    //Funcionalidad para la facturación
    document.getElementById('finalizar-facturacion').addEventListener('click', function () {
        const mesaSeleccionada = document.getElementById('mesa-select').value;
        const orderNumber = orders[mesaSeleccionada];
        document.getElementById('order-summary').textContent = `Resumen de la Orden: ${orderNumber}`;
    });
    */



document.addEventListener('DOMContentLoaded', () => {


   

})