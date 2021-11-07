/*Para crear un evento click sobre un elemento tenemos que invocar al método click sobre ese elemento y 
pasarle como parámetro una función con el código que queremos que se ejecute cuando se hace clic.*/
(function(){
    $(document).ready(function(){ // http://jquery.luisfel.com/
        $('.alt-form').on("click", function(){
            $('.form-content').animate({
                height: "toggle",
                opacity: 'toggle'
            }, 600);
        }); //https://api.jquery.com/animate/

        let formRegistro = document.getElementsByName('form-input');

        for (let i = 0; i < formRegistro.length; i++) {
            formRegistro[i].addEventListener('blur', function(){ //Enlaza un controlador de eventos para el evento "onFocus" de JavaScript o "onBlur", o sea reacciona cuando se hace foco en el objeto de formulario, o sea al seleccionarlo o cuando el objeto de formulario ya no está a foco o selecciona.

                if (this.value.length >= 1) {
                    this.nextElementSibling.classList.add('active'); //https://www.w3schools.com/jsref/prop_element_nextelementsibling.asp
                    this.nextElementSibling.classList.remove('error');

                } else if (this.value.length = " ") {
                    this.nextElementSibling.classList.add('error');
                    this.nextElementSibling.classList.remove('active');

                } else {
                    this.nextElementSibling.classList.remove('active');
                }
            })
        }

    })
}())