// const $provincias = document.getElementById('provincias');
// const $contentMunicipios = document.getElementById('municipioContainer');
// const $municipios = document.getElementById('municipios');

// axios
// 	.get('/getprovincias')
// 	.then(function (response) {
// 		// console.log(response);

// 		response.data.forEach((get_provincias) => {
// 			let { codigo, nombre } = get_provincias;

// 			$provincias.innerHTML += `<option value=${codigo}>${nombre}</option>`;
// 		});
// 	})
// 	.catch(function (error) {
// 		// handle error
// 		console.log(error);
// 	})
// 	.then(function () {
// 		// always executed
// 	});

// axios
// 	.get('/getmunicipios/' + 1)
// 	.then(function (response) {
//         // console.log(response)
// 		response.data.forEach((municipio) => {
// 			let { nombre } = municipio;

// 			$municipios.innerHTML += `<option value="${nombre}" name="test">${nombre}</option>`;
// 		});
// 	})
// 	.catch(function (error) {
// 		// handle error
// 		console.log(error);
// 	})
// 	.then(function () {
// 		// always executed
// 	});

// function ShowSelected() {
// 	var combo = document.getElementById('provincias');
// 	var selected = combo.options[combo.selectedIndex].value;

// 	$municipios.innerHTML = '';

// 	axios
// 		.get('/getmunicipios/' + selected)
// 		.then(function (response) {
// 			response.data.forEach((municipio) => {
// 				let { nombre } = municipio;

// 				$municipios.innerHTML += `<option value="${nombre}" name="test">${nombre}</option>`;
// 			});
// 		})
// 		.catch(function (error) {
// 			// handle error
// 			console.log(error);
// 		})
// 		.then(function () {
// 			// always executed
// 		});

// 	console.log(selected);
// 	console.log($municipios);
// }


let cargarProvincias = () => {
    let camposProvincias = document.getElementsByName('provincias');
    //console.log(camposProvincias);
    for (let indexCampos = 0; indexCampos < camposProvincias.length; indexCampos++) {
        const camposProvinciasElement = camposProvincias[indexCampos];

        for (let index = 0; index < provincias.length; index++) {
            const element = provincias[index];

            let nuevaProvincia = document.createElement('option');
            nuevaProvincia.setAttribute('value', element.codigo);
            nuevaProvincia.innerHTML = element.nombre;

            camposProvinciasElement.appendChild(nuevaProvincia);
        }

       // console.log(camposProvinciasElement);
    }


};
let provincias;

axios
    .get('/getprovincias')
    .then(function(response) {
        provincias = response.data;
        cargarProvincias();
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    });



let eliminarHijos = (campo) => {
    while (campo.firstChild) {
        campo.removeChild(campo.lastChild);
    }
};

let getMunicipios = async(idProvincia) => {
    let response = await fetch('/getmunicipios/' + idProvincia);
    let data = await response.json();

    return data;
}

let cargarMunicipios = (id, target) => {
    let campoProvincia = document.getElementById(id);

    let idProvincia = campoProvincia.value;
    let selectMunicipios = document.getElementById(target);

  /*   console.log({
        idProvincia,
        campoProvincia,
        selectMunicipios,
        target
    }); */

    eliminarHijos(selectMunicipios)

    getMunicipios(idProvincia).then(municipios => {
        for (let indexMunicipios = 0; indexMunicipios < municipios.length; indexMunicipios++) {
            const municipio = municipios[indexMunicipios];

            let nuevoMunicipio = document.createElement('option');
            nuevoMunicipio.setAttribute('value', municipio.municipio_id);
            nuevoMunicipio.innerHTML = municipio.nombre;
            nuevoMunicipio.setAttribute('value', municipio.nombre);

            selectMunicipios.appendChild(nuevoMunicipio);
        }
    });
};


// Event Listeners
let camposProvincias = document.getElementsByName('provincias');
document
for (let index = 0; index < camposProvincias.length; index++) {
    const element = camposProvincias[index];

    element.addEventListener('change', () => {
        cargarMunicipios(element.id, element.dataset.target);
    });
}



//Nuevo Codigo Luego lo modificas


const $municipioEditar_edit = document.getElementById('municipioEditar_edit');
const $municipios = document.getElementById('municipioAgregarAprobada');


function obtener_municipios(id, $municipios){

    $municipios.innerHTML = "";
 

    axios
    .get('/getmunicipios/' + id)
    .then(function (response) {

        response.data.forEach((municipio) => {
            let { nombre } = municipio;
            $municipios.innerHTML += `<option value="${nombre}" name="test">${nombre}</option>`;
        });
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
    });
}

function obtener_provincias($provincias){
    axios
    .get('/getprovincias')
    .then(function (response) {
         console.log(response);

        response.data.forEach((get_provincias) => {
            let { codigo, nombre } = get_provincias;

            $provincias.innerHTML += `<option value=${nombre}>${nombre}</option>`;
        });
    })
    .catch(function (error) {

        console.log(error);
    })
    .then(function () {
   
    });
}


async function obtener_datos_edit_aprobado(provincia_name,municipio_name){


    //provinciaEditar_edit

    //Provincia Variables
    let control = document.querySelector('#provinciaEditar_edit');
    var options = control.querySelectorAll('option');

    let contador_provincia = -1;
    let contador_municipio = -1;
    
    options.forEach(provincia => {
        
        contador_provincia = contador_provincia + 1;

        if(provincia_name == provincia.textContent){
            control.selectedIndex = contador_provincia;
        }

    });


    await axios
    .get('/getonepronvicia/'+provincia_name)
    .then(function (response) {

        let {codigo} = response.data[0];

        obtener_municipios(codigo,document.getElementById('municipioEditar_edit')); 
         
    })
    .catch(function (error) {

        console.log(error);
    })
    .then(function () {
   
    });

    setTimeout(function(){

    let control_municipios = document.querySelector('#municipioEditar_edit');
    var options_municipios = control_municipios.querySelectorAll('option');


    options_municipios.forEach(municipio => {


        contador_municipio = contador_municipio + 1;

        if(municipio_name == municipio.textContent){
            control_municipios.selectedIndex = contador_municipio;
        }


        
    });


    },1000);



}





obtener_municipios(1,$municipios); 






