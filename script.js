
async function fetchCEP (cep) {
    const cidade = document.getElementById("cidade");
    const logradouro = document.getElementById("endereco");
    const estado = document.getElementById("estado");
    const bairro = document.getElementById("bairro");
    var mensagemErro = document.getElementById("erro");

    mensagemErro.innerHTML = "";
    try {
        const reqCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const resCEP = await reqCEP.json();
        
        console.log(resCEP);
        if(resCEP.erro){
            throw new Error("CEP inexistente")
        }
        
        bairro.value = resCEP.bairro;
        cidade.value = resCEP.localidade;
        logradouro.value = resCEP.logradouro;
        estado.value = resCEP.estado;

        return resCEP;
    } catch(error){
        mensagemErro.innerHTML = "CEP inválido";

        bairro.value = "";
        cidade.value = "";
        logradouro.value = "";
        estado.value = "";

        console.log(error);
        new Error("Erro")
    }

}

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => fetchCEP(cep.value))
// const ceps = ['85851010','85875000', '99910000'];

// let conjuntosCeps = ceps.map(valor => fetchCEP(valor));

// Promise.all(conjuntosCeps).then(respostas => console.log(respostas));