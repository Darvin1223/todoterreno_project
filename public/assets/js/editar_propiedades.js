
function editar(id,nombre,price,bathroon,parking,bedroom,descripcion,moneda,categoria,provincia,municipio,image_propiedades_revisar,destacado){

    var editor2 = new new Quill('#editor2', {
        theme: 'snow'
      });
   
   document.getElementById('id_edit').value = id;
   document.getElementById('name_edit').value = nombre;
   document.getElementById('price_edit').value = price;
   document.getElementById('bathroon_edit').value = bathroon;
   document.getElementById('parking_edit').value = parking;
   document.getElementById('bedroom_edit').value = bedroom;
   document.getElementById('categoria_edit').value = categoria;
   // document.getElementById('div_editor1').value = descripcion;
   // let editor = document.getElementById('div_editor1').value = descripcion;
   // console.log(editor.innerHTM)
   editor2.setHTMLCode(descripcion)

   
   console.log(provincia);
   console.log('--------');
   console.log(municipio);

   if(destacado == 1){
       document.getElementById('destacado_edit').checked = true;
   }

   document.getElementById('moneda_edit').value = moneda;
   document.getElementById('provinciaEditar').value = provincia;
   document.getElementById('municipioEditar').value = municipio;
   
   

   
document.getElementById('images_edits').value = image_propiedades_revisar;

document.getElementById('images').innerHTML = "";


JSON.parse(image_propiedades_revisar).forEach(element => {
   

   document.getElementById('images').innerHTML += `<img src="ImagenesPropiedades/${element}" class="responsive w-50" alt="No carga">`


});



}

