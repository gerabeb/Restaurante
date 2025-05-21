let hamburguesas=[
    {
    "id": 100,
    "name": "La hamburguesa clasica",
    "price": 25,
    "description": "Pan, queso, carne, pepinillos",
    "img-src": "https://tse3.mm.bing.net/th/id/OIP.RRrZKc6uX4sKK7ofbFabhQHaEf?w=272&h=180&c=7&r=0&o=5&pid=1.7",
    "note": "",
    "categoria": "hamburguesas"
  },
  {
    "id": 101,
    "name": "Hamburguesa BBQ",
    "price": 45,
    "description": "Pan, queso, carne, un huevo estrellado, salsa barbacoa",
    "img-src": "https://bing.com/th?id=OSK.a107ed30f1bccd9f7327d294b244e4d8",
    "note": "",
    "categoria": "hamburguesas"
  },
  {
    "id": 102,
    "name": "Hamburguesa Vegana",
    "price": 30,
    "description": "Pan, protemas, lechuga, tomate",
    "img-src": "https://bing.com/th?id=OSK.a9b48ad4df10d906fa7ed74d15f266a8",
    "note": "",
    "categoria": "hamburguesas"
  },
  {
    "id": 103,
    "name": "Hamburguesa Doble",
    "price": 60,
    "description": "Pan, doble torta de carne, doble queso, pepinillos",
    "img-src": "https://img.freepik.com/foto-gratis/vista-lateral-doble-hamburguesa-queso-empanadas-carne-parrilla-queso-hojas-lechuga-bollos_141793-4883.jpg",
    "note": "",
    "categoria": "hamburguesas"
  }
];
 
let combos=[
    {
    "id": 200,
    "name": "Papas y coca",
    "price": 15,
    "description": "Coca con papas fritas",
    "img-src": "https://tse2.mm.bing.net/th/id/OIP.xt-Hexwh8BvTCW05OaleMgHaHa?rs=1&pid=ImgDetMain",
    "note": "",
    "categoria": "combos"
  },
  {
    "id": 201,
    "name": "Papas y cerveza",
    "price": 25,
    "description": "Cerveza bien fria y papas fritas",
    "img-src": "https://img.freepik.com/fotos-premium/cerveza-papas-fritas_250469-15878.jpg",
    "note": "",
    "categoria": "combos"
  },
  {
    "id": 202,
    "name": "Papas y agua",
    "price": 10,
    "description": "Agua pura y papas",
    "img-src": "https://static.vecteezy.com/system/resources/previews/004/183/958/large_2x/glass-of-water-and-french-fries-isolated-on-white-background-photo.jpg",
    "note": "",
    "categoria": "combos"
  }
];
 
let bebidas=[
    {
    "id": 300,
    "name": "Coca",
    "price": 8,
    "description": "Coca cola 400ml",
    "img-src": "https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/value-collection/coca-cola-1.25-liter-new.png",
    "note": "",
    "categoria": "bebidas"
  },
  {
    "id": 301,
    "name": "Cerveza Moza",
    "price": 40,
    "description": "Cerveza artesanal en lata",
    "img-src": "https://birrapedia.com/img/modulos/cerveza/5cb/moza_14744754905948_p.jpg",
    "note": "",
    "categoria": "bebidas"
  },
  {
    "id": 302,
    "name": "1 litro de Gallo",
    "price": 25,
    "description": "Quiero",
    "img-src": "https://walmartsv.vtexassets.com/arquivos/ids/254226/Cerveza-Gallo-Botella-350Ml-1-24007.jpg?v=637920491123300000",
    "note": "",
    "categoria": "bebidas"
  }
];
 
let entradas=[
    {
    "id": 400,
    "name": "Papas fritas",
    "price": 7,
    "description": "Papas fritas como las de mac",
    "img-src": "https://recetinas.com/wp-content/uploads/2022/10/patatas-fritas.jpg",
    "note": "",
    "categoria": "entradas"
  },
  {
    "id": 401,
    "name": "Sho papas",
    "price": 20,
    "description": "Unas sho papas con queso mozarella",
    "img-src": "https://tse2.mm.bing.net/th/id/OIP.UuDOEH1EbEiJtT1pn5SNBAHaE9?rs=1&pid=ImgDetMain",
    "note": "",
    "categoria": "entradas"
  }
];
 
let extras=[
    {
    "id": 500,
    "name": "<Label class=\"text-green-700\">→Extra pepinillo</label>",
    "price": 3,
    "description": "2 rodajas de pepinillo",
    "img-src": "https://image.freepik.com/foto-gratis/rodajas-pepinillo-fresco-aislado-sobre-fondo-blanco_185193-47920.jpg",
    "note": "",
    "categoria": "extras"
  },
  {
    "id": 501,
    "name": "<Label class=\"text-green-700\">→Extra carne</label>",
    "price": 7,
    "description": "Torta de carne de 1/4 de libra",
    "img-src": "https://tse1.mm.bing.net/th/id/OIP.2svN3nVwJXTpTF2vy4BE3gAAAA?rs=1&pid=ImgDetMain",
    "note": "",
    "categoria": "extras"
  }
];

const allProducts = [...hamburguesas, ...bebidas, ...combos, ...entradas, ...extras]
 
function getProductByID(id){
    //console.log(allProducts.length + " prod recibio "+id + typeof(id))
    const result =  allProducts.find(item => item.id === Number(id))
    //console.log(result)
    if(result){
        console.log (result.name)
    }else{
        console.log("ID no encontrado");
    }
    return result;
}

function getProductByIndex(index){
    const result =  hamburguesas[index];
    if(result){
        console.log (result)
        result.note = "Sin ceboolla"
        console.log(result.note)
    }else{
        console.log("Indice no encontrado o fuera de rango");
    }
    return result;
}

function getAllFromCategory(category){
    switch(category){
        case hamburguesas:
            return hamburguesas;
        case combos:
            return combos;
        case bebidas:
            return bebidas;
        case entradas:
            return entradas;
        case extras:
            return extras;
        default:
            console.log("Categoria no definida");
            return null;
    }
}


//getProductByID(103)
//getProductByIndex(1)
//getAllFromCategory(hamburguesasa)