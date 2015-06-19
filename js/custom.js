function abrePortfolio( nome ) {
  var paginas = ["culturaltiger","cursoats","gruposeaplan","brunicbrindes","trifana","tetrisfox"];
  for( p in paginas) {
    document.getElementById('info'+ paginas[p]).style.display = "none";
  }
  document.getElementById('info' + nome ).style.display = "block";
}

$(document).ready(function() {

  /* NICE SCROLL */
	var nice = $("html").niceScroll({
		/*cursorwidth: "10px"*/
	});

  /* SCROLL REVEAL */
  window.sr= new scrollReveal({
    reset: true,
    move: '50px',
    mobile: true
  });

  /* ESTRELAS */
  var canvas = $('#estrelas');
    canvas.attr( 'width', $( document ).width() );
    canvas.attr( 'height', $( document ).height() );

  var context = canvas[0].getContext('2d');

  for( var i = 0; i < 1000; i++ ) {
    x = Math.round( Math.random() * canvas.width() );
    y = Math.round( Math.random() * canvas.height() );
    context.fillStyle = "#ffffff";
    context.fillRect( x, y, 1, 1 );
  }
});
