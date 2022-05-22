const vagas = document.querySelector('.vagas')

vagas.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    vagas.scrollLeft += evt.deltaY;
});


document.querySelectorAll('.compatibilidade__match').forEach(element => {
    
    let match = element.querySelector('.match__level')
    let brilho = element.querySelector('.match__brilho')

    let matchLevel = match.attributes.getNamedItem('data-match').value

    if(matchLevel < 15 ){
        match.style.width = '15%'
        match.style.backgroundColor = 'var(--fundo3)'

        brilho.style.width = 'calc(15% - 30px)'
        brilho.style.backgroundColor = 'var(--progresso3)'
    
    }else if(matchLevel <= 40 ){
        match.style.width = `${matchLevel}%`
        match.style.backgroundColor = 'var(--fundo3)'

        brilho.style.width = `calc(${matchLevel}% - 30px)`
        brilho.style.backgroundColor = 'var(--progresso3)'
    
    }else if(matchLevel <= 70 ){
        match.style.width = `${matchLevel}%`
        match.style.backgroundColor = 'var(--fundo2)'

        brilho.style.width = `calc(${matchLevel}% - 30px)`
        brilho.style.backgroundColor = 'var(--progresso2)'
    
    }else if(matchLevel <= 100 ){
        match.style.width = `${matchLevel}%`
        match.style.backgroundColor = 'var(--fundo1)'

        brilho.style.width = `calc(${matchLevel}% - 30px)`
        brilho.style.backgroundColor = 'var(--progresso1)'
    }
})