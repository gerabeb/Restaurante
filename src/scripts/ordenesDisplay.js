orders = [];

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('orders-container');
    let itemElement = container.querySelector(".orderSample");
    const pendientesBtn = document.getElementById("mostrar-pendientes");
    const completadasBtn = document.getElementById('mostrar-completadas')

    function ClearContainer() {
        for (let i = container.childElementCount; i > 0; i--) {
            container.children[0].remove();
        }
        completadasBtn.classList.remove("underline");
        pendientesBtn.classList.remove("underline");
    }

    function MarkComplete(index) {
        console.log("Marcar como completa a " + index)
        orders[index].newOrder.status = "Completada";
        //console.log(orders)
        UpdateOrders(orders);   //GUARDAR CAMBIOS EN DB
        RefreshItems("En preparacion");
    }

    function RefreshItems(stat = "") {
        ClearContainer();

        orders = GetSavedOrders();

        //Checkear si hay ordenes con la misma categoria
        const ordersFiltered = orders.filter(order => order.newOrder?.status === stat);
        if (ordersFiltered.length == 0) {
            let message = document.createElement('p');
            message.innerHTML = "No hay elementos que mostrar :)"
            container.appendChild(message);
        }
        //const ordersCopy = stat ? orders.filter(itm => itm.newOrder.status === stat): orders;

        for (var i = 0; i < orders.length; i++) {
            let newItem = itemElement.cloneNode(true);

            newItem.querySelector("h2").innerHTML = "Orden #" + orders[i].newOrder.id;
            newItem.querySelector('[data-status]').classList.remove("bg-blue-100");

            newItem.querySelector('[data-cliente]').innerHTML = orders[i].newOrder.customer.name;
            const list = newItem.querySelector(".orderList");
            list.innerHTML = "";
            orders[i].newOrder.products.forEach((item, idx) => {
                // Agregar lista de productos en el orders container
                const li = document.createElement('li');
                li.innerHTML = `-${item.name}`;
                list.appendChild(li);

                //Mostrar nota especial
                if (item.note != "") {
                    //console.log("Este necesita un submenu "+item.name);
                    let ul = document.createElement('ul');
                    ul.className = "list-inside ml-8 text-red-700";

                    let liNote = document.createElement('li');
                    liNote.innerText = item.note;
                    ul.appendChild(liNote);
                    list.appendChild(ul);
                }
            });

            //obtener botones
            const buttons = newItem.getElementsByTagName('button');
            const idx = i;
            buttons[0].addEventListener('click', function (e) {
                MarkComplete(idx); //HACER QUE ESTE BOTON LLAME AL INDICE CORRECTO, ACTUALMENTE MANDA 5, REFRESCAR AFTER CHANGING
            });

            //Make changes based on status
            const oStatus = newItem.querySelector('[data-status]').innerHTML = orders[i].newOrder.status;
            if (oStatus === "En preparacion") {
                newItem.querySelector('[data-status]').classList.add("bg-yellow-300");
            } else {
                newItem.querySelector('[data-status]').classList.add("bg-green-200");
                buttons[0].classList.add('hidden')
            }
            //Filters orders only if status matches
            if (oStatus === stat) {
                container.appendChild(newItem);
            }

        }
    }

    completadasBtn.addEventListener('click', function () {
        RefreshItems("Completada");
        completadasBtn.classList.add("underline")
    });
    pendientesBtn.addEventListener('click', function () {
        RefreshItems("En preparacion");
        pendientesBtn.classList.add("underline")
    });

    //Por defecto mostrar
    orders = GetSavedOrders();
    RefreshItems("En preparacion")
    pendientesBtn.classList.add("underline")
});