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
    cursorborder: '1px solid rgba(255,255,255,0.33)'
	});

  $("textarea").niceScroll({
    cursorcolor : 'transparent',
    cursorborder: '1px solid rgba(255,255,255,0.33)',
    autohidemode: false
	});

  /* SCROLL REVEAL */
  window.sr= new scrollReveal({
    reset: true,
    move: '10px',
    mobile: false
  });

  // ajusta o tamanho de todas as seções
  $('section').each( function(){

    sectionHeight = $(window).height() - parseInt( $(this).css('padding-top') );

    $(this).height( sectionHeight );
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
  $('.ancora').delegate('a[href^=#]','click',function() {
      $( $(this).attr('href') ).ancora();
      return false;
  });

  // FUNCAO SCROLL
  $(window).scroll(function() {

      if( $(this).scrollTop() > 500 ) {

        // menu flutuante scroll
        $('#menu-float')
        .html( $('#menu').html() )
        .fadeIn('slow');

        $('#topo').fadeIn('slow');

      } else {

        $('#menu-float').fadeOut('slow').html( '' );

        $('#topo').fadeOut('slow');
      }
  });

  // FORMULARIO DE CONTATO
  $('#contato-form').submit(function( event ){
    // previne o envio do form
    event.preventDefault();

    // desabilita submit e adiciona msg de "enviando..."
    $(this).find('[type="submit"]').attr('disabled','true').html('Enviando...');

    $.ajax({
      url: 'http://robertopc.net/contato.php',
      type: 'post',
      data: $('#contato-form').serializeArray(),
      success: function( msg) {

        // reseta formulário
        $('#contato-form')[0].reset();

        // habilita submit e adiciona msg de "enviar"
        $('#contato-form [type="submit"]').removeAttr('disabled').html('Enviar');

        msg = $.parseJSON( msg );

        // se mensagem enviada
        if( msg[0].status == 'sent' ) {

          $('#msg-form').html('Mensagem enviada!');

        } else {

          $('#msg-form').html('Mensagem NÃO enviada!');
        }

      },
      error: function( jqXHR, textStatus ) {
        console.log( "Request failed: "+ textStatus );
      }
    });
  });
});
