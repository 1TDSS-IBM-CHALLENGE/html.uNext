var $index = 0;
var $totalSlides = 0;
var $slides = [];
var $indexSlider = []
var $posicaoClickStart = 0;
var $posicaoClickEnd= 0;

$(document).ready(

    initSlider,

    $("div.icon").on('click', (e) => {
        
        var botao = $(e.target)

        if(botao.hasClass('direita') || botao.hasClass('fi-line-angle-right')){
            toDireita()
        }else{
            toEsquerda()
        }
    }),

    $('.index-slider .fi').on('click', (e) => {
        $index = $(e.target).data('index');
        alteraSlide()
    }),

    $(".slide span").on('touchstart', (event) => {
        $posicaoClickStart = event.touches[0].clientX
    }),

    $(".slide span").on('touchmove', (event) => {
        event.preventDefault()
        $posicaoClickEnd = event.touches[0].clientX
    }),

    $(".slide span").on('touchend', () => {

        var totalDeslize = $posicaoClickStart - $posicaoClickEnd;
        
        if( totalDeslize > 80 || totalDeslize < -80){
            if($posicaoClickStart < $posicaoClickEnd){
                toEsquerda()
            }else{
                toDireita()
            }
        }
    })
    
);

function initSlider(){
    var slides = $('.slide');
    var indexSlider = $('.index-slider .fi')
    
    $slides = slides
    $indexSlider = indexSlider
    $totalSlides = slides.length

    alteraSlide()
    trocaAutomatico()
}

function toDireita(){

    if($index+1 === $totalSlides) 
        $index = 0
    else 
        $index++;
    
    alteraSlide()
}

function toEsquerda(){
    if($index === 0) 
        $index = $totalSlides-1
    else 
        $index--;

    alteraSlide()
}

function alteraSlide(){
 
    $slides.each((index) => {
        $($slides[index]).removeClass('selecionado')
        $($indexSlider[index]).removeClass('fi-circle')
        $($indexSlider[index]).addClass('fi-circle-line')
    });

    $($slides[$index]).addClass('selecionado')
    $($indexSlider[$index]).removeClass('fi-circle-line')
    $($indexSlider[$index]).addClass('fi-circle')
}

function trocaAutomatico(){
    setInterval(() => {
        toDireita()
    }, 8000)
}