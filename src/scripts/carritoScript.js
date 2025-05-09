const cartItems = [];
let total = 0;

function addToCart(name, price, nota="null") {
    //---------------------Acceder a el array de elementos en memoria solo esta de prueba
    //const data = localStorage.getItem("hamburguersData");
    //console.log(typeof (JSON.parse(data)))
    //const obj = JSON.parse(data)
    //console.log(obj)
    //console.log(data[0])
    //console.log(obj[0].name)
    //-------------------------------
    var lineItem = `${name} Q ${price}`
    cartItems.push({ name, price });
    total += parseFloat(price);
    renderCart(nota);
}

function renderCart(nota = "null") {
    const list = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    list.innerHTML = '';

    cartItems.forEach(item => {

        const li = document.createElement('li');
        li.innerHTML = `${item.name} Q ${item.price}`;
        list.appendChild(li);
        
    });
    //console.log(cartItems)
    totalDisplay.textContent = parseFloat( total).toFixed(2);
}

function createOrder() {
    // Guardamos la orden en localStorage
    localStorage.setItem('order', JSON.stringify({ items: cartItems, total: total }));
    // Redirigimos a la página de la orden
    window.location.href = 'orden.html';
}

function removeFromCart(){
    console.log("Elminar del carrito")
}

document.addEventListener('DOMContentLoaded', () => {


});