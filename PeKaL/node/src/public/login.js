const { head } = require("../routes/user.route");

function enviarFormulario() {
  var form = document.getElementById('userForm');
  var name = form.elements['nombre'].value;
  var email = form.elements['email'].value;
  var password = form.elements['contraseña'].value;
  var isAdmin = form.elements['isAdmin'].value;

  addUser(name, email, password, isAdmin);
}

function addUser(name, email, password, isAdmin) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": name,
    "email": email,
    "password": password,
    "isAdmin": isAdmin
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/api/users/register", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  alert('Usuario creado correctamente');
}

function mostrarFormularioLogin() {
  document.getElementById('userForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function mostrarFormularioRegistro() {
  document.getElementById('userForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
}

function enviarLoginForm() {
  var form = document.getElementById('loginForm');
  var email = form.elements['loginEmail'].value;
  var password = form.elements['loginContraseña'].value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email": email,
    "password": password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/api/users/login", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }
      return response.json();
    })
    .then(data => {
      var nombreUsuario = data.user.name;
      localStorage.setItem('nombreUsuario', nombreUsuario);
      var emailUsuario = data.user.email;
      localStorage.setItem('emailUsuario', emailUsuario);
      var idUsuario = data.user._id;
      localStorage.setItem('idUsuario', idUsuario);
      var tokenUsuario = data.token;
      localStorage.setItem('tokenUsuario', tokenUsuario);

      alert('Inicio de sesión exitoso. Bienvenido, ' + nombreUsuario);
      window.location.href = "inicio.html";
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    });
}


result

