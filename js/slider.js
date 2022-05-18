var $index = 0;
var $slides = document.querySelectorAll('.slide');
var $indexSlider = document.querySelectorAll('.index-slider .fi');
var $totalSlides = $indexSlider.length;
var $posicaoClickStart = 0;
var $posicaoClickEnd= 0;

// $(document).ready(

//     initSlider,

//     $("div.icon").on('click', (e) => {
        
//         var botao = $(e.target)

//         if(botao.hasClass('direita') || botao.hasClass('fi-line-angle-right')){
//             toDireita()
//         }else{
//             toEsquerda()
//         }
//     }),

//     $('.index-slider .fi').on('click', (e) => {
//         $index = $(e.target).data('index');
//         alteraSlide()
//     }),

//     $(".slide span").on('touchstart', (event) => {
//         $posicaoClickStart = event.touches[0].clientX
//     }),

//     $(".slide span").on('touchmove', (event) => {
//         event.preventDefault()
//         $posicaoClickEnd = event.touches[0].clientX
//     }),

//     $(".slide span").on('touchend', () => {

//         var totalDeslize = $posicaoClickStart - $posicaoClickEnd;
        
//         if( totalDeslize > 80 || totalDeslize < -80){
//             if($posicaoClickStart < $posicaoClickEnd){
//                 toEsquerda()
//             }else{
//                 toDireita()
//             }
//         }
//     })
    
// );

document.querySelector('.direita').addEventListener('click', () => {
    toDireita()
})

document.querySelector('.esquerda').addEventListener('click', () => {
    toEsquerda()
})

document.querySelectorAll('.index-slider .fi').forEach( (element) => {
    element.addEventListener('click', () => {
        $index = parseInt(element.attributes.getNamedItem('data-index').value)
        alteraSlide()
    })
})

document.querySelectorAll('.slide div').forEach((element) => {
    
    element.addEventListener('touchstart', (event) => {
        $posicaoClickStart = event.touches[0].clientX
    })

    element.addEventListener('touchmove', (event) => {
        event.preventDefault()
        $posicaoClickEnd = event.touches[0].clientX
     })

     element.addEventListener('touchend', (event) => {
        var totalDeslize = $posicaoClickStart - $posicaoClickEnd;
        
        if( totalDeslize > 80 || totalDeslize < -80){
            if($posicaoClickStart < $posicaoClickEnd){
                toEsquerda()
            }else{
                toDireita()
            }
        }
     })
})

function initSlider(){
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
 
    $slides.forEach((element, index) => {
        $slides[index].classList.remove('selecionado')
        $indexSlider[index].classList.remove('fi-circle')
        $indexSlider[index].classList.add('fi-circle-line')
    });

    $slides[$index].classList.add('selecionado')
    $indexSlider[$index].classList.remove('fi-circle-line')
    $indexSlider[$index].classList.add('fi-circle')
}

function trocaAutomatico(){
    setInterval(() => {
        toDireita()
    }, 8000)
}

initSlider()