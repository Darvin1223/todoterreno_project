function editar(id, nombre, price, bathroon, parking, bedroom, descripcion, moneda, categoria, provincia, municipio, image_propiedades_revisar, destacado) {

    var editor3 = new Quill('#editor3', {
        theme: 'snow'
      });

    document.getElementById('id_edit_aprove').value = id;
    document.getElementById('name_edit_aprove').value = nombre;
    document.getElementById('price_edit_aprove').value = price;
    document.getElementById('bathroon_edit_aprove').value = bathroon;
    document.getElementById('parking_edit_aprove').value = parking;
    document.getElementById('bedroom_edit_aprove').value = bedroom;
    document.getElementById('categoria_edit_aprove').value = categoria;
    // document.getElementById('div_editor1').value = descripcion;
    // let editor = document.getElementById('div_editor1').value = descripcion;
    // console.log(editor.innerHTM)
    editor3.setHTMLCode(descripcion)


    console.log(provincia);
    console.log('--------');
    console.log(municipio);

    obtener_datos_edit_aprobado(provincia,municipio);


    if (destacado == 1) {
        document.getElementById('destacado_edit_aprove').checked = true;
    }

    document.getElementById('moneda_edit_aprove').value = moneda;
  




    document.getElementById('images_edits').value = image_propiedades_revisar;

    document.getElementById('images').innerHTML = "";


    JSON.parse(image_propiedades_revisar).forEach(element => {


        document.getElementById('images').innerHTML += `<img src="ImagenesPropiedades/${element}" class="responsive w-50" alt="No carga">`


    });



}