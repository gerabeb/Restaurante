let hamburgers=[
    {
        "id": 100,
        "name": "La hamburguesa clasica",
        "price": 25,
        "description": "Pan, queso, carne, pepinillos",
        "img-src": "https://tse3.mm.bing.net/th/id/OIP.RRrZKc6uX4sKK7ofbFabhQHaEf?w=272&h=180&c=7&r=0&o=5&pid=1.7"
    },
    {
        "id": 101,
        "name": "Hamburguesa BBQ",
        "price": 45,
        "description": "Pan, queso, carne, un huevo estrellado, salsa barbacoa",
        "img-src": "https://bing.com/th?id=OSK.a107ed30f1bccd9f7327d294b244e4d8"
    },
    {
        "id": 102,
        "name": "Hamburguesa Vegana",
        "price": 30,
        "description": "Pan, protemas, lechuga, tomate",
        "img-src": "https://bing.com/th?id=OSK.a9b48ad4df10d906fa7ed74d15f266a8"
    },
    {
        "id": 103,
        "name": "Hamburguesa Doble",
        "price": 60,
        "description": "Pan, doble torta de carne, doble queso, pepinillos",
        "img-src": "https://img.freepik.com/foto-gratis/vista-lateral-doble-hamburguesa-queso-empanadas-carne-parrilla-queso-hojas-lechuga-bollos_141793-4883.jpg"
    }
];

let combos=[
    {
        "id": 200,
        "name": "Papas y coca",
        "price": 15,
        "description": "Coca con papas fritas",
        "img-src": "https://tse2.mm.bing.net/th/id/OIP.xt-Hexwh8BvTCW05OaleMgHaHa?rs=1&pid=ImgDetMain"
    },
    {
        "id": 201,
        "name": "Papas y cerveza",
        "price": 25,
        "description": "Cerveza bien fria y papas fritas",
        "img-src": "https://img.freepik.com/fotos-premium/cerveza-papas-fritas_250469-15878.jpg"
    },
    {
        "id": 202,
        "name": "Papas y agua",
        "price": 10,
        "description": "Agua pura y papas",
        "img-src": "https://static.vecteezy.com/system/resources/previews/004/183/958/large_2x/glass-of-water-and-french-fries-isolated-on-white-background-photo.jpg"
    }
];

let bebidas=[
    {
        "id": 300,
        "name": "Coca",
        "price": 8,
        "description": "Coca cola 400ml",
        "img-src": "https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/value-collection/coca-cola-1.25-liter-new.png"
    },
    {
        "id": 301,
        "name": "Cerveza Moza",
        "price": 40,
        "description": "Cerveza artesanal en lata",
        "img-src": "https://birrapedia.com/img/modulos/cerveza/5cb/moza_14744754905948_p.jpg"
    },
    {        
        "id": 302,
        "name": "1 litro de Gallo",
        "price": 25,
        "description": "Quiero",
        "img-src": "https://walmartsv.vtexassets.com/arquivos/ids/254226/Cerveza-Gallo-Botella-350Ml-1-24007.jpg?v=637920491123300000"
    }
];

let entradas=[
    {
        "id": 400,
        "name": "Papas fritas",
        "price": 7,
        "description": "Papas fritas como las de mac",
        "img-src": "https://recetinas.com/wp-content/uploads/2022/10/patatas-fritas.jpg"
    },
    {
        "id": 401,
        "name": "Sho papas",
        "price": 20,
        "description": "Unas sho papas con queso mozarella",
        "img-src": "https://tse2.mm.bing.net/th/id/OIP.UuDOEH1EbEiJtT1pn5SNBAHaE9?rs=1&pid=ImgDetMain"
    }
];



let extras=[
    {
        "id": 500,
        "name": `<Label class="text-green-700">→Extra pepinillo</label>`,
        "price": 3,
        "description": "2 rodajas de pepinillo",
        "img-src": "https://image.freepik.com/foto-gratis/rodajas-pepinillo-fresco-aislado-sobre-fondo-blanco_185193-47920.jpg"
    },
    {
        "id": 501,
        "name": `<Label class="text-green-700">→Extra carne</label>`,
        "price": 7,
        "description": "Torta de carne de 1/4 de libra",
        "img-src": "https://tse1.mm.bing.net/th/id/OIP.2svN3nVwJXTpTF2vy4BE3gAAAA?rs=1&pid=ImgDetMain"
    }
];

localStorage.setItem("hamburguersData", JSON.stringify(hamburgers))

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('items-container');
    let itemElement = container.querySelector(".itemSample");

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
            newItem.querySelector("h2").innerHTML = category[k].name;
            newItem.querySelector('[data-identificador]').innerHTML= category[k].id;
            console.log(newItem.querySelector('[data-descripcion]').innerHTML)
            newItem.querySelector('[data-descripcion]').innerHTML= category[k].description;
            let newItemPrice = category[k].price.toFixed(2);
            newItem.querySelector("[data-precio]").innerHTML = "Q " + newItemPrice;
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

                  console.log(typeof(userInput))

                if(userInput){
                    addToCart(`<Label class="text-red-700">--⤷`+userInput +`↵--</label>`, 0)
                }
            });
        }
    }


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