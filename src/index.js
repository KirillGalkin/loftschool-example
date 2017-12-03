/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    var fnResult = 0;
    var arrError = 'empty array';
    var fnError = 'fn is not a function';

    if (array instanceof Array !== true || array.length === 0) {
        throw new Error(arrError);
    }
    if (typeof fn !== 'function') {
        throw new Error(fnError);
    }

    for (var i = 0; i < array.length; i++) {
        if (fn(array[i]) === true) {
            fnResult++;
        } else {
            fnResult--;
        }
    }

    if (fnResult === array.length) {
        return true;
    }

    return false;

}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    var fnResult = 0;
    var arrError = 'empty array';
    var fnError = 'fn is not a function';

    if (array instanceof Array !== true || array.length === 0) {
        throw new Error(arrError);
    }
    if (typeof fn !== 'function') {
        throw new Error(fnError);
    }

    for (var i = 0; i < array.length; i++) {
        if (fn(array[i]) === true) {
            fnResult++;
        }
    }

    if (fnResult > 0) {
        return true;
    }

    return false;

}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    var argArray = [...arguments];
    var resultArr = [];

    if (typeof fn !== 'function') {
        throw new Error ('fn is not a function');
    }

    for (var i = 1; i < argArray.length; i++) {
        try {
            fn(argArray[i]);
        } catch (e) {
            resultArr.push(argArray[i]);
        }

    }

    return resultArr;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {

    if (typeof number !== 'number') {
        throw new Error ('number is not a number');
    }
    var obj = {
        sum() {
            var argArr = [...arguments];
            var result = argArr.reduce((summ, current)=> {
                return summ + current;
            });

            return result + number;
        },
        dif() {
            var argArr = [...arguments];

            argArr.unshift(number);
            var result = argArr.reduce((diff, current)=> {
                return diff - current;
            });

            return result;
        },
        div() {
            var argArr = [...arguments];

            argArr.unshift(number);
            var result = argArr.reduce((divv, current)=> {

                if (current === 0) {
                    throw new Error ('division by 0');
                }

                return divv/current;
            });

            return result;
        },
        mul() {
            var argArr = [...arguments];
            var result = argArr.reduce((mull, current)=> {
                return mull*current;
            });

            return result * number;
        }
    };

    return obj;

}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
