document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch para enviar los datos a un servidor

        alert('Gracias por contactarnos. Te responderemos pronto.');
        
        // Limpia el formulario
        this.reset();
    });
});