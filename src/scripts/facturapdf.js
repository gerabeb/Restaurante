function generarPDFFactura(order) {
  alert('Se descargo el PDF.');
  const { jsPDF } = window.jspdf;
  // 80mm de ancho, alto dinámico (por ejemplo, 150mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [80, 150]
  });

  let y = 10; // posición vertical inicial

  //ENCABEZADO
  pdf.setFontSize(12);
  pdf.text('Sho Burguers S.A.', 40, y, { align: 'center' });
  y += 8;
  pdf.setFontSize(8);
  pdf.text('Dirección: En el camion del sabor', 10, y);
  y += 5;
  pdf.text('Tel: 123456789', 10, y);
  y += 8;
  pdf.line(10, y, 70, y); // línea horizontal
  y += 5;
  //DATOS DEL CLIENTE
  pdf.text(`Cliente: ${order.customer.name}`, 10, y);
  y += 5;
  pdf.text(`NIT: ${order.customer.NIT}`, 10, y);
  y += 5;
  //TITULOS
  pdf.setFontSize(10);
  pdf.text(`Orden#${order.id}`, 40, y, { align: 'center' });
  y += 5;
  pdf.setFontSize(8);
  pdf.text('Producto', 10, y);
  pdf.text('Cant', 50, y);
  pdf.text('Precio', 60, y);
  y += 5;


  const productosAgrupados = agruparProductosPorId(order.products);
  //console.log(productosAgrupados);

  for(var i = 0; i<productosAgrupados.length; i++){
    //console.log(productosAgrupados[i].name + productosAgrupados[i].quantity)
    pdf.text(`${productosAgrupados[i].name}`, 10, y);
    const width = pdf.getTextWidth(productosAgrupados[i].name);
    pdf.setFontSize(5);
    pdf.text(`(${productosAgrupados[i].price}/u)`, 11+width, y);
    pdf.setFontSize(8);
    pdf.text(`  ${productosAgrupados[i].quantity}`, 50, y);
    pdf.text(`Q${(productosAgrupados[i].price*productosAgrupados[i].quantity).toFixed(2)}`, 60, y);
    y += 5;
  }
  pdf.line(10, y, 70, y);
  y += 5;
  const tip = Number(order.tip).toFixed(2);
  pdf.text(`Propina Q${tip}`, 50, y);
  y += 5
  const subtotal = order.products.reduce((sum, item) => sum + item.price, 0);
  pdf.text(`IVA Q${(subtotal*.12).toFixed(2)}`, 50, y);
  y += 5;
  pdf.line(10, y, 70, y);
  y += 5;

  pdf.setFontSize(10);
  pdf.text(`Total: Q${(subtotal+tip*1).toFixed(2)}`, 60, y, { align: 'center' });
  y += 8;

  pdf.setFontSize(8);
  pdf.text('¡Gracias por su compra!', 40, y, { align: 'center' });

  pdf.save(`ORD${order.id}_FACT`);
}


function agruparProductosPorId(productos) {
  const agrupados = {};

  productos.forEach(producto => {
    if (agrupados[producto.id]) {
      agrupados[producto.id].quantity += 1;
    } else {
      agrupados[producto.id] = { ...producto, quantity: 1 };
    }
  });

  // Convertir el objeto a un array
  return Object.values(agrupados);
}