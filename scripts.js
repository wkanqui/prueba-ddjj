const llamadaApi = async(url) => {
    

    const llamada = await fetch(url);


    //console.log(llamada.url);

    return llamada.url
}

const url = 'https://picsum.photos/200';

const nodoPadre = document.querySelector(".nodoContenedor");

//llamadaApi(url);

const crearFotos = async(valor) => {
    for(let i = 0; i < valor; i++) {
        let imagen = document.createElement("img");
        imagen.src = await llamadaApi(url);
        nodoPadre.appendChild(imagen);
    }
}
mostrarXcantidadFotos = () => {
    document.querySelector('.nodoContenedor').innerHTML = '';
    let valor = document.querySelector('#selector');
    console.log(valor.value);
    crearFotos(parseInt(valor.value))
}
// crearFotos();

