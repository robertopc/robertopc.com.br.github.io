/**
 * $.disablescroll
 * Author: Josh Harrison - aloof.co
 *
 * Disables scroll events from mousewheels, touchmoves and keypresses.
 * Use while jQuery is animating the scroll position for a guaranteed super-smooth ride!
 */(function(e){"use strict";function r(t,n){this.opts=e.extend({handleWheel:!0,handleScrollbar:!0,handleKeys:!0,scrollEventKeys:[32,33,34,35,36,37,38,39,40]},n);this.$container=t;this.$document=e(document);this.lockToScrollPos=[0,0];this.disable()}var t,n;n=r.prototype;n.disable=function(){var e=this;e.opts.handleWheel&&e.$container.on("mousewheel.disablescroll DOMMouseScroll.disablescroll touchmove.disablescroll",e._handleWheel);if(e.opts.handleScrollbar){e.lockToScrollPos=[e.$container.scrollLeft(),e.$container.scrollTop()];e.$container.on("scroll.disablescroll",function(){e._handleScrollbar.call(e)})}e.opts.handleKeys&&e.$document.on("keydown.disablescroll",function(t){e._handleKeydown.call(e,t)})};n.undo=function(){var e=this;e.$container.off(".disablescroll");e.opts.handleKeys&&e.$document.off(".disablescroll")};n._handleWheel=function(e){e.preventDefault()};n._handleScrollbar=function(){this.$container.scrollLeft(this.lockToScrollPos[0]);this.$container.scrollTop(this.lockToScrollPos[1])};n._handleKeydown=function(e){for(var t=0;t<this.opts.scrollEventKeys.length;t++)if(e.keyCode===this.opts.scrollEventKeys[t]){e.preventDefault();return}};e.fn.disablescroll=function(e){!t&&(typeof e=="object"||!e)&&(t=new r(this,e));t&&typeof e=="undefined"?t.disable():t&&t[e]&&t[e].call(t)};window.UserScrollDisabler=r})(jQuery);

 // FUNÇÃO SCROLL STOP
 // http://gabrieleromanato.name/jquery-check-if-users-stop-scrolling/
 $.fn.stopScroll = function( options ) {
   options = $.extend({
     delay: 200,
     callback: function() {}
   }, options);

   return this.each(function() {
     var $element = $( this ),
       element = this;
     $element.scroll(function() {
       clearTimeout( $.data( element, "scrollCheck" ) );
       $.data( element, "scrollCheck", setTimeout(function() {
         options.callback();
       }, options.delay ) );
     });
   });
 };

$(document).ready(function() {

  var d              = document,
      w              = window,
      documentWidth  = $( d ).width(),
      documentHeight = $( d ).height(),
      sectionsTop    = [],
      sectionHeight  = 0,
      sectionsHeight = 0,
      canvas         = $('#estrelas'),
      context        = canvas[0].getContext('2d'),
      containerWidth = $('#container').width(),
      marginWidth    = ( documentWidth - containerWidth ) / 2;

  $('#loading').fadeOut(1000);

  // ajusta o tamanho de todas as seções
  $('section:visible').each( function(){

    var height = $(w).height() - parseInt( $(this).css('padding-top') );

    $(this).height( height );

    sectionsTop.push( $(this).offset().top );
    sectionHeight   = $(this).innerHeight();
    sectionsHeight += sectionHeight;
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

      // remove niceScroll
      nice.remove();

      $('html,body').animate({
        scrollTop: $(this).offset().top
      },
      {
        duration: 1000,
        complete: function() {

          // reabilita scroll
          $(w).disablescroll('undo');

          // reativa niceScroll
          nice= $("body").niceScroll({
  			    cursorcolor : 'transparent',
  			    cursorborder: '1px solid rgba(255,255,255,0.33)'
  				});
        }
      });

      // desabilita scroll
      $(w).disablescroll({
          handleScrollbar: false
      });
    }
  }
  //COLOCANDO EM TODOS LINKS QUE O HREF INICIA COM #
  $('.ancora').delegate('a[href^=#]','click',function() {
      $( $(this).attr('href') ).ancora();
      return false;
  });

  // quando o scroll está ativo
  $(w).scroll(function(e) {

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

  // quando para o scroll
  $(w).stopScroll({
    callback: function() {

      // pega a posição do meio da tela
      var meio = $(w).scrollTop()+($(w).height()/2);

      // verifica as posições das seções
      for( i in sectionsTop ){

        var min = sectionsTop[i];
        var max = sectionsTop[i] + sectionHeight;

        // verifica se o scroll parou no centro
        if( min < meio && meio < max ) {

          // centraliza na seção que parou no centro da tela
          $('section:visible').eq(i).ancora();

          break;
        }
      }
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
});
