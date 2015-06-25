$(document).ready(function() {

  $('#loading').fadeOut(1000);

  // ajusta o tamanho de todas as seções
  $('section').each( function(){

    sectionHeight = $(window).height() - parseInt( $(this).css('padding-top') );

    $(this).height( sectionHeight );
  });

  // ao clicar no portfolio
  $('.abre-portfolio').click(function(){

    // esconde divs
    $('.info:visible').hide();

    // insere a imagem
    $( '#info-'+ $(this).data('portfolio') + ' .img-big' ).attr('src','prints/'+ $(this).data('portfolio') + '.jpg');

    // mostra a imagem
    $( '#info-'+ $(this).data('portfolio') ).fadeIn('slow');
  });

  /* ESTRELAS */

    var d = document,
        w = window,
        documentWidth  = $( d ).width(),
        documentHeight = $( d ).height(),
        sectionsHeight = $('section:visible').length * $( w ).height(),
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
    // se o scrolltop for diferente
    if( w.scrollY != $(this).offset().top ){

      $('html,body').animate({scrollTop: $(this).offset().top}, {duration: 1000});
    }
  }
  //COLOCANDO EM TODOS LINKS QUE O HREF INICIA COM #
  $('.ancora').delegate('a[href^=#]','click',function() {
      $( $(this).attr('href') ).ancora();
      return false;
  });

  // FUNCAO SCROLL
  $(w).scroll(function() {

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
  })
  .scroll();

  // FORMULARIO DE CONTATO
  $('#contato-form').submit(function( event ){
    // previne o envio do form
    event.preventDefault();

    // desabilita submit e adiciona msg de "enviando..."
    $(this).find('[type="submit"]').attr('disabled','true').html('Enviando...');

    $.ajax({
      url: 'http://robertopc.net/contato.php',
      type: 'post',
      crossDomain: true,
      data: $('#contato-form').serializeArray(),
      success: function( msg ) {
        console.log( "Request success: "+ msg );
        /*
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
        */
      },
      error: function( jqXHR, textStatus ) {
        console.log( "Request failed: "+ textStatus );
      },
      complete: function( jqXHR, textStatus ) {

        console.log( "Request complete: "+ textStatus );

        // reseta formulário
        $('#contato-form')[0].reset();

        // habilita submit e adiciona msg de "enviar"
        $('#contato-form [type="submit"]').removeAttr('disabled').html('Enviar');

        $('#msg-form').html('Mensagem enviada!');
      }
    });
  });

  // centraliza tela no contato se formulário focado
  /*$('#home a').focus(function( event ){
    console.log(event);
    // $('#home').ancora();

    $.scrollTo('#home', 1000);
  });*/

  // quando seção focada centraliza tela nela
  $('section *').focus(function(){

    console.log($.fn);
    console.log($(this).parentsUntil('section'));
    console.log($(this).parents());
    console.log($(this).parent());

    // $( this.parent('section').attr('id') ).ancora();
  });
});
