let orderObj = {
    id: 1,
    orderDate: new Date("01-01-2001"),
    status: "Nueva",
    tip : 0,
    employee: {
        id: 1,
        name: "Angel Beb",
        email: "Hueco"
    },
    customer: {
        id: 1,
        name: "Cliente de Muestra",
        NIT: 190166409,
        email: "",
    },
    products: {

    }
}

let orders = []

orderObj.status = "Entregado";
//console.log(order)

function RegisterOrder(cartItems) {
    const newOrder = structuredClone(orderObj); //Clonar original para que los cambios no afecten a la misma orden y cada una sea independiente
    newOrder.id = GenerateOrderId();
    newOrder.products = cartItems;
    newOrder.customer.name = prompt("Ingrese nombre del cliente");
    newOrder.orderDate = new Date();
    newOrder.status = "En preparacion";

    orders = GetSavedOrders();
    console.log(orders)
    orders.push({ newOrder });
    localStorage.setItem('orders', JSON.stringify(orders));
}

function UpdateOrders(updatedOrders) {
    orders = updatedOrders;
    localStorage.setItem('orders', JSON.stringify(orders));
}

/*
//UpdateOrderWithID(1, "Testeada", 10)

function UpdateOrderWithID(id, status, tip){
    orders = GetSavedOrders();

    for(var i = 0; i<orders.length; i++){
        if(orders[i].newOrder.id === parseInt(id) ){
            orders[i].newOrder.tip = tip;
            orders[i].newOrder.status = status;
        }
    }
    UpdateOrders(orders);
    orders = GetSavedOrders();
    console.log("Order updated")
}*/

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

function GenerateOrderId() {
    /*//ID based on Date
    var d = new Date();
    const id = d.getFullYear().toString().substring(2)
        + "" + (d.getMonth() + 1).toString().padStart(2, '0')
        + "" + d.getDate().toString().padStart(2, '0')
        + "" + d.getHours().toString().padStart(2, '0')
        + "" + d.getMinutes().toString().padStart(2, '0')
        + "" + d.getSeconds().toString().padStart(2, '0')
        //+ "" + d.getMilliseconds().toString().padStart(3, '0')
    console.log(id)
    return id;*/
    
    //Incremental ID
    let id = parseInt(localStorage.getItem('contadorId'), 10);
    id > 0 ? id += 1 : id = 1;
    localStorage.setItem('contadorId', id);
    return id;
}


//PrintOrders();
//localStorage.removeItem('orders')
//localStorage.removeItem('contadorId')