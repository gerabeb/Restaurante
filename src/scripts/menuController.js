document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('items-container');
    let itemElement = container.querySelector(".itemSample");

    const hamburguesasBtn = document.getElementById('menu-hamburguesas');
    const bebidasBtn = document.getElementById('menu-bebidas');
    const entradasBtn = document.getElementById('menu-entradas');
    const combosBtn = document.getElementById('menu-combos');
    const extrasBtn =document.getElementById('menu-extras');

    function ClearContainer() {
        for (let i = container.childElementCount; i > 0; i--) {
            container.children[0].remove();
        }
        hamburguesasBtn.classList.remove("underline");
        bebidasBtn.classList.remove("underline");
        entradasBtn.classList.remove("underline");
        combosBtn.classList.remove("underline");
        extrasBtn.classList.remove("underline");
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
            newItem.querySelector('[data-descripcion]').innerHTML = products[k].description;
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
    hamburguesasBtn.classList.add("underline")

    //Mostras menus
    hamburguesasBtn.addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(hamburguesas);
        hamburguesasBtn.classList.add("underline")
    });
    bebidasBtn.addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(bebidas);
        bebidasBtn.classList.add("underline")
    });

    entradasBtn.addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(entradas);
        entradasBtn.classList.add("underline")
    });
    combosBtn.addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(combos);
        combosBtn.classList.add("underline")
    });
    extrasBtn.addEventListener('click', function () {
        ClearContainer();
        ShowCategoryProducts(extras);
        extrasBtn.classList.add("underline")
    });
});