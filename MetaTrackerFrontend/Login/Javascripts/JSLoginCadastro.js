;(function(){
    "use strict";

    const botaoCadastroLogin = document.getElementById("id_BotaoCadastroLogin");
    const conteudoPrincipal = document.getElementById("id_conteudoPrincipal");

    const ParteTelaLogin = document.getElementById("id_telaLogin");
    const ParteTelaCadastro = document.getElementById("id_telaCadastro");

    botaoCadastroLogin.addEventListener("click", MudarLoginCadastro)

    let telaLogin = true;

    function MudarLoginCadastro() {

        let tempo = 0.4;

        if (telaLogin) {

            conteudoPrincipal.style.animation = `DispararDesaparecer ${tempo}s linear`;
            botaoCadastroLogin.style.animation = `DispararDesaparecer ${tempo}s linear`;
            setTimeout(() => {
                botaoCadastroLogin.textContent = "Realizar login";
                ParteTelaLogin.style.display = "none";
                ParteTelaCadastro.style.display = "flex";

                conteudoPrincipal.style.animation = `DispararAparecer ${tempo}s linear`;
                botaoCadastroLogin.style.animation = `DispararAparecer ${tempo}s linear`;
                },tempo*1000)
            telaLogin = !telaLogin
        }else{
            conteudoPrincipal.style.animation = `DispararDesaparecer ${tempo}s linear`;
            botaoCadastroLogin.style.animation = `DispararDesaparecer ${tempo}s linear`;
            setTimeout(() => {
                botaoCadastroLogin.textContent = "Realizar cadastro"
                ParteTelaLogin.style.display = "flex";
                ParteTelaCadastro.style.display = "none";

                conteudoPrincipal.style.animation = `DispararAparecer ${tempo}s linear`;
                botaoCadastroLogin.style.animation = `DispararAparecer ${tempo}s linear`;
            },tempo*1000)
            telaLogin = !telaLogin;
        }
    }

    const visualizarOcultarSenha = document.getElementById("id_visualizarOcultarSenha");
    const visualizarOcultarSenhaCadastro = document.getElementById("id_visualizarOcultarSenhaCadastro");

    visualizarOcultarSenha.addEventListener("click", () => {

        if (SenhaLogin.type === "password") {
            SenhaLogin.type = "text";
            visualizarOcultarSenha.classList.add("fa-eye-slash");
        }else{
            SenhaLogin.type = "password";
            visualizarOcultarSenha.classList.remove("fa-eye-slash");
        }
    })

    visualizarOcultarSenhaCadastro.addEventListener("click", () => {

        if (SenhaCadastro.type === "password") {
            SenhaCadastro.type = "text";
            visualizarOcultarSenhaCadastro.classList.add("fa-eye-slash");
        }else{
            SenhaCadastro.type = "password";
            visualizarOcultarSenhaCadastro.classList.remove("fa-eye-slash");
        }
    })

    //-----------------------------------------------------------
    //Códigos para a validação dos inputs
    //Login:
    //Mais do que 3 caracteres
    //Senha:
    //Informar senha incorreta ou correta
    //--------------------------------------
    //Cadastro:
    //Id Usuário deve ser maior do que 3 caracteres só com letras
    //Email deve conter @
    //Senha deve ser maior do que 8
    //-----------------------------------------------------------
    
    //Login
    const UsuarioLogin = document.getElementById("id_UsuarioLogin");
    const SenhaLogin = document.getElementById("id_SenhaLogin");
    const botaoLogin = document.getElementById("id_botaoLogin");

    const CorInputErrado = "#FF8F8F";

    botaoLogin.addEventListener("click", RealizarLogin);

    function RealizarLogin() {
        
        //Validações de login
        //If para quando não encontrar o usuário no Backend e mudar esse if
        if (UsuarioLogin.value.length < 3 || UsuarioLogin.value != "Usuario") {

            UsuarioLogin.style.backgroundColor = CorInputErrado;
            
            let valorUsuario = UsuarioLogin.value;
            UsuarioLogin.value = "Usuário inexistente";
            UsuarioLogin.disabled = !UsuarioLogin.disabled;
            
            setTimeout(() =>{
                UsuarioLogin.value = valorUsuario;
                UsuarioLogin.disabled = !UsuarioLogin.disabled;
                UsuarioLogin.style.backgroundColor = "var(--CorFundoBody)";
                
            },1200)
        }
        //If para senha incorreta e validando ela
        if (SenhaLogin.value.length < 8 || SenhaLogin.value != "senhasenha") {
            
            SenhaLogin.style.backgroundColor = CorInputErrado;
            
            let valorSenha = SenhaLogin.value;
            SenhaLogin.disabled = true;
            SenhaLogin.value = "Senha incorreta";
            SenhaLogin.type = "text";
            
            setTimeout(() => {
                SenhaLogin.value = valorSenha;
                SenhaLogin.style.backgroundColor = "var(--CorFundoBody)";
                SenhaLogin.disabled = false;
                SenhaLogin.type = "password";

            }, 1200)
        }
        //Para levar para a tela de login
        if (UsuarioLogin.value === "Usuario" && SenhaLogin.value === "senhasenha") {
            console.log("oi");
            window.location.href = "TelaPrincipal/telaPrincipal.html";
        }
    }

    const UsuarioCadastro = document.getElementById("id_UsuarioCadastro");
    const EmailCadastro = document.getElementById("id_emailCadastro");
    const SenhaCadastro = document.getElementById("id_SenhaCadastro");
    const BotaoCadastro = document.getElementById("id_BotaoCadastro");

    BotaoCadastro.addEventListener("click", realizarCadastro);

    function realizarCadastro() {

        let IDValido = true;
        let Emailvalido = true;
        let SenhaValida = true;
        
        if (!isNaN(UsuarioCadastro.value) || UsuarioCadastro.value.length < 3) {

            UsuarioCadastro.style.backgroundColor = CorInputErrado;
            UsuarioCadastro.disabled = !UsuarioCadastro.disabled;
            
            let valorUsuarioCadastro = UsuarioCadastro.value;
            let tamanhoFonteInput = UsuarioCadastro.style.fontSize;
            
            UsuarioCadastro.style.fontSize = "14px";
            
            if (UsuarioCadastro.value.length < 3) {
                UsuarioCadastro.value = "Deve ser maior do que 3 caracteres";
            }else if (!isNaN(UsuarioCadastro.value)) {
                UsuarioCadastro.value = "ID usuário não pode ser numérico";
            }

            IDValido = false;
            
            setTimeout(() => {
                UsuarioCadastro.value = valorUsuarioCadastro;
                UsuarioCadastro.style.backgroundColor = "var(--CorFundoBody)";
                UsuarioCadastro.disabled = !UsuarioCadastro.disabled;
                UsuarioCadastro.style.fontSize = tamanhoFonteInput;
            }, 1500)
        }

        if (EmailCadastro.value.indexOf("@") == -1) {
            
            EmailCadastro.style.backgroundColor = CorInputErrado;
            
            let valorEmail = EmailCadastro.value;
            EmailCadastro.value = `Deve conter "@"`;
            EmailCadastro.disabled = !EmailCadastro.disabled;

            Emailvalido = false;
            
            setTimeout(() => {
                
                EmailCadastro.style.backgroundColor = "var(--CorFundoBody)";
                EmailCadastro.value = valorEmail;
                EmailCadastro.disabled = !EmailCadastro.disabled;
            }, 1500);
        }

        if (SenhaCadastro.value.length < 8) {
            
            SenhaCadastro.style.backgroundColor = CorInputErrado;
            
            let valorSenha = SenhaCadastro.value;
            SenhaCadastro.disabled = true;
            let tamanhoFonteInput = UsuarioCadastro.style.fontSize;
            SenhaCadastro.style.fontSize = "12px";
            SenhaCadastro.value = "Deve ser maior do que 8 caracteres";
            SenhaCadastro.type = "text";

            SenhaValida = false;
            
            setTimeout(() => {
                SenhaCadastro.value = valorSenha;
                SenhaCadastro.style.backgroundColor = "var(--CorFundoBody)";
                SenhaCadastro.disabled = false;
                SenhaCadastro.type = "password";
                SenhaCadastro.style.fontSize = tamanhoFonteInput;

            }, 1500)
        }

        if (IDValido && Emailvalido && SenhaValida) {

            window.location.href = "TelaPrincipal/telaPrincipal.html";
        }

    }
})()