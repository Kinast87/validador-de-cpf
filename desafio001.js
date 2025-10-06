var botao = document.querySelector('#validar')
botao.addEventListener('click', validar)

function validar() {
    let numeros = []
    let numerosDois = []
    let x = 10, soma = 0, somaDois = 0
    
    // pega o valor sem espaços extras
    var txtcpf = document.querySelector('#txtcpf').value.trim()
    if (/^(\d)\1{10}$/.test(txtcpf)) { // bloqueia CPFs repetidos
        resposta.textContent = `❌ O CPF ${txtcpf} é inválido.`
        resposta.className = "invalido"
    return
     }
    // como o HTML já garante 11 dígitos numéricos, não precisamos checar de novo
    let cpfMenor = txtcpf.slice(0, -2)

    // cálculo do primeiro dígito
    for (let num of cpfMenor) {
        numeros.push(Number(num) * x)
        x--
    }
    for (let num of numeros) soma += num

    let digUm = (soma % 11 < 2) ? 0 : 11 - (soma % 11)

    // cálculo do segundo dígito
    let cpfComPrimeiroDig = cpfMenor + digUm
    let cpfSemPrimeiro = cpfComPrimeiroDig.slice(1)
    let y = 10

    for (let numero of cpfSemPrimeiro) {
        numerosDois.push(Number(numero) * y)
        y--
    }
    for (let num of numerosDois) somaDois += num

    let digDois = (somaDois % 11 < 2) ? 0 : 11 - (somaDois % 11)

    let novoCPF = cpfMenor + digUm + digDois

    if (novoCPF === txtcpf) {
        resposta.innerHTML = `✅ O CPF ${txtcpf} é válido.`
    } else {
        resposta.innerHTML = `❌ O CPF ${txtcpf} é inválido.`
    }
}