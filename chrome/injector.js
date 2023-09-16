/**
 * Qui i tag della pagina sono visibili
 */
function insert_into_textfield(id, value) {
    console.log("Inserting " + value + " into " + id)
    let notFoundItems = []
    try {
        document.getElementById(id).value = value
    } catch (error) {
        notFoundItems.push(id)
    }

    if (notFoundItems.length > 0) {
        console.log("These items were not found: " + notFoundItems)
    } else {
        console.log("All items were filled")
    }
}

insert_into_textfield("nome_form", "madonna")
insert_into_textfield("email_form", "dio@cane.it")
