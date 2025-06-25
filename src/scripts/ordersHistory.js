
document.addEventListener('DOMContentLoaded', () => {
    const lineaSample = document.getElementById("linea-sample");
    const container = document.getElementById("grid-container");
    let orders = GetSavedOrders();

    container.innerHTML="";
    orders.forEach(order => {
        let lineaObj = lineaSample.cloneNode(true); 
        lineaObj.querySelector('[data-id]').innerHTML = `#${order.newOrder.id}`;
        lineaObj.querySelector('[data-name]').innerHTML = `${order.newOrder.customer.name}`;
        const formatted = new Date(order.newOrder.orderDate).toLocaleDateString('en-GB');
        lineaObj.querySelector('[data-date]').innerHTML = formatted;
        lineaObj.querySelector('[data-status]').innerHTML = order.newOrder.status;
        lineaObj.querySelector('[data-total]').innerHTML = "...";
        lineaObj.addEventListener('click', ()=>{
            alert("En la siguiente actualizacion se abrira un panel para mostrar todos los detalles de la orden #"+order.newOrder.id);
        });
        container.appendChild(lineaObj);
    });
});