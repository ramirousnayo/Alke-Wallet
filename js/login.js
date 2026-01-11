$(document).ready(function() {

    $('#loginForm').submit(function(e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        const alertContainer = $('#alert-container');

        if(email === "admin@wallet.com" && password === "1234") {
            alertContainer.html('<div class="alert alert-success text-center">Login exitoso</div>');

            setTimeout(() => {
                window.location.href = "menu.html";
            }, 1000);

        } else {
            alertContainer.html('<div class="alert alert-danger text-center">Credenciales incorrectas</div>');
        }
    });

});
