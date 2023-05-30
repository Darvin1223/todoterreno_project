    function editar(id,title,descripcion){

         var editor1 = new RichTextEditor("#div_editor2");
        
        document.getElementById('id_edit').value = id;
        document.getElementById('nameBlog_edit').value = title;
    
        // document.getElementById('div_editor1').value = descripcion;
        // let editor = document.getElementById('div_editor1').value = descripcion;
        // console.log(editor.innerHTM)
        editor1.setHTMLCode(descripcion);
    }

