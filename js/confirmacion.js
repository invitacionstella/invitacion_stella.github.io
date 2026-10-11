const idFamilia = sessionStorage.getItem("familia");
let familia;
   
console.log("Familia recuperada:", idFamilia);

//Validamos si alguien se salto el login, o fue directo a confirmacion.html, si si, lo regresamos a index
if (idFamilia === null){
    //Si lo es, la mandamos de nuevo al login 
    window.location.href = "index.html";
}


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

async function iniciar() {
    //Cargamos al lista del JSON
    const familias = await cargarInvitados();

    //Buscamos coincidencias de datos con familia
    familia = familias.find(fam => fam.id === idFamilia)
    console.log("Familia encontrada", familia)

    // recorremos la lista par que imprima a los integrantes    
    const listaInt = document.getElementById("integrantes")
    familia.integrantes.forEach(nombre => {listaInt.innerHTML += `<label class="inline-flex items-center space-x-2 cursor-pointer">
                                                                    <input type="checkbox" value="${nombre}" class=" italic form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"/>
                                                                    <span class=" italic text-gray-700">${nombre}</span>
                                                                    </label>`;});
}

const btnConfirmar = document.getElementById("btn-confirmar")

//Marcamos la acción del boton confirmar
btnConfirmar.addEventListener("click",() => {
    console.log("Click") 
    //revisamos si alguna checkbox esta seleccionada
    const seleccionadas = document.querySelectorAll("#integrantes input:checked")
    //imprimimos en la terminal cuantas checkbox estan seleccionadas
    console.log("Las personas seleccionados son: ", seleccionadas.length)
    //Creamos un ciclo para que extraiga el nombre de la caja y lo imprima dentro de la terminal
    //Creamos una lista vacia para guardar los nombres
    const nombres = [];
    seleccionadas.forEach(casilla => {nombres.push(casilla.value);})  // .push agrega un elemento a la lista en este caso los nombres

    const nombresUnidos = nombres.join(", ")// guardamos en una variable y unimos con .join para que se impriman los nombres y salgan con una coma
    console.log (nombresUnidos)//Mandamos a imprimir los nombres unidos a la terminal
    console.log(familia.familia)//Mandamos a imprimir a la terminal el nombre de la familia

    const Cintegrantes = seleccionadas.length//Contamos y guardamos en una variable cuantas personas fueron seleccionadas

    if (Cintegrantes === 0){
        alert("Selecciona al menos un integrante")
        return;
    }

    const mensaje = `La familia ${familia.familia} confirma ${Cintegrantes}, y sus nombres son ${nombresUnidos}`// Guardamos el msj en una variable mandando llamar todas las variables
    console.log(mensaje)//Mandamos a imprimir el msj en la terminal

    const msjWhatsApp = encodeURIComponent(mensaje) //con encodeURIcomponent codificamos el msj para que whatsapp lo pueda interpretar, y se pueda mandar desde el enlace
    const enlace = `https://wa.me/523317066904?text=${msjWhatsApp}` //Generamos y guardamos el enlace en una variable, si no es asi, js lo detecta como codigo por los caracteres que contiene, dentro de el colocamos nuestro numero con lada, y con literal templetes mandamos el msj codificado llamando la variable 
    console.log(enlace)//Imprimimos el enlace en la consola
    window.open(enlace)
    window.location.href = "sobre.html"
});


 const btnInasistencia = document.getElementById("btn-inasistencia")

 //Marcamos la acción del boton de inasistencia
 btnInasistencia.addEventListener("click",() => {
    console.log("Click")

    //Generamos el msj que se enviara por whatsapp
    const avisoInasistencia = `Hola!, somos la familia ${familia.familia} y no podremos asistir al evento`
    console.log(avisoInasistencia)

    const msjWhatsApp = encodeURIComponent(avisoInasistencia)
    const enlace = `https://wa.me/523317066904?text=${msjWhatsApp}`
    console.log(enlace)
    window.open(enlace)
});

iniciar();