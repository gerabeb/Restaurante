
let hamburgers=[
    {
        "name": "La hamburguesa clasica",
        "price": 12.99,
        "img-src": "https://tse3.mm.bing.net/th/id/OIP.RRrZKc6uX4sKK7ofbFabhQHaEf?w=272&h=180&c=7&r=0&o=5&pid=1.7"
    },
    {
        "name": "Hamburguesa BBQ",
        "price": 6.99,
        "img-src": "https://bing.com/th?id=OSK.a107ed30f1bccd9f7327d294b244e4d8"
    },
    {
        "name": "Hamburguesa Vegana",
        "price": 7.49,
        "img-src": "https://bing.com/th?id=OSK.a9b48ad4df10d906fa7ed74d15f266a8"
    },
    {
        "name": "Hamburguesa Doble",
        "price": 12,
        "img-src": "https://img.freepik.com/foto-gratis/vista-lateral-doble-hamburguesa-queso-empanadas-carne-parrilla-queso-hojas-lechuga-bollos_141793-4883.jpg"
    }
];

let bebidas=[
    {
        "name": "Coca",
        "price": 8,
        "img-src": "https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/value-collection/coca-cola-1.25-liter-new.png"
    },
    {
        "name": "Cerveza Moza",
        "price": 40,
        "img-src": "https://birrapedia.com/img/modulos/cerveza/5cb/moza_14744754905948_p.jpg"
    },
    {
        "name": "1 litro de Gallo",
        "price": 25,
        "img-src": "https://walmartsv.vtexassets.com/arquivos/ids/254226/Cerveza-Gallo-Botella-350Ml-1-24007.jpg?v=637920491123300000"
    }
];

localStorage.setItem("hamburguersData", JSON.stringify(hamburgers))

document.addEventListener('DOMContentLoaded', () => {

    function ClearContainer(){
        for(let i = container.childElementCount; i > 0; i--){
            //console.log("for is running "+ container.children[0].innerHTML);
            container.children[0].remove();
        }
    }
    
    function ShowCategoryProducts(category){
        for(var k= 0; k<category.length; k++){
            let newItem = itemElement.cloneNode(true);
            newItem.querySelector("img").src = category[k]["img-src"];
            let newItemPrice = category[k].price.toFixed(2);
            newItem.querySelector("p").innerHTML = "Q " + newItemPrice;
            newItem.querySelector("h2").innerHTML = category[k].name;
            container.appendChild(newItem);
            newItem.addEventListener('click', function(){
                console.log("Mandar datos al carrito de "+newItem.querySelector("h2").innerHTML + " price:" + newItemPrice);
                addToCart(newItem.querySelector("h2").innerHTML, newItemPrice );
            })
        }
    }

    let container = document.getElementById('items-container');
    let itemElement = document.getElementById("item");

    //console.log(container.childElementCount +" elements ")
   
    ClearContainer();
    ShowCategoryProducts(hamburgers);


    document.getElementById('menu-bebidas').addEventListener('click', function(){
        console.log("Elemento <a> si detecta click")

        ClearContainer();
        ShowCategoryProducts(bebidas);

    });

    document.getElementById('menu-hamburguesas').addEventListener('click', function(){
        console.log("Elemento <a> si detecta click")

        ClearContainer();
        ShowCategoryProducts(hamburgers);

    });

    
});