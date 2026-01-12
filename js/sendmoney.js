
$(document).ready(function() {

    // --- Inicializar datos --- //
    if (!localStorage.getItem('saldo')) localStorage.setItem('saldo', '0');
    if (!localStorage.getItem('transactions')) localStorage.setItem('transactions', JSON.stringify([]));
    if (!localStorage.getItem('contacts')) {
        localStorage.setItem('contacts', JSON.stringify([
            {name: "John Doe", cbu:"123456789", alias:"john", bank:"ABC Bank"},
            {name: "Jane Smith", cbu:"987654321", alias:"jane", bank:"XYZ Bank"}
        ]));
    }

    let saldo = parseFloat(localStorage.getItem('saldo'));
    $('#saldoDisplay').text(`Saldo actual: $${saldo.toFixed(2)}`);

    let contacts = JSON.parse(localStorage.getItem('contacts'));

    const contactList = $('#contactList');

    // --- Función para mostrar contactos ---
    function renderContacts(filter='') {
        contactList.empty();
        let filtered = contacts.filter(c => 
            c.name.toLowerCase().includes(filter.toLowerCase()) ||
            c.alias.toLowerCase().includes(filter.toLowerCase())
        );
        if(filtered.length === 0){
            contactList.append('<li class="list-group-item text-center text-muted">No hay contactos</li>');
            return;
        }
        filtered.forEach((c, i) => {
            contactList.append(`
                <li class="list-group-item">
                    <input type="radio" name="contact" value="${i}"> ${c.name} (${c.alias}) – CBU: ${c.cbu} – Banco: ${c.bank}
                </li>
            `);
        });
    }

    renderContacts();

    // --- Filtrar contactos ---
    $('#searchContact').on('input', function() {
        renderContacts($(this).val());
        $('#sendBtn').hide();
    });

    // --- Seleccionar contacto ---
    contactList.on('change', 'input[name="contact"]', function() {
        $('#sendBtn').show();
    });

    // --- Enviar dinero ---
    $('#sendBtn').click(function() {
        let selectedIndex = $('input[name="contact"]:checked').val();
        if(selectedIndex === undefined) return;

        let monto = prompt("Ingrese el monto a enviar:");
        monto = parseFloat(monto);
        if(!monto || monto <= 0) return alert("Monto inválido.");
        if(monto > saldo) return alert("Saldo insuficiente.");

        saldo -= monto;
        localStorage.setItem('saldo', saldo.toString());
        $('#saldoDisplay').text(`Saldo actual: $${saldo.toFixed(2)}`);

        let transactions = JSON.parse(localStorage.getItem('transactions'));
        transactions.push({ tipo: 'transferencia', monto: monto, contacto: contacts[selectedIndex].name });
        localStorage.setItem('transactions', JSON.stringify(transactions));

        $('#alert-container').html(`<div class="alert alert-success text-center">Se enviaron $${monto.toFixed(2)} a ${contacts[selectedIndex].name} (${contacts[selectedIndex].alias})</div>`);
        $('#sendBtn').hide();
    });

    // --- Mostrar/ocultar formulario de nuevo contacto ---
    $('#addContactBtn').click(function() {
        $('#contactForm').slideDown();
    });

    $('#cancelContactBtn').click(function() {
        $('#contactForm').slideUp();
        $('#newName, #newCbu, #newAlias, #newBank').val('');
    });

    // --- Guardar nuevo contacto ---
    $('#saveContactBtn').click(function() {
        let name = $('#newName').val().trim();
        let cbu = $('#newCbu').val().trim();
        let alias = $('#newAlias').val().trim();
        let bank = $('#newBank').val().trim();

        if(!name || !cbu || !alias || !bank){
            alert("Completa todos los campos");
            return;
        }

        contacts.push({name, cbu, alias, bank});
        localStorage.setItem('contacts', JSON.stringify(contacts));

        renderContacts();
        $('#newName, #newCbu, #newAlias, #newBank').val('');
        $('#contactForm').slideUp();

        $('#alert-container').html(`<div class="alert alert-success text-center">Contacto ${name} (${alias}) agregado</div>`);
    });

});
