// Escuchar el evento "submit" en el formulario de creación de producto
document.addEventListener("DOMContentLoaded", () => {
    const createForm = document.querySelector('form[action="/admin/create"]');
    if (createForm) {
        createForm.addEventListener("submit", (e) => {
            const title = createForm.querySelector('input[name="title"]').value;
            const category = createForm.querySelector('input[name="category"]').value;
            const price = createForm.querySelector('input[name="price"]').value;

            console.log(`Creando producto: ${title}, Categoría: ${category}, Precio: $${price}`);
        });
    }

    // Escuchar el evento "submit" en los formularios de actualización y eliminación
    const updateForms = document.querySelectorAll('form[action^="/admin/update"]');
    updateForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            const title = form.querySelector('input[name="title"]').value;
            const category = form.querySelector('input[name="category"]').value;
            const price = form.querySelector('input[name="price"]').value;

            console.log(`Actualizando producto: ${title}, Categoría: ${category}, Precio: $${price}`);
        });
    });

    const deleteForms = document.querySelectorAll('form[action^="/admin/delete"]');
    deleteForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            const productId = form.action.split("/").pop(); // Obtengo el ID del producto del formulario
            console.log(`Eliminando producto con ID: ${productId}`);
        });
    });
});