/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
    let div = document.createElement('div');

    div.innerText = text;

    return div;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
    let tagA = document.createElement('A');

    tagA.setAttribute('href', hrefValue);

    return tagA;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
    let nodeWeNeed = where.firstChild;

    where.insertBefore(what, nodeWeNeed);
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let nodesArr = [];
    let needNodes = where.getElementsByTagName('p');

    for (let i = 0; i < needNodes.length; i++) {
        let needElem = needNodes[i].previousSibling;

        nodesArr.push(needElem);
    }

    return nodesArr;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    var result = [];

    for (var i = 0; i < where.children.length; i++) {
        result.push(where.children[i].innerText);
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    for (let i = 0; i < where.childNodes.length; i++) {
        if (where.childNodes[i].nodeType === 3) {
            where.removeChild(where.childNodes[i]);
            --i;
        }
    }

    return where;
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {

    var recurse = function(i, where) {
        if (!where || !where.childNodes || where.childNodes.length === 0) {
            return false;
        }
        var l = where.childNodes.length;

        if (i === l) {
            return false;
        }
        if (where.childNodes[i].nodeType === 1) {
            recurse(0, where.childNodes[i]);
        }
        if (where.childNodes[i].nodeType === 3 ) {
            where.removeChild(where.childNodes[i]);
            i--;
            l--;
        }
        i++;

        return recurse(i, where);
    };

    recurse(0, where);

    return where;
}
/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
function collectDOMStat(root) {
    let resultObj = {};
    let tagsArr = [];
    let classArr = [];
    let textCounter = 0;

    function recursiveSearch(node) {
        let elements = node.childNodes;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i] && elements[i].nodeType === 3) {
                textCounter++;
            } else if (elements[i] && elements[i].nodeType === 1) {
                tagsArr.push(elements[i].tagName);
                if (elements[i].getAttribute('class')) {
                    classArr.push(elements[i].className.split(' '))
                }
                recursiveSearch(elements[i])
            }
        }
    }

    recursiveSearch(root);

    function createObjStats (arr, classFlag) {
        let finalArr = [],
            objStats = {};

        if (classFlag) {
            arr = arr.join().split(',');
        }

        arr.sort();
        arr.forEach(function(item, i, array) {
            if (array[i + 1] !== item || !array[i + 1]) {
                finalArr.push(item);
            }
        });

        finalArr.forEach(function(item) {
            if (classFlag) {
                objStats[item] = root.querySelectorAll('.' + item).length;
            } else {
                objStats[item] = root.querySelectorAll(item).length;
            }
        });

        return objStats;

    }

    resultObj.tags = createObjStats(tagsArr, false);
    resultObj.classes = createObjStats(classArr, true);
    resultObj.texts = textCounter;

    return resultObj;
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объек с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {
    let observer = new MutationObserver(mutCb),
        objValues = {
            nodes: []
        };

    function mutCb(mutationRecord) {

        mutationRecord.forEach(function(mutRec) {

            if (mutRec.addedNodes.length) {
                objValues.type = 'insert';
                for (let i = 0; i < mutRec.addedNodes.length; i++) {
                    objValues.nodes.push(mutRec.addedNodes[i]);
                }
            } else if (mutRec.removedNodes.length) {
                objValues.type = 'remove';
                for (let i = 0; i < mutRec.removedNodes.length; i++) {
                    objValues.nodes.push(mutRec.removedNodes[i]);
                }
            }
        });

        fn(objValues);
    }

    observer.observe(where, {
        subtree: true,
        childList: true
    });
}

export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
