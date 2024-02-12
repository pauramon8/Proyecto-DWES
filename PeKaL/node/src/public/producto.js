function mostrarProductos(productos) {
  var contenedorProductos = document.querySelector('.products');

  productos.forEach(function (producto) {
      var template = document.getElementById('product-template');
      var clone = document.importNode(template.content, true);

      clone.querySelector('h3').textContent = producto.name;
      clone.querySelector('p').textContent = producto.desc;
      clone.querySelector('.price').textContent = '€' + producto.price;

      // Agregar funcionalidad al botón de comprar
      clone.querySelector('button').addEventListener('click', function () {
          comprarProducto(producto.id, producto.name, producto.desc, producto.price);
      });

      contenedorProductos.appendChild(clone);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  cargaProductos();
  
  var form = document.getElementById('product-form');
  form.addEventListener('submit', function (event) {
      event.preventDefault();
      enviarProducto();
      
  });
});

function enviarProducto() {
  var form = document.getElementById('product-form');
  var name = form.elements['name'].value;
  var desc = form.elements['desc'].value;
  var price = form.elements['price'].value;

  const canvas = document.getElementById('image');

    /* Convert canvas to dataURL and log to console
    const dataURL = canvas.toDataURL('image/jpeg', 0.5);
    console.log(dataURL); */   

  crearProducto(name, desc, price);
  
}

/* Recuperar de base de datos
    const base64 = getBase64StringFromDataURL(dataURL);
    console.log(base64); */

function crearProducto(name, desc, price) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
      "name": name,
      "desc": desc,
      "price": price
  });

  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch("/api/product/create", requestOptions)
      .then(response => response.text())
      .then(result => {
          console.log(result);
          alert('Producto Creado Correctamente');
          window.location.href = "inicio.html";
      })
      .catch(error => console.log('error', error));

}

function cargaProductos(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("/api/product/", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log("Resulado API products"+result);
      console.log(result);
      loadProducts(result);
    })
    .catch(error => console.log('error', error));

}

function loadProduct(id, title, descripcion, precio) {
    const template = document.getElementById('product-template');
    const clone = document.importNode(template.content, true);

    clone.querySelector('h3').textContent = title;
    clone.querySelector('p').textContent = descripcion;
    clone.querySelector('.price').textContent = `${precio}`;

    clone.querySelector('button').addEventListener('click', () => {
      console.log(`Producto ID: ${id} comprado`);
      venderProducto(id);
    });

    const productsSection = document.querySelector('.products');
    productsSection.appendChild(clone); // Adjuntar el clon del producto directamente a la sección de productos
    
}

function loadProducts(products) {

  products.forEach(product => {
    loadProduct(product._id ,product.name, product.desc, product.price);
  })
}

function venderProducto(id){
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch("/api/product/"+id, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    console.log("Producto vendido");
    alert('Producto vendido');
    window.location.href = "inicio.html";
}
