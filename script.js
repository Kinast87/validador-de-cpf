var botao = document.querySelector('#validar')
//captura o evendo click do botão
botao.addEventListener('click', validar)

function validar() {
    let numeros = []
    let numerosDois = []
    let x = 10, soma = 0, somaDois = 0
    
    // pega o valor sem espaços extras
    var txtcpf = document.querySelector('#txtcpf').value.trim()
    if (/^(\d)\1{10}$/.test(txtcpf)) { // bloqueia numeros iguais '000000000' repetidos
        resposta.textContent = `❌ O CPF ${txtcpf} é inválido.`
        resposta.className = "invalido" //recebe o estilo configurado p/ a classe eno css
    return
     }
    //retira os dois últimos digitos do CPF
    let cpfMenor = txtcpf.slice(0, -2)

    // cálculo do primeiro dígito
    /* o for passa por cada caractere e o múltiplica a partir de 10 até 2 no último digito 1ºdig x10 2ºdig x 9... e adiciona todos os resultados em um array */
    for (let num of cpfMenor) {
        numeros.push(Number(num) * x)
        x--
    }
    //soma te todos os valores do array
    for (let num of numeros) soma += num
    //se o resto da divisão da soma por 11 for igual a 1 ou 0, o primeiro dígito será 0, senão será 11 menos o resto da divisão
    let digUm = (soma % 11 < 2) ? 0 : 11 - (soma % 11)

    // cálculo do segundo dígito
    let cpfComPrimeiroDig = cpfMenor + digUm
    let cpfSemPrimeiro = cpfComPrimeiroDig.slice(1)
    let y = 10
    //a lógica se repete porém agora inicia no segundo número do CPF e o dígito encontrado anteriormente é adicionado ao cpf
    for (let numero of cpfSemPrimeiro) {
        numerosDois.push(Number(numero) * y)
        y--
    }
    for (let num of numerosDois) somaDois += num

    let digDois = (somaDois % 11 < 2) ? 0 : 11 - (somaDois % 11)

    let novoCPF = cpfMenor + digUm + digDois
    //se o novo cpf for igual ao informado pelo usuário, o cpf informado é válido, senão será inválido
    if (novoCPF === txtcpf) {
        resposta.innerHTML = `✅ O CPF ${txtcpf} é válido.`
    } else {
        resposta.innerHTML = `❌ O CPF ${txtcpf} é inválido.`
    }
}