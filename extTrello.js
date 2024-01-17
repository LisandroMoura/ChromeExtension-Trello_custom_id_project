document.addEventListener('DOMContentLoaded',function(){

    //trigger buttons
    document.getElementById("btnRun").addEventListener("click",function(){
        zerar()
    })
    function zerar(){
        localStorage.setItem("sequencialProjetoAtualFraseteca", "");
    }
})