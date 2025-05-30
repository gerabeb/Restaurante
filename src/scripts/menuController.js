
//localStorage.setItem("hamburguersData", JSON.stringify(hamburguesas))

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('items-container');
    let itemElement = container.querySelector(".itemSample");

    function ClearContainer() {
        for (let i = container.childElementCount; i > 0; i--) {
            container.children[0].remove();
        }
    }

    function ShowCategoryProducts(category) {

        let products = getAllFromCategory(category);
        for (var k = 0; k < products.length; k++) {

            //console.log(products[k])

            let newItem = itemElement.cloneNode(true);

            newItem.querySelector("img").src = products[k]["img-src"];
            newItem.querySelector("h2").innerHTML = products[k].name;
            newItem.querySelector('[data-identificador]').innerHTML = products[k].id;
            newItem.querySelector('[data-identificador]').dataset.id = products[k].id;
            //console.log( newItem.querySelector('[data-identificador]').dataset.id);
            let newItemPrice = products[k].price.toFixed(2);
            newItem.querySelector("[data-precio]").innerHTML = "Q " + newItemPrice;
            container.appendChild(newItem);

            //obtener botones
            const buttons = newItem.getElementsByTagName('button');

            buttons[0].onclick = function (e) {
                //console.log(e.target.parentNode.querySelector('[data-identificador]').dataset.id);
                addToCart(getProductByID(e.target.parentNode.querySelector('[data-identificador]').dataset.id))
            };
            buttons[1].onclick = function (e) {
                let product = { ...getProductByID(e.target.parentNode.querySelector('[data-identificador]').dataset.id) };
                openAddNotesModal(product)

                /*
                //Clonar objeto y modificar propiedades
                let product = {...getProductByID(e.target.parentNode.querySelector('[data-identificador]').dataset.id)};
                let userInput = prompt('Que quieres modificar?');
                if(userInput){
                    product.note = userInput;
                    userInput="";
                }
                addToCart(product);*/
            };
        }
    }

    ClearContainer();
    ShowCategoryProducts(hamburguesas);

    //Mostras menus
    document.getElementById('menu-hamburguesas').addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(hamburguesas);
    });

    document.getElementById('menu-bebidas').addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(bebidas);
    });

    document.getElementById('menu-entradas').addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(entradas);
    });
    document.getElementById('menu-combos').addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(combos);
    });
    document.getElementById('menu-extras').addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(extras);
    });
});