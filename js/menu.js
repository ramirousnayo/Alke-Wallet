$(document).ready(function() {

  $('#depositBtn').click(function() {
    $('#info').text('Redirigiendo a depósito...');
    // setTimeout(() => window.location.href = "deposit.html", 1000); // Opcional: redirigir después de 1s
  });

  $('#sendBtn').click(function() {
    $('#info').text('Redirigiendo a enviar dinero...');
    // setTimeout(() => window.location.href = "sendmoney.html", 1000);
  });

  $('#transactionsBtn').click(function() {
    $('#info').text('Redirigiendo a últimos movimientos...');
    // setTimeout(() => window.location.href = "transactions.html", 1000);
  });

});
