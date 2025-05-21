
//localStorage.setItem("hamburguersData", JSON.stringify(hamburguesas))
 
document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('items-container');
    let itemElement = container.querySelector(".itemSample");
 
    function ClearContainer(){
        for(let i = container.childElementCount; i > 0; i--){
            container.children[0].remove();
        }
    }
   
    function ShowCategoryProducts(category){

        products = getAllFromCategory(category);
        for(var k= 0; k<products.length; k++){

            //console.log(products[k])

            let newItem = itemElement.cloneNode(true);
 
            newItem.querySelector("img").src = products[k]["img-src"];
            newItem.querySelector("h2").innerHTML = products[k].name;
            newItem.querySelector('[data-identificador]').innerHTML= products[k].id;
            newItem.querySelector('[data-identificador]').dataset.id = products[k].id;
            //console.log( newItem.querySelector('[data-identificador]').dataset.id);
            let newItemPrice = products[k].price.toFixed(2);
            newItem.querySelector("[data-precio]").innerHTML = "Q " + newItemPrice;
            container.appendChild(newItem);
 
            //obtener botones
            const buttons = newItem.getElementsByTagName('button');

            buttons[0].onclick = function(e) {
                console.log(e.target.parentNode.querySelector('[data-identificador]').dataset.id);
                addToCart(getProductByID(e.target.parentNode.querySelector('[data-identificador]').dataset.id))
            };
            buttons[1].onclick = function(e) {
                //Clonar objeto y modificar propiedades
                console.log(e.target.parentNode.querySelector('[data-identificador]').dataset.id);
                let product = {...getProductByID(e.target.parentNode.querySelector('[data-identificador]').dataset.id)};
                let userInput = prompt('Que quieres modificar?');
                if(userInput){
                    product.note = userInput;
                    userInput=""; //PENDIENTE POR ACA
                }
                addToCart(product);
            };

            /*buttons[0].addEventListener('click', function(){
                //console.log("Agregar al carrito "+newItem.querySelector("h2").innerHTML + " price:" + newItemPrice);
                //addToCart("-"+newItem.querySelector("h2").innerHTML, newItemPrice );
                addToCart(products[k], newItemPrice)
            });*/
           /* buttons[1].addEventListener('click', function(){
                console.log("Modificar producto"+newItem.querySelector("h2").innerHTML + " price:" + newItemPrice);
                const userInput = prompt('Que quieres modificar?');
                addToCart("-"+newItem.querySelector("h2").innerHTML, newItemPrice, `${userInput}` );
 
                  console.log(typeof(userInput))
 
                if(userInput){
                    addToCart(`<Label class="text-red-700">--⤷`+userInput +`↵--</label>`, 0)
                }
            });*/
        }
    }
 
 
    //console.log(container.childElementCount +" elements ")
   
    ClearContainer();
    ShowCategoryProducts(hamburguesas);
 
 
 
    //Mostras menus
    document.getElementById('menu-hamburguesas').addEventListener('click', function(){
        ClearContainer();
        ShowCategoryProducts(hamburguesas);
    });
 
    document.getElementById('menu-bebidas').addEventListener('click', function(){
        ClearContainer();
        ShowCategoryProducts(bebidas);
    });
 
    document.getElementById('menu-entradas').addEventListener('click', function(){
        ClearContainer();
        ShowCategoryProducts(entradas);
    });
    document.getElementById('menu-combos').addEventListener('click', function(){
        ClearContainer();
        ShowCategoryProducts(combos);
    });
    document.getElementById('menu-extras').addEventListener('click', function(){
        ClearContainer();
        ShowCategoryProducts(extras);
    });
});