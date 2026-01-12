$(document).ready(function() {

    // Inicializar transacciones
    if (!localStorage.getItem('transactions')) localStorage.setItem('transactions', JSON.stringify([]));
    let transactions = JSON.parse(localStorage.getItem('transactions'));

    const list = $('#transactionsList');

    function renderTransactions(filter='all') {
        list.empty();
        let filtered = transactions;

        if(filter !== 'all') {
            filtered = transactions.filter(t => t.tipo === filter);
        }

        if(filtered.length === 0) {
            list.append('<li class="list-group-item text-center text-muted">No hay movimientos</li>');
            return;
        }

        filtered.reverse().forEach(t => {
            let text = t.tipo === 'transferencia'
                ? `Transferencia a ${t.contacto} - $${t.monto.toFixed(2)}`
                : `Depósito - $${t.monto.toFixed(2)}`;

            list.append(`<li class="list-group-item">${text}</li>`);
        });
    }

    // Renderizar al cargar //
    renderTransactions();

    // Filtrar
    $('#filterType').change(function() {
        renderTransactions($(this).val());
    });

});
