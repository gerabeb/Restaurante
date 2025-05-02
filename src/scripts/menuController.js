
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

let entradas=[
    {
        "name": "Papas fritas",
        "price": 7,
        "img-src": "https://recetinas.com/wp-content/uploads/2022/10/patatas-fritas.jpg"
    },
    {
        "name": "Sho papas",
        "price": 20,
        "img-src": "https://tse2.mm.bing.net/th/id/OIP.UuDOEH1EbEiJtT1pn5SNBAHaE9?rs=1&pid=ImgDetMain"
    }
];

let combos=[
    {
        "name": "Papas y coca",
        "price": 15,
        "img-src": "https://tse2.mm.bing.net/th/id/OIP.xt-Hexwh8BvTCW05OaleMgHaHa?rs=1&pid=ImgDetMain"
    },
    {
        "name": "Papas y cerveza",
        "price": 25,
        "img-src": "https://img.freepik.com/fotos-premium/cerveza-papas-fritas_250469-15878.jpg"
    },
    {
        "name": "Papas y agua",
        "price": 10,
        "img-src": "https://static.vecteezy.com/system/resources/previews/004/183/958/large_2x/glass-of-water-and-french-fries-isolated-on-white-background-photo.jpg"
    }
];

let extras=[
    {
        "name": "→Extra pepinillo",
        "price": 3,
        "img-src": "https://image.freepik.com/foto-gratis/rodajas-pepinillo-fresco-aislado-sobre-fondo-blanco_185193-47920.jpg"
    },
    {
        "name": "→Extra carne",
        "price": 7,
        "img-src": "https://tse1.mm.bing.net/th/id/OIP.2svN3nVwJXTpTF2vy4BE3gAAAA?rs=1&pid=ImgDetMain"
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

            //obtener botones
            const buttons = newItem.getElementsByTagName('button');
            buttons[0].addEventListener('click', function(){
                //console.log("Agregar al carrito "+newItem.querySelector("h2").innerHTML + " price:" + newItemPrice);
                addToCart("-"+newItem.querySelector("h2").innerHTML, newItemPrice );
            });
            buttons[1].addEventListener('click', function(){
                console.log("Modificar producto"+newItem.querySelector("h2").innerHTML + " price:" + newItemPrice);
                const userInput = prompt('Que quieres modificar?');
                addToCart("-"+newItem.querySelector("h2").innerHTML, newItemPrice, `${userInput}` );
            })
        }
    }

    let container = document.getElementById('items-container');
    let itemElement = document.getElementById("item");

    //console.log(container.childElementCount +" elements ")
   
    ClearContainer();
    ShowCategoryProducts(hamburgers);



    //Mostras menus
    document.getElementById('menu-hamburguesas').addEventListener('click', function(){
        console.log("Elemento <a> si detecta click")
        ClearContainer();
        ShowCategoryProducts(hamburgers);
    });

    document.getElementById('menu-bebidas').addEventListener('click', function(){
        console.log("Elemento <a> si detecta click")
        ClearContainer();
        ShowCategoryProducts(bebidas);
    });

    document.getElementById('menu-entradas').addEventListener('click', function(){
        console.log("Elemento <a> si detecta click")

        ClearContainer();
        ShowCategoryProducts(entradas);
    });
    document.getElementById('menu-combos').addEventListener('click', function(){
        console.log("Elemento <a> si detecta click")
        ClearContainer();
        ShowCategoryProducts(combos);
    });
    document.getElementById('menu-extras').addEventListener('click', function(){
        console.log("Elemento <a> si detecta click")
        ClearContainer();
        ShowCategoryProducts(extras);
    });
});