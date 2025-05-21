const cartItems = [];
let total = 0;


function addToCart(product) {
    //---------------------Acceder a el array de elementos en memoria solo esta de prueba
    //const data = localStorage.getItem("hamburguersData");
    //console.log(typeof (JSON.parse(data)))
    //const obj = JSON.parse(data)
    //console.log(obj)
    //console.log(data[0])
    //console.log(obj[0].name)
    //-------------------------------
    cartItems.push(product);
    console.log(product)
    renderCart();
}

function renderCart() {
    const listSm = document.getElementById('cart-list-sm');
    const listLg = document.getElementById('cart-list-lg'); 
    const totalDisplaySm = document.getElementById('cart-total-sm');
    const totalDisplayLg = document.getElementById('cart-total-lg');

    listSm.innerHTML = '';
    listLg.innerHTML = '';

    //FOR EACH LIST ITEM
    cartItems.forEach((item, idx) => {
        // Para cada carrito, crea un <li> y botón independiente
        [listSm, listLg].forEach(list => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} Q ${item.price} `;

            const removeButton = document.createElement('button');
            removeButton.textContent = '❌';
            removeButton.className = 'text-red-700 z-40';
            // Usa el índice o el id del item para identificarlo
            removeButton.addEventListener('click', function(e){
                console.log(e.target)
                removeFromCart(idx); // o item.id si usas id
            });
            li.appendChild(removeButton);
            list.appendChild(li);

            //Mostrar onta especial
            if(item.note != ""){
                console.log("Este necesita un submenu "+item.name);
                let ul = document.createElement('ul');
                ul.className = "list-inside ml-8 text-red-700";

                let liNote = document.createElement('li');
                liNote.innerText = item.note;
                ul.appendChild(liNote);
                list.appendChild(ul);
            }
        });
    });

    // Calcula el total (puedes ajustar según tu lógica)
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    if (totalDisplaySm) totalDisplaySm.textContent = total.toFixed(2);
    if (totalDisplayLg) totalDisplayLg.textContent = total.toFixed(2);

}

function createOrder() {
    // Guardamos la orden en localStorage
    localStorage.setItem('order', JSON.stringify({ items: cartItems, total: total }));
    // Redirigimos a la página de la orden
    window.location.href = 'orden.html';
}

function removeFromCart(index) {
    //console.log("Elminar del carrito a "+index)
    cartItems.splice(index, 1)
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {


});