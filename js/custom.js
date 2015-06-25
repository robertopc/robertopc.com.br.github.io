$(document).ready(function() {

  var d              = document,
      w              = window,
      documentWidth  = $( d ).width(),
      documentHeight = $( d ).height(),
      sectionsTop    = [],
      sectionsHeight = 0,
      canvas         = $('#estrelas'),
      context        = canvas[0].getContext('2d'),
      containerWidth = $('#container').width(),
      marginWidth    = ( documentWidth - containerWidth ) / 2;

  $('#loading').fadeOut(1000);

  // ajusta o tamanho de todas as seções
  $('section:visible').each( function(){

    sectionHeight = $(w).height() - parseInt( $(this).css('padding-top') );

    $(this).height( sectionHeight );

    sectionsTop.push( $(this).offset().top );
    sectionsHeight += $(this).innerHeight();
  });

  // ao clicar no portfolio
  $('.abre-portfolio').click(function(){

    var portfolio = $(this).data('portfolio'),
        id = '#info-'+ portfolio;

    // carrega imagem zoom & informações
    $( '#info-img' )
    .attr('src','prints/'+ portfolio + '.jpg')
    .one("load", function() {

      $('#info-right').html( $( id ).html() );
      $('#info').fadeIn('slow');
    });

    // botão fechar
    $( '#info-close' ).click(function(){

      $('#info').fadeOut('slow');
    });
  });

  /* ESTRELAS */

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

      // se não estiver com uma animação de scroll ativa
      if( ! $('body').hasClass('scrolling') ) {

        $('body').addClass('scrolling');

        $('html,body').animate({
          scrollTop: $(this).offset().top
        },
        {
          duration: 1000,
          complete : function(){
            $('body').removeClass('scrolling')
          }
        });
      }
    }
  }
  //COLOCANDO EM TODOS LINKS QUE O HREF INICIA COM #
  $('.ancora').delegate('a[href^=#]','click',function() {
      $( $(this).attr('href') ).ancora();
      return false;
  });

  // FUNCAO SCROLL
  $(w).scroll(function() {

    // console.log( 'window scrollTop: '+ $(w).scrollTop() );
    // console.log( 'sections height: '+ sectionsTop );

    // bloqueia scroll horizontal
    if( $(w).scrollLeft() > 0 ){
      $(w).scrollLeft(0);
    }

    // se scroll vertical passar da altura da section
    if( $(w).scrollTop() > $('#home').innerHeight() ) {

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
  //$('section *').focus(function(){

    // console.log($.fn);
    // console.log($(this).parentsUntil('section'));
    // console.log($(this).parents());
    // console.log($(this).parent());

    // $( this.parent('section').attr('id') ).ancora();
  //});
});
