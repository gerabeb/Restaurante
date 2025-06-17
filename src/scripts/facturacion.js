orders = [];

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('orders-container');
    let itemElement = container.querySelector(".orderSample");
    const completadasBtn = document.getElementById("mostrar-completadas");
    const pagadasBtn = document.getElementById('mostrar-pagadas')

    function ClearContainer() {
        for (let i = container.childElementCount; i > 0; i--) {
            container.children[0].remove();
        }
        completadasBtn.classList.remove("underline");
        pagadasBtn.classList.remove("underline");
    }

    function RefreshItems(stat = "") {
        ClearContainer();

        orders = GetSavedOrders();
        //const ordersCopy = stat ? orders.filter(itm => itm.newOrder.status === stat): orders;
        for (var i = 0; i < orders.length; i++) {
            let newItem = itemElement.cloneNode(true);

            newItem.querySelector('[data-cliente]').innerHTML = orders[i].newOrder.customer.name;
            const total = (orders[i].newOrder.products.reduce((sum, item) => sum + item.price, 0))+ Number(orders[i].newOrder.tip);
            newItem.querySelector('[data-total]').innerHTML = `Total Q${total}`;
            //console.log(orders[i].newOrder.products.reduce((sum, item) => sum + item.price, 0))
            newItem.querySelector("h2").innerHTML = "Orden #" + orders[i].newOrder.id;
            newItem.querySelector('[data-status]').classList.remove("bg-blue-100");

            const list = newItem.querySelector(".orderList");
            list.innerHTML = "";
            orders[i].newOrder.products.forEach((item, idx) => {
                // Agregar lista de productos en el orders container
                const li = document.createElement('li');
                li.innerHTML = `-${item.name} Q${item.price}`;
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

            //Mostrar propina
            if (orders[i].newOrder.tip > 0) {
                let liTip = document.createElement('li');
                liTip.innerText = "-Propina de Q" + orders[i].newOrder.tip;
                list.appendChild(liTip);
            }

            //obtener botones
            const buttons = newItem.getElementsByTagName('button');
            const idx = i;
            buttons[0].addEventListener('click', function (e) {
                console.log(idx + " Se pagaraaa")
                localStorage.setItem('currentOrder', idx);
                window.location.href = 'pagos.html';
                //MarkPaid(idx); //HACER QUE ESTE BOTON LLAME AL INDICE CORRECTO, ACTUALMENTE MANDA 5, REFRESCAR AFTER CHANGING
            });

            //Make changes based on status
            const oStatus = newItem.querySelector('[data-status]').innerHTML = orders[i].newOrder.status;
            if (oStatus === "Completada") {
                newItem.querySelector('[data-status]').classList.add("bg-green-200");
            } else {
                newItem.querySelector('[data-status]').classList.add("bg-blue-100");
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
    pagadasBtn.addEventListener('click', function () {
        RefreshItems("Pagada");
        pagadasBtn.classList.add("underline")
    });

    //Por defecto mostrar
    orders = GetSavedOrders();
    RefreshItems("Completada")
    completadasBtn.classList.add("underline")
});