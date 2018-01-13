/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let dndDiv = document.createElement('DIV');

    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);

        rand = Math.round(rand);

        return rand;
    }

    let color = 'rgb(' + randomInteger(1, 256) + ',' + randomInteger(1, 256) + ',' + randomInteger(1, 256) + ')',
        size = { 'width': randomInteger(50, 100), 'height': randomInteger(50, 100) },
        position = { 'left': randomInteger(50, 500), 'top': randomInteger(50, 500) };

    dndDiv.setAttribute('class', 'draggable-div');
    dndDiv.setAttribute('cursor', 'move');
    dndDiv.style.position = 'absolute';
    dndDiv.style.backgroundColor = color;
    dndDiv.style.width = size.width + 'px';
    dndDiv.style.height = size.height + 'px';
    dndDiv.style.left = position.left + 'px';
    dndDiv.style.top = position.top + 'px';

    return dndDiv

}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    target.ondragstart = function() {
        return false;
    };

    target.onmousedown = function(e) {

        moveAt(e);

        function moveAt(e) {
            target.style.left = e.pageX - target.offsetWidth/2 + 'px';
            target.style.top = e.pageY - target.offsetHeight/2 + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        target.onmouseup = function() {
            document.onmousemove = null;
            target.onmouseup = null;
        };
    };

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
