/**
 * Qui i tag della pagina sono visibili
 */
function insert_into_textfield(id, value) {
    try {
        document.getElementById(id) = value
    } catch (error) {
        console.log("textfield with id " + id + " not found")
    }
}

insert_into_textfield("name", "porcoddio")
alert("modificato")
