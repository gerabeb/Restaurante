orders = [];

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('orders-container');
    let itemElement = container.querySelector(".orderSample");

    function ClearContainer() {
        for (let i = container.childElementCount; i > 0; i--) {
            container.children[0].remove();
        }
    }

    function DisplayOrders(category) {
        orders = GetSavedOrders();
    }

    function MarkComplete(index) {
        console.log("Marcar como completa a " + index)
        orders[index].newOrder.status = "Completada";
        console.log(orders)
        UpdateOrders(orders);   //GUARDAR CAMBIOS EN DB
    }

    function RefreshItems() {
        ClearContainer();
        for (var i = 0; i < orders.length; i++) {
            let newItem = itemElement.cloneNode(true);
            newItem.querySelector("h2").innerHTML = "Orden #" + orders[i].newOrder.id;
            //console.log(orders[i].newOrder.id)
            newItem.querySelector('[data-status]').innerHTML = orders[i].newOrder.status;
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

            container.appendChild(newItem);

            //obtener botones
            const buttons = newItem.getElementsByTagName('button');

            console.log(i)
            const idx = i;
            buttons[0].addEventListener('click', function (e) {
                MarkComplete(idx); //HACER QUE ESTE BOTON LLAME AL INDICE CORRECTO, ACTUALMENTE MANDA 5, REFRESCAR AFTER CHANGING
                RefreshItems();
            })
        }
    }

    orders = GetSavedOrders();
    RefreshItems();
});