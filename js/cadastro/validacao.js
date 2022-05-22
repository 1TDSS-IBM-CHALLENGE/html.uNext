//TROCAR ENTRE PESSOA E EMPRESA
const formPessoa = document.querySelector('.pessoa')
const formEmpresa = document.querySelector('.empresa')

document.querySelectorAll("input[name='tipoCadastro']").forEach(elemento => {
    elemento.addEventListener('click', () => {
        if (elemento.value === "candidato" || elemento.value === "recrutador") {
            desativaFormEmpresa()
        } else {
            desativaFormPessoa()
        }
    })
})

function desativaFormEmpresa() {
    formPessoa.classList.add('type--ativo')
    formEmpresa.classList.remove('type--ativo')

    formEmpresa.querySelectorAll('input').forEach(input => {
        input.disabled = true;
    })

    formPessoa.querySelectorAll('input').forEach(input => {
        input.disabled = false;
    })

    mascarasPessoa()
}

function desativaFormPessoa() {
    formEmpresa.classList.add('type--ativo')
    formPessoa.classList.remove('type--ativo')

    formEmpresa.querySelectorAll('input').forEach(input => {
        input.disabled = false;
    })

    formPessoa.querySelectorAll('input').forEach(input => {
        input.disabled = true;
    })

    mascarasEmpresa()
}

//MASCARAS DOS CAMPOS
function mascarasEmpresa() {
    const cep = document.getElementById('cep')
    const cnpj = document.getElementById('cnpj')

    IMask(cep, { mask: '00000-000' })
    IMask(cnpj, { mask: '00.000.000/0000-00' })
}

function mascarasPessoa() {
    const cpf = document.getElementById('cpf')

    IMask(cpf, { mask: '000.000.000-00' })
}

//BUSCAR ENDEREÇO
document.getElementById('cep').addEventListener('change', element => {
    let cep = element.target.value
    if(cep.length == 9)
        pesquisacep(cep)

})

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=validaRetornoCep';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpaEndereco();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpaEndereco();
    }
}

function validaRetornoCep(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpaEndereco();
    }
}

function limpaEndereco() {
    document.getElementById('rua').value = null;
    document.getElementById('bairro').value = null;
    document.getElementById('cidade').value = null;
    document.getElementById('uf').value = null;
    document.getElementById('numero').value = null;
    document.getElementById('referencia').value = null;
}

//INIT 
desativaFormEmpresa()