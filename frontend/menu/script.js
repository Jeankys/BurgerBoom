document.addEventListener("DOMContentLoaded", function () {
    const finalizarOrdenBtn = document.getElementById('finalizarOrden');
    const popupOrden = document.getElementById('popupOrden');
    const closePopup = document.getElementById('closePopup');
    const resumenOrden = document.getElementById('resumenOrden');

    finalizarOrdenBtn.addEventListener('click', function () {
        // Obtener los valores seleccionados del formulario
        const hamburguesa = document.getElementById('hamburguesas').value;
        const adicion = document.getElementById('adiciones').value; // Este es el id correcto
        const bebida = document.getElementById('bebidas').value;
        const mensaje = document.getElementById('mensaje').value || "Sin mensaje adicional";

        // Validar que se seleccionó una hamburguesa, adiciones y bebida
        if (!hamburguesa || !adicion || !bebida) {
            alert('Por favor, selecciona todas las opciones.');
            return 1; // Error, falta alguna selección
        }

        fetch('/finalizarOrden', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hamburguesa: hamburguesa,
                adicion: adicion,
                bebida: bebida,
                mensaje: mensaje
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(`Orden recibida con éxito. ID del pedido: ${data.orderId}`);
        })
        .catch((error) => {
            alert('Hubo un error al enviar el pedido.');
            console.error('Error:', error);
        });

        // Crear el resumen del pedido
        const resumen = `
            <strong>Hamburguesa:</strong> ${hamburguesa}<br>
            <strong>Adiciones:</strong> ${adicion}<br>
            <strong>Bebida:</strong> ${bebida}<br>
            <strong>Mensaje adicional:</strong> ${mensaje}
        `;

        // Mostrar el resumen en el popup
        resumenOrden.innerHTML = resumen;

        // Mostrar el popup
        popupOrden.style.display = 'block';
        return 0; // Éxito
    });

    // Cerrar el popup cuando se haga clic en el botón de cerrar
    closePopup.addEventListener('click', function () {
        popupOrden.style.display = 'none';
    });

    // Cerrar el popup si el usuario hace clic fuera del contenido del popup
    window.addEventListener('click', function (event) {
        if (event.target === popupOrden) {
            popupOrden.style.display = 'none';
        }
    });
});
