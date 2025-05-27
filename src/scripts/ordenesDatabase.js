let orderObj = {
    id: 1,
    orderDate: new Date("01-01-2001"),
    status: "Nueva",
    employee: {
        name: "Angel Beb",
        genero: "Hueco"
    },
    customer: {
        name: "Mesa 1",
        NIT: 190166409
    },
    products: {

    }
}

let orders = []

orderObj.status = "Entregado";
//console.log(order)

function RegisterOrder(cartItems) {
    const newOrder = structuredClone(orderObj); //Clonar original para que los cambios no afecten a la misma orden y cada una sea independiente
    newOrder.products = cartItems;
    newOrder.customer.name = prompt("Ingrese nombre del cliente");
    newOrder.orderDate = new Date();
    newOrder.status = "En preparacion";

    orders = GetSavedOrders();
    console.log(orders)
    orders.push({ newOrder });
    localStorage.setItem('orders', JSON.stringify(orders));
}

function UpdateOrders(updatedOrders){
    orders= updatedOrders;
    localStorage.setItem('orders', JSON.stringify(orders));
}

function PrintOrders() {
    orders = GetSavedOrders();
    if (orders) {
        console.log(orders)
    } else {
        console.log("NO hay ordenes que mostrar")
    }

}

function GetSavedOrders() {
    const data = localStorage.getItem('orders');
    const obj = JSON.parse(data);
    if (obj) {
        return obj;
    } else {
        return [];
    }
}

//PrintOrders();
//localStorage.removeItem('orders')