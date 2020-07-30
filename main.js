let signal_start_pause;

function isColorHex(color1, color2, color3) {

    // Recebendo os elementos da cor
    color1 = color1.toLowerCase();
    color2 = color2.toLowerCase();
    color3 = color3.toLowerCase();

    // Cria um vetor com os elementos 'r', 'g', 'b'
    var rgb_array = [color1, color2, color3];

    // Array de valores caracteres validos em hexadecimal
    valid_values = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    // Verifica se cada elemento (R+G+B) esta preenchido, se esta vazio é inserido o valor '00',
    // se tem apenas um elemento é inserido o valor '0' a esquerda, se está correto não é feito nada.
    for (var i = 0; i < rgb_array.length; i++) {
        if (rgb_array[i] === '')
            rgb_array[i] = '00';
        else if (rgb_array[i].length == 1)
            rgb_array[i] = '0' + rgb_array[i];
    }

    // Cria um vetor com os elementos r[0], r[1], g[0], g[1], b[0], b[1]
    var rrggbb_array = (rgb_array.join('')).split('');

    // Verifica se cada elemento é um valor hexadecimal
    for (var i = 0; i < rrggbb_array.length; i++) {
        if (!~valid_values.indexOf(rrggbb_array[i])) {
            alert("Valor informado fora do padrão HEXADECIMAL.");
            return false;
        }
    }
    document.getElementById("btn_start_pause").innerHTML = "Parar";
    return rgb_array;
}

function incrementColor() {

    // Recebendo valores de incremento
    let ri = document.getElementById("r_increment").value;
    let gi = document.getElementById("g_increment").value;
    let bi = document.getElementById("b_increment").value;

    // Cria um vetor com as entradas de incremento
    var increment_array = [ri, gi, bi];

    // Converte os valores do increment para inteiro
    for (var i = 0; i < increment_array.length; i++)
        increment_array[i] = Math.round(increment_array[i]);

    if (isColorHex(document.getElementById("r_color").value, document.getElementById("g_color").value, document.getElementById("b_color").value)) {

        var r = parseInt(document.getElementById("r_color").value, 16);
        var g = parseInt(document.getElementById("g_color").value, 16);
        var b = parseInt(document.getElementById("b_color").value, 16);
        var increment_value = parseInt(document.getElementById("change_interval_value").value);

        var r_hex = "";
        var g_hex = "";
        var b_hex = "";
        var color = "";

        signal_start_pause = setInterval(() => {

            if (r < 255) {
                r = r + increment_array[0];
                r_hex = r.toString(16);
            }
            else {
                r = 255;
                r_hex = r.toString(16);
            }

            if (g < 255) {
                g = g + increment_array[1];
                g_hex = g.toString(16);
            }
            else {
                g = 255;
                g_hex = g.toString(16);
            }

            if (b < 255) {
                b = b + increment_array[2];
                b_hex = b.toString(16);
            }
            else {
                b = 255;
                b_hex = b.toString(16);
            }

            color = "#" + (isColorHex(r_hex, g_hex, b_hex)).join('');
            document.body.style.backgroundColor = color;
            document.body.parentElement.style.backgroundColor = color;
            document.getElementById("color_output").value = color;

            if (r >= 255 && g >= 255 && b >= 255) {
                startPause();
            }

        }, increment_value);
    }
}
let btn = document.getElementById("btn_start_pause");
function startPause() {


    if (btn.innerHTML == "Iniciar") {
        incrementColor();
        for (var i = 0; i < document.querySelectorAll(".color_input").length; i++)
            document.querySelectorAll(".color_input")[i].setAttribute("readonly", "");
    }
    else {
        clearInterval(signal_start_pause);
        for (var i = 0; i < document.querySelectorAll(".color_input").length; i++)
            document.querySelectorAll(".color_input")[i].removeAttribute("readonly");
        btn.innerHTML = "Iniciar";
    }
}

document.querySelectorAll(".color_input").forEach(element => {
    element.addEventListener('input', () => {
        if (element.value < 0)
            element.value = element.value * -1;
    })
})
