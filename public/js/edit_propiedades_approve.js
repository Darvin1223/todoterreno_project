document.addEventListener("DOMContentLoaded", ()=>{
    

    let form_edit_approve = document.getElementById("form_propiedades_edit_approve");
    // let url_api = "";
    const editData = async (id_data) => {
        let nombreProvincia = "";
        let nombreMunicipio = "";
        let allProvincias = [];
        let allMunicipios = [];
        let codigo = 0;
        let codigo_id = 0;
        let imagenes = [];
        //Getting information about the real state
        const response = await fetch(`/apiv1/getpropiedad?id_data=${id_data}`);
        const propiedadData = await response.json();
        const data = Object.values(propiedadData);

        //Getting data about the province
        const provincias = await fetch('/getprovincias');
        const provinciasData = await provincias.json();
        const dataProvincia = Object.values(provinciasData);
        
        // province_propiedad_approve
        for (let i = 0; i < dataProvincia.length; i++) {
            const element = dataProvincia[i].nombre; 
            if(element == data[0].province_propiedad_approve){
                codigo = dataProvincia[i].codigo;
                nombreProvincia = element;
                break;
            }
        }
        for (let i = 0; i < dataProvincia.length; i++) {
            const element = dataProvincia[i].nombre;
            const elementCodigo = dataProvincia[i].codigo;
            const allData = {codigoProvincia:elementCodigo, nombreProv:element }
            allProvincias.push(allData);
            if(element == data[0].province_propiedad_approve){
                console.log("found it");
                continue;
            }
        }
        //Getting data about municipies
        const municipies = await fetch(`/getmunicipios/${codigo}`);
        const municipiesData = await municipies.json();
        const dataMunicipio = Object.values(municipiesData);
        for(let i = 0; i < dataMunicipio.length; i++){
            const element = dataMunicipio[i].nombre;
            if(element == data[0].municipios_propiedad_approve){
                nombreMunicipio = element;
                break;
            }
        }
      
        for(let i = 0; i < dataMunicipio.length; i++){
            const element = dataMunicipio[i].nombre;
            allMunicipios.push(element);
            if(element == data[0].municipios_propiedad_approve){
               continue;
            }
        }

        const getProvincias = async (nombre) =>{
            const provinciasPeticion = await fetch('/getprovincias');
            const provinciasDataPeticion = await provinciasPeticion.json();
            const dataProvinciaPeticion = Object.values(provinciasDataPeticion);
            for (let i = 0; i < dataProvinciaPeticion.length; i++) {
                const element = dataProvinciaPeticion[i];
                if(element == nombre){

                }
            }

        }
        console.log(allProvincias.forEach(elementos => console.log(elementos.nombreProv)))
        
        let elementHtml = `
                <input type=hidden value=${id_data} name=id_edit > </input>
                <div class="form-group">
                    <label for="name">Nombre De la propiedad</label>
                    <input type="text" class="form-control" name="name" id="name_edit_aprove" value=${data[0].name_propiedad_approve} aria-describedby="namehelp">
                    <small id="namehelp" class="form-text text-muted">por favor introduza el nombre de la propiedad.</small>
                </div>
                <div class="form-group">
                    <label for="precio">Precio</label>
                    <input type="text" class="form-control" name="price" value=${data[0].price_propiedad_approve} id="price_edit_aprove" aria-describedby="numberHelp">
                    <small id="numberHelp" class="form-text text-muted">Por favor introduzca el precio.</small>
                </div>

                <div class="form-group" id="provinciaContainer">
                    <label for="provincia">Provincias:</label>
                   <!-- <select class="form-control" id="provinciaEditar_edit" value=${data[0].province_propiedad_approve} name="provincias" onchange="obtener_municipios(document.getElementById('provinciaEditar_edit').value,document.getElementById('municipioEditar_edit'))" data-target="municipioEditar" required>
                    </select> -->
                    <select class="form-control"  name="provincias" required>
                        <option disabled selected value=${codigo}> ${data[0].province_propiedad_approve} </option>
                        ${allProvincias.map(element => `<option  value=${element.codigoProvincia}> ${element.nombreProv} </option>`)}
                    </select>
                    <small class="form-text text-muted">Por favor seleccione la provincia.</small>
                </div>

                <div class="form-group" id="municipioContainer">
                    <label for="municipio">Municipios:</label>
                    <select class="form-control" name="municipios">
                        <!-- <select class="form-control" name="municipios"> -->
                        <option  disabled selected >${data[0].municipios_propiedad_approve}</option>
                      ${  allMunicipios.map(element => `<option value=${element}>${element}</option>`)}
                    </select>
                    <small class="form-text text-muted">Por favor seleccione la municipio.</small>
                </div>



                <div class="form-group">
                    <label for="bathroon">cantidad de baños:</label>
                    <input type="number" aria-describedby="bathroonHelp" value=${data[0].bathroom_propiedad_approve} class="form-control" name="bathroon" id="bathroon_edit_aprove">
                    <small id="bathroonHelp" class="form-text text-muted">Por favor introduzca la cantidad de ba単os.</small>
                </div>
                <div class="form-group">
                    <label for="parking">cantidad de parqueos:</label>
                    <input type="number" aria-describedby="parkingHelp" class="form-control" value=${data[0].parking_propiedad_approve} name="parking" id="parking_edit_aprove">
                    <small id="parkingHelp" class="form-text text-muted">Por favor introduzca la cantidad de parqueos.</small>
                </div>
                <div class="form-group">
                    <label for="bedroom">cantidad de habitaciones:</label>
                    <input type="number" aria-describedby="bedroomHelp" class="form-control" value=${data[0].bedrooms_propiedad_approve} name="bedroom" id="bedroom_edit_aprove">
                    <small id="bedroomHelp" class="form-text text-muted">Por favor introduzca la cantidad de habitaciones.</small>
                </div>
                <div class="form-group">
                    <label for="Tipo">Selecione la categoria</label>
                    <select name="categoria" id="categoria_edit_aprove" class="form-control">
                        <option value="#" disabled selected>Seleccione:</option>
                        <option value="casa">Casa</option>
                        <option value="apartamento">apartamento</option>
                        <option value="pent-house">pent-house</option>
                        <option value="solar">solar</option>
                        <option value="finca">finca</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="Tipo">Active si es una propiedad destacada</label>
                    <input type="checkbox" name="destacado" id="destacado_edit_aprove" value="1">
                </div>
                <div class="form-group">
                    <label for="moneda">Selecione la Moneda</label>
                    <select name="moneda" id="moneda_edit_aprove" class="form-control">
                        <option value="#" disabled selected>Seleccione:</option>
                        <option value="RD$">RD$</option>
                        <option value="US$">US$</option>
                        <option value="€">€</option>
                    </select>
                </div>
                <!-- <div class="form-group" id="provinciaContainer">
                    <label for="provincia">Provincias:</label>
                    <select class="form-control" id="provinciaAgregarAprobada" name="provincias" data-target="municipioEditarAprobada" required>
                    </select>
                    <small class="form-text text-muted">Por favor seleccione la provincia.</small>
                </div>
                <div class="form-group" id="municipioContainer">
                    <label for="municipio">Municipios:</label>
                    <select class="form-control" id="municipioEditarAprobada" name="municipios">
                    </select>
                    <small class="form-text text-muted">Por favor seleccione la municipio.</small>
                </div> -->
                <div class="form-group">
                    <label for="description_html">Descripcion:</label>
                    <textarea id="editor3" class="form-control"   name="description_html" style="height: 100px;"></textarea>
                 
                    <small id="DescripcionHelp" class="form-text text-muted">Por favor introduzca la descripcion de la propiedad.</small>
                </div>
                <div class="form-group">
                    <label for="">Imagenes</label>
                    <div id="images">
                    </div>
                   
                    <input type="hidden" id="images_edits">
                </div>
                <div class="form-group">
                    <div class="custom-file">
                        <input type="file" multiple="true"  id="image" name="image_propiedades">
                        <label  for="image">Choose file...</label>
                        <div id="image-preview"></div>

                    </div>
                    <!-- <small id="DescripcionHelp" class="form-text text-muted">Por favor seleccione las imagenes</small> -->
                </div>

                <button type="submit" class="btn btn-primary">Guardar</button>`;
        form_edit_approve.innerHTML = elementHtml;
        tinymce.init({
selector: '#editor3',
plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
setup: function (editor) {
editor.on('init', function () {
// Establecer el contenido en el editor
editor.setContent(data[0].description_propiedad_approve);
});
}
});

    }
    
})