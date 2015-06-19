function abrePortfolio( nome ) {
  var paginas = ["culturaltiger","cursoats","gruposeaplan","brunicbrindes","trifana","tetrisfox"];
  for( p in paginas) {
    document.getElementById('info'+ paginas[p]).style.display = "none";
  }
  document.getElementById('info' + nome ).style.display = "block";
}

$(document).ready(function() {

  /* NICE SCROLL */
  nice= $("html").niceScroll({
    cursorcolor : 'transparent',
    cursorborder : '1px solid rgba(255,255,255,0.33)'
	});

  /* SCROLL REVEAL */
  window.sr= new scrollReveal({
    reset: true,
    move: '50px',
    mobile: true
  });

  // ajusta o tamanho de todas as seções
  $('section').each( function(){

    $(this).height( $(window).height() - parseInt( $(this).css('padding-top') ) );
  });


  /* ESTRELAS */

    var documentWidth  = $( document ).width(),
        documentHeight = $( document ).height(),
        sectionsHeight = $('section:visible').length * $( window ).height(),
        canvas = $('#estrelas'),
        context = canvas[0].getContext('2d'),
        containerWidth = $('#container').width(),
        marginWidth = ( documentWidth - containerWidth ) / 2;

    canvas.attr( 'width', documentWidth );
    canvas.attr( 'height', sectionsHeight );

    for( var i = 0; i < 500; i++ ) {
      x = Math.round( Math.random() * canvas.width() );
      y = Math.round( Math.random() * canvas.height() );

      // estrelas desenhadas apenas nas margens
      if(x < marginWidth || x > ( containerWidth + marginWidth ) ) {

        context.fillStyle = "#ffffff";
        context.fillRect( x, y, 1, 1 );
      }
  }

  /* FUNCAO ANCORA */
  $.fn.ancora = function() {
      $('html,body').animate({scrollTop: $(this).offset().top}, {duration: 1000});
  }
  //COLOCANDO EM TODOS LINKS QUE O HREF INICIA COM #
  $('a[href^=#]').click(function() {
      $( $(this).attr('href') ).ancora();
      return false;
  });
});
