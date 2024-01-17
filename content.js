/**--------------------------------------------------------------------------------------------------------------
    * Nome: content.js
    * Autor: LM
    * Objetivo: Aplicar um novo projeto no trello automaticamente (sequencialmente) para o projeto do Fraseteca
    * Doc: --
    * -------------------------------------------------------
    * UPDATES:
    * -------------------------------------------------------
    *  ● Projeto2023Apr02 - Criação das Extensões para o Chrome de Controle de projetos
    *     >> 17-04-23 - Criação e instalação
    *--------------------------------------------------------------------------------------------------------------*/

const InputObjetos = {
    preLoad() {
        let body = document.querySelector("body")
        let span = document.createElement("span")
        span.style = "display:block;position:fixed;padding: 18px 8px;width: 204px;bottom: 120px;left: 0;z-index: 99999;background: #0d0e0e;color:#fff"
        span.innerHTML = "Último projeto no trello:"
        body.appendChild(span)

        let newBtn = document.createElement("button")
        newBtn.style = "display:block;position:fixed;bottom:80px;left: 148px;z-index:99999;background:#cd0000;color:#fff"
        newBtn.name = "btnRun"
        newBtn.id = "btnRun"
        newBtn.innerHTML = "N"
        body.appendChild(newBtn)

        let copyBtn = document.createElement("button")
        copyBtn.style = "display:block;position:fixed;bottom:80px;left: 186px;z-index:99999;background:#2cd110;color:#fff"
        copyBtn.name = "copyBtn"
        copyBtn.id = "copyBtn"
        copyBtn.innerHTML = "C"
        body.appendChild(copyBtn)

        let newInput = document.createElement("input")
        newInput.style = "display:block;position:fixed;bottom: 73px;z-index: 99999;width: 145px;background: #0d0e0e;color: #31ff0c;"
        newInput.name = "sequencialNovoProjeto"
        newInput.id = "sequencialNovoProjeto"
        newInput.value = localStorage.getItem("sequencialProjetoAtualFraseteca") ? localStorage.getItem("sequencialProjetoAtualFraseteca") : "Projeto2023Jan01"
        body.appendChild(newInput)
        document.getElementById("btnRun").addEventListener("click", function () {
            InputObjetos.run()
        })
        document.getElementById("copyBtn").addEventListener("click", function () {
            InputObjetos.copia(newInput.value)
        })
    },

    run() {
        sequencialNovoProjeto.value = InputObjetos.getSequencialNovoProjeto()
        localStorage.setItem("sequencialProjetoAtualFraseteca", sequencialNovoProjeto.value);
        InputObjetos.copia(sequencialNovoProjeto.value)
    },

    getSequencialNovoProjeto() {
        let ultimoProjetoNoTrello = document.getElementById("sequencialNovoProjeto").value ? document.getElementById("sequencialNovoProjeto").value : "Projeto2023Jan01";
        const d = new Date();
        let mesDoUltimo = ultimoProjetoNoTrello.substring(11, 14)
        let sequencialDoUltimo = ultimoProjetoNoTrello.substring(14, 16)

        sequencialDoUltimo = InputObjetos.pad(parseInt(sequencialDoUltimo) + 1, 2);

        //Tratamento da data atual
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let mesAtual = monthNames[d.getMonth()].substring(0, 3);
        let anoAtual = d.getFullYear();

        let sequencialNovoProjeto = "Projeto" + anoAtual + mesAtual

        console.log("Extensão: novo projeto criado")

        if (mesAtual == mesDoUltimo) {
            return sequencialNovoProjeto + sequencialDoUltimo;
        } else {
            return sequencialNovoProjeto + "01";
        }
    },

    pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    },

    copia(valor) {
        //colocar na área de transfrência todo o conteúdo copiado
        let tempInput = document.createElement("input")
        document.body.appendChild(tempInput)

        tempInput.value = `● ${valor} - Descrição do seu projeto`
        tempInput.select()
        try {
            // var successful = 
            document.execCommand("copy")
            console.log("Extensão: projeto copiado")
            document.body.removeChild(tempInput)
        } catch (err) {
            //alert('Oops, não foi possível copiar.');
            console.log("ops")
        }
    }
}

InputObjetos.preLoad()
// export { InputObjetos }