const conexion = require("../database/db");
const { convert } = require("html-to-text");
const slug = require("slug");

class Blogs {
    showAllBlogs(req, res) {
        const { rol, id_user } = req.session;
        const user_rol = rol;
        const user_id = id_user;
        conexion.query(
            "SELECT * FROM `blog` INNER JOIN user ON blog.user_id = user.id_user ",
            (error, blogs) => {
                if (error) {
                    throw error;
                } else {
                    res.render("layouts/blogs", {
                        title: "Blogs || Grupo TodoTerreno",
                        blogs: blogs,
                        user_rol: user_rol,
                        user_id: user_id,
                    });
                }
            }
        );
    }

    create_blog(req, res) {
        const { rol, id_user } = req.session;
        const user_id = id_user;
        const { nameBlog, descripcion_blog } = req.body;
        const { filename } = req.file;
        const date = new Date();
        const url_seo = slug(nameBlog, "-");
        const formatDate = (date) => {
            let formatted_date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

            return formatted_date;
        };
        const text = convert(descripcion_blog, {
            wordwrap: 130,
        });
        const imagePath = `imagenesBlog/${filename}`;
        const extract = text.substring(0, 250);
        const meta_description = text.substring(0, 160);

        conexion.query(
            "INSERT INTO blog SET ?", {
                title_blog: nameBlog,
                description_blog: descripcion_blog,
                extract_blog: extract,
                fecha_blog: formatDate(date),
                image_blog: imagePath,
                seo_url_blog: url_seo,
                meta_description_blog: meta_description,
                user_id: user_id,
            },
            (error) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect("/blogs_admin");
                }
            }
        );
    }

    // Update Blog
    update_blog(req, res) {
            const { id, nameBlog, descripcion_blog } = req.body;
            

            const date = new Date();
            const url_seo = slug(nameBlog, "-");
            const formatDate = (date) => {
                let formatted_date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

                return formatted_date;
            };
            const text = convert(descripcion_blog, {
                wordwrap: 130,
            });

            const extract = text.substring(0, 250);
            const meta_description = text.substring(0, 160);


            if (req.file != undefined) {

                const { filename } = req.file;

                const imagePath = `imagenesBlog/${filename}`;



                conexion.query(
                    "UPDATE blog set ? WHERE id_blog  = ?", [{
                            title_blog: nameBlog,
                            description_blog: descripcion_blog,
                            extract_blog: extract,
                            fecha_blog: formatDate(date),
                            image_blog: imagePath,
                            seo_url_blog: url_seo,
                            meta_description_blog: meta_description,
                        },
                        id,
                    ],
                    (error) => {
                        if (error) {
                            throw error;
                        } else {
                            res.redirect("/blogs_admin");
                        }
                    }
                );



            } else {
                conexion.query(
                    "UPDATE blog set ? WHERE id_blog  = ?", [{
                            title_blog: nameBlog,
                            description_blog: descripcion_blog,
                            extract_blog: extract,
                            fecha_blog: formatDate(date),
                            seo_url_blog: url_seo,
                            meta_description_blog: meta_description,
                        },
                        id,
                    ],
                    (error) => {
                        if (error) {
                            throw error;
                        } else {
                            res.redirect("/blogs_admin");
                        }
                    }
                );
            }
        }



        // Delete blog
    delete_blog(req, res) {
        const id = req.params.id;

        conexion.query('DELETE FROM blog WHERE id_blog  = ?', [id], error => {
            if (error) {
                throw error;
            } else {
                res.redirect("/blogs_admin");
            }
        })
    }

    /* Client */

    // Show All Propiedades
    showAllClientBlog(req, res) {
        conexion.query(
            "SELECT * FROM `blog`",
            (error, blogs) => {
                if (error) {
                    throw error;
                } else {
                    res.render("Blogs", {
                        layout: false,
                        title: "Blogs || Grupo TodoTerreno",
                        blogs: blogs
                    });
                }
            }
        );
    }

    // Get One Blog
    getOneBlog(req, res) {
        const id = req.query.id;

        conexion.query('SELECT * FROM `blog` WHERE id_blog  = ?', [id], (error, result) => {
            if (error) {
                throw error;
            } else {
                const title = result[0].title_blog;
                res.render('Blog', {
                    layout: false,
                    title: `${title} || Grupo todoterreno`,
                    Blog: result[0]
                })
            }
        })
    }
}

module.exports = new Blogs();