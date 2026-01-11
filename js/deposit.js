$(document).ready(function() {

    // Inicializar saldo si no existe
    if (!localStorage.getItem('saldo')) localStorage.setItem('saldo', '0');
    if (!localStorage.getItem('transactions')) localStorage.setItem('transactions', JSON.stringify([]));

    // Mostrar saldo actual
    let saldo = parseFloat(localStorage.getItem('saldo'));
    $('#saldoDisplay').text(`Saldo actual: $${saldo.toFixed(2)}`);

    $('#depositForm').submit(function(e) {
        e.preventDefault();

        let monto = parseFloat($('#depositAmount').val());
        if (monto <= 0) return;

        // Actualizar saldo
        saldo += monto;
        localStorage.setItem('saldo', saldo.toString());

        // Guardar transacción
        let transactions = JSON.parse(localStorage.getItem('transactions'));
        transactions.push({ tipo: 'depósito', monto: monto });
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Mostrar mensaje de éxito
        $('#alert-container').html(`<div class="alert alert-success text-center">Depósito de $${monto.toFixed(2)} realizado con éxito</div>`);

        // Actualizar saldo en pantalla
        $('#saldoDisplay').text(`Saldo actual: $${saldo.toFixed(2)}`);

        // Limpiar formulario
        $('#depositAmount').val('');

        // Redirigir al menú después de 2 segundos
        setTimeout(() => window.location.href = 'menu.html', 2000);
    });

});

