$(document).ready(function(){

    var d       = document,
        w       = window,
        canvas  = $('#estrelas'),
        context = canvas[0].getContext('2d');

    /* ESTRELAS */
        canvas.attr( 'width', $( d ).width() );
        canvas.attr( 'height', $( d ).height() );

        for( var i = 0; i < 600; i++ ) {

            x = Math.round( Math.random() * $( d ).width() );
            y = Math.round( Math.random() * $( d ).height() );

            // estrelas desenhadas apenas nas margens
            if(x < $( d ).width() * 0.2 || x > ( $( d ).width() * 0.8 ) ) {

                context.fillStyle = "#ffffff";
                context.fillRect( x, y, 1, 1 );
            }
        }

/* FORMULÁRIO DE CONTATO */
    $('#contato-form').submit(function(event){
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
            },
            error: function( jqXHR, textStatus ) {
                console.log( "Request failed: "+ textStatus );
            },
            complete: function( jqXHR, textStatus ) {

            console.log( "Request complete: "+ textStatus );

                // reseta formulário
                $('#contato-form')[0].reset();

                // habilita submit e adiciona msg de enviar
                $('#contato-form [type="submit"]').removeAttr('disabled').html('Enviar');
                $('#msg-form').html('Mensagem enviada!');
            }
        });
    });

/* MENU MOBILE */
    $('#menu-mobile').delegate('#menu-mobile-button, a', 'click', function() {

        if( ! $('#menu-mobile').find('ul').length ) {

            $('#menu-mobile').animate({
                "top": "0",
                "right": "0",
                "width": "100%",
                "height": "100%"
            });

            $('#menu-mobile').append( $('#menu').html() );
        } else {

            $('#menu-mobile').find('ul').remove();

            $('#menu-mobile').animate({
                "top": "10px",
                "right": "10px",
                "width": "32px",
                "height": "32px"
            });
        }
    });

/* fullPage */
    $('#container').fullpage({
        anchors: ['home', 'about', 'services', 'portfolio', 'contact'],
        navigation: true,
        slidesNavigation: true,
        showActiveTooltip: true,
        verticalCentered: true,
        responsiveWidth: 768,
        responsiveHeight: 510,
        navigationTooltips: ['home', 'quem sou','o que faço','portfólio','contato'],
        fixedElements: '#menu-mobile',
        onLeave: function(index, nextIndex, direction){

            // Home
            if( nextIndex == 1 ) {

                $('#menu-float')
                .fadeOut('slow');
            } else {

                // menu flutuante scroll
                $('#menu-float')
                .html( $('#menu').html() )
                .fadeIn('slow');
            }

            // Carrega imagens assincronamente
            for( var i = 0, len = $('section').eq(nextIndex-1).find('img[data-img]').length; i < len; i++ ) {

                var img = $('section').eq(nextIndex-1).find('img[data-img]').eq(i);

                // se imagens não carregadas
                if( img.data('img') != '' ) {

                    function imgChange(img,i){

                        setTimeout(function(){

                            img
                            .hide()
                            .css({
                                "-webkit-animation":"none",
                                "animation":"none"
                            })
                            .attr('src', img.data('img') )
                            .fadeIn('slow');

                            img.data('img','');

                        },i*200);
                    }

                    img.fadeOut('slow', imgChange(img,i) );
                }
            }
        },
        afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){

            // se imagens não carregadas
            if( $( '#' + slideAnchor + ' .info-left img' ).attr('src') == '' ) {

                // para a animação
                $( '#' + slideAnchor + ' .info-left' ).css( {
                    "-webkit-animation": "none",
                    "animation": "none",
                    "background": "none"
                });
                // insere imagem
                $( '#' + slideAnchor + ' .info-left img' ).hide().attr('src','prints/'+ slideAnchor + '.jpg').fadeIn('slow');
            }
        }
    });

/* quando clicar em item do portfolio */
    $('.portfolio').click(function(){

        $.fn.fullpage.moveTo('portfolio', $(this).data('anchor') );
    });

/* esconde loading div */
    $('#loading').delay(1000).fadeOut(1000);

/* ON RESIZE */
    $(window).resize(function(e) {

        /* ESTRELAS */

        // limpa canvas
        context.clearRect(0, 0, canvas.width(), canvas.height());

        for( var i = 0; i < 600; i++ ) {

            x = Math.round( Math.random() * canvas.width() );
            y = Math.round( Math.random() * canvas.height() );

            // estrelas desenhadas apenas nas margens
            if(x < $( w ).width() * 0.2 || x > ( $( w ).width() * 0.8 ) ) {

                context.fillStyle = "#ffffff";
                context.fillRect( x, y, 1, 1 );
            }
        }
    });

/* ON SCROLL */
    $(window).scroll(function(e) {

        // bloqueia scroll horizontal
        if( $(this).scrollLeft() > 0 ) {

            $(this).scrollLeft(0);
        }
    });
});
