//Conectamos y traemos los datos de las cajas y botones
const inputUsuario =  document.getElementById("usuario");
const inputContrasena = document.getElementById("contrasena");
const btnIngresar = document.getElementById("btn-ingresar");

// minúsculas, sin espacios extra y sin acentos(colocamos esta funcion en lugar de .toLowerCase() y .trim() )
const normalizarTexto = (t) =>
    t.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


//Creamos la funcion que va a leer al archivo .json
async function cargarInvitados() {
    try {
        // Intenta leer el archivo JSON
        const respuesta = await fetch("js/invitados.json");
        const listaFamilias = await respuesta.json();
        return listaFamilias; // Si todo sale bien, regresa los datos y termina aquí.
        }

    catch (error) {
        // Si el archivo "invitados.json" no existe o está mal escrito,
         // el código se salta aquí para evitar que la aplicación "truene".
        console.error("Error al cargar el archivo de invitados:", error);
        return[]; // Regresa una lista vacía para no romper el programa.
        }   
}

   //Marcamos la acción del boton
btnIngresar.addEventListener("click", async () => {
    // 1. Obtenemos lo que escribió el usuario en las cajas
    const usuarioTexto = normalizarTexto(inputUsuario.value);
    const contrasenaTexto = normalizarTexto(inputContrasena.value);

    // 2. Cargamos la lista del JSON
    const familias = await cargarInvitados();

    // 3. Buscamos si existe una familia cuyos datos coincidan en .json
    const familiaEncontrada = familias.find(
        fam => normalizarTexto(fam.paterno) === usuarioTexto && normalizarTexto(fam.materno) === contrasenaTexto//Normalizamos el texto de la comparacion de fam.paterno para que tambien no haya problema si añade caracteres especiales, mayusculas et.
    );

    // 4. Verificamos el resultado
    if (familiaEncontrada){
        console.log("¡Familia encontrada!", familiaEncontrada);

        // 5. Guardamos el apellido paterno para poder recuperarlo en confirmacion.html
        sessionStorage.setItem("familia",familiaEncontrada.id);

        console.log(
            "Guardamos en sessionStorage",
            sessionStorage.getItem("familia")
        );

         // 6. Mandamos al usuario a la siguiente página
          window.location.href = "confirmacion.html";
    } else {
        // El alert va en el ELSE para que solo salga si fallaron los datos
        alert("Datos incorrectos, Verifica tu usuario y/o contraseña");
    }

});
