// La función tiene dos parámetros porque, además de la url, con el segundo parámetro, recorro para que traiga fotos distintas.
llamadaFoto = async(url,i) => {
    
    const llamada = await fetch(url);
    const llamadaJSON = await llamada.json();
    return llamadaJSON.results[i].persona.foto.thumbnail;
}

const url = 'https://gobiernoabierto.cordoba.gob.ar/api/ddjj/';
const nodoPadre = document.querySelector(".nodoContenedor");

// llamadaApi(url);

crearFotos = async(valor) => {
    for(let i = 0; i < valor; i++) {
        let imagen = document.createElement("img");
        imagen.src = await llamadaFoto(url,i);
        nodoPadre.appendChild(imagen);
    }
}

mostrarXcantidadFotos = () => {
    document.querySelector('.nodoContenedor').innerHTML = '';
    document.querySelector('.nodoDos').innerHTML = '';
    let valor = document.querySelector('#selector');
    console.log(valor.value);
    crearFotos(parseInt(valor.value));
    crearBotonDNI(parseInt(valor.value));
}


// Ahora vamos a intentar buscar los datos de x funcionario, para eso, crearemos botones

llamadaDNI = async(url,a) => {
    
    const llamadab = await fetch(url);
    const llamadabJSON = await llamadab.json();
    return llamadabJSON.results[a].persona.uniqueid;
}


const nodoDos = document.querySelector(".nodoDos")


crearBotonDNI = async(valor) => {
    for(let a = 0; a < valor; a++) {
        let botoncito = document.createElement("button");;
        let botonVer = document.createTextNode('Ver declaración');
        botoncito.setAttribute('name', await llamadaDNI(url,a));
        botoncito.setAttribute('class','botonFoto');
        botoncito.setAttribute('id',a);
        botoncito.appendChild(botonVer);
        botoncito.setAttribute('onclick', "muestraPatrimonio(this.id)")
        nodoDos.appendChild(botoncito);
    }
};

// Estas dos funciones generan el contenido, los nombres:


llamadaNombre = async(url,n) => {
    
    const llamadan = await fetch(url);
    const llamadanJSON = await llamadan.json();
    return llamadanJSON.results[n].persona.nombrepublico;
}

const nombreF = document.querySelector('.nombreFuncionario')

muestraPatrimonio = async(p) => {
    document.querySelector('.nombreFuncionario').innerHTML = '';
    let nombreff = await llamadaNombre(url, p)
    let textoVerde = document.createTextNode(nombreff)
    nombreF.appendChild (textoVerde)
    muestraDeuda(p)
}

// Acá vamos a ver si podemos calcular la deuda.

llamadaDeuda = async(url,n) => {
    
    const llamadad = await fetch(url);
    const llamadadJSON = await llamadad.json();
    let nohaydeuda = "no tiene deuda";
    let adeuda = "adeuda"
    if (llamadadJSON.results[n].deudas[0] == null) {
        return ` ${nohaydeuda}`;    
    } else {
        return ` ${adeuda}` + ` ${llamadadJSON.results[n].deudas[0].valor} pesos`;
    }
    
}
const nombreD = document.querySelector('.deudaFuncionario')

muestraDeuda = async(p) => {
    document.querySelector('.deudaFuncionario').innerHTML = '';
    let nombreDe = await llamadaDeuda(url, p)
    let textoRojo = document.createTextNode(`${nombreDe}`)
    nombreD.appendChild (textoRojo)
}