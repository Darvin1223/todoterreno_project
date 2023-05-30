function aprobar(
  id,
  nombre,
  price,
  bathroon,
  parking,
  bedroom,
  descripcion,
  moneda,
  categoria,
  provincia,
  municipio,
  image_propiedades_revisar,
  destacado
) {
  var editor2 = new RichTextEditor("#div_editor2");

  document.getElementById("id_aprove").value = id;
  console.log(id);
  console.log(document.getElementById("id_aprove"));
  document.getElementById("name_approve").value = nombre;
  document.getElementById("price_approve").value = price;
  document.getElementById("bathroon_approve").value = bathroon;
  document.getElementById("parking_approve").value = parking;
  document.getElementById("bedroom_approve").value = bedroom;
  document.getElementById("categoria_approve").value = categoria;
  // document.getElementById('div_editor1').value = descripcion;
  // let editor = document.getElementById('div_editor1').value = descripcion;
  // console.log(editor.innerHTM)
  editor2.setHTMLCode(descripcion);

  console.log("Provincias");
  console.log(provincia);
  console.log("Municipio");
  console.log(municipio);
  // document.getElementById('provincias_approve').value = categoria;

  if (destacado == 1) {
    document.getElementById("destacado_approve").checked = true;
  }

  document.getElementById("moneda_approve").value = moneda;
  document.getElementById("provincias").value = provincia;
  document.getElementById("municipios").value = municipio;

  document.getElementById("images_aproves").value = image_propiedades_revisar;

  document.getElementById("images").innerHTML = "";

  JSON.parse(image_propiedades_revisar).forEach((element) => {
    document.getElementById(
      "images"
    ).innerHTML += `<img src="imagenesPropiedades/${element}" class="responsive w-50" alt="No carga">`;
  });
}
