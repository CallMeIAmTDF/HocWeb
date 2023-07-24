let turn = true;
//let matrixCaro = new Array();
let matrixCaro = new Array();
for (var i = 0; i < 11; i++) {
    matrixCaro[i] = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
}
let counter = 0
const lengthMatrix = 11;

function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) { return r[c]; });
    });
}

function play(btn) {
    //console.log(matrixCaro)
    console.log(btn);
    list = btn.classList;
    splitList = list[1].split('_');
    //console.log(splitList)
    i = parseInt(splitList[1]) - 1;
    //console.log(i)
    j = parseInt(splitList[2]) - 1;
    if (turn == true) {
        btn.innerText = 'X';
        btn.classList.add('xbtn');
        matrixCaro[i][j] = 1;
    }
    else {
        btn.innerText = 'O';
        btn.classList.add('obtn');
        matrixCaro[i][j] = 0;
    }
    btn.setAttribute('disabled', 'disabled')
    turn = !turn;
    counter++;
    if (counter == lengthMatrix*lengthMatrix) {
        alert('Full');
        resetGame();
    }
    //console.log(matrixCaro);
    horizontalCheck();
    verticalCheck();
    crossCheck(i, j)
}

function resetGame() {
    if (!confirm('RESET GAME???')) {
        return;
    }
    let btns = document.getElementsByClassName('btn')
    for (let i = 0; i < btns.length; i++) {
        const ele = btns[i];
        ele.innerText = '';
        const list = ele.classList;
        list.remove('xbtn')
        list.remove('obtn')
        ele.removeAttribute("disabled")
    }
    turn = true;
    counter = 0;
    for (var i = 0; i < lengthMatrix; i++) {
        matrixCaro[i] = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
    }
}

function resetWinGame() {
    let btns = document.getElementsByClassName('btn')
    if (!confirm('RESET GAME???')) {
        for (var i = 0; i < btns.length; i++) {
            btns[i].setAttribute('disabled', 'disabled');
        }
        return;
    }

    for (let i = 0; i < btns.length; i++) {
        const ele = btns[i];
        ele.innerText = '';
        const list = ele.classList;
        list.remove('xbtn')
        list.remove('obtn')
        ele.removeAttribute("disabled")
    }
    turn = true;
    counter = 0;
    for (var i = 0; i < lengthMatrix; i++) {
        matrixCaro[i] = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
    }
}

function splitFiveCells(arrayList) {
    let resArray = new Array();
    for (var j = 0; j < 7; j++) {
        resArray[j] = new Array(0, 0, 0, 0, 0);
    }
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 5; j++) {
            resArray[i][j] = arrayList[i + j];
        }
    }
    return resArray;
}

function checkSum(arrayList) {
    let sum = 0;
    for (var i = 0; i < 5; i++) {
        if (arrayList[i] == -1) {
            return false;
        }
        sum += arrayList[i];
    }
    if (sum == 0 || sum == 5) {
        return true;
    }
    return false;
}

function horizontalCheck() {
    for (var i = 0; i < lengthMatrix; i++) {
        resArray = splitFiveCells(matrixCaro[i]);
        //console.log(resArray);
        for (var j = 0; j < resArray.length; j++) {
            if (checkSum(resArray[j])) {
                if (resArray[j][1] == 1) {
                    alert('X THẮNG');
                    resetWinGame();
                }
                else {
                    alert('O THẮNG');
                    resetWinGame();
                }
            }
        }
    }
}

function verticalCheck() { //Hàng Ngang
    newMatrix = transpose(matrixCaro);
    //console.log(matrixCaro);
    //console.log(newMatrix);
    for (var i = 0; i < lengthMatrix; i++) {
        resArray = splitFiveCells(newMatrix[i]);
        //console.log(resArray);
        for (var j = 0; j < resArray.length; j++) {
            if (checkSum(resArray[j])) {
                if (resArray[j][1] == 1) {
                    alert('X THẮNG');
                    resetWinGame();
                }
                else {
                    alert('O THẮNG');
                    resetWinGame();
                }
            }
        }
    }
}

function crossCheck(i, j) { //Hàng Dọc
    const dif = Math.abs(i - j);
    const sum = i + j;

    var cross1 = [] // \
    var cross2 = [] // /

    //Tìm theo \
    for (let x = 0; x < lengthMatrix - dif; x++) {
        if (x + dif < lengthMatrix) {
            if (i > j) {
                cross1.push(matrixCaro[x + dif][x]);
            }
            else {
                cross1.push(matrixCaro[x][x + dif]);
            }
        }
    }

    //Tìm theo /
    for (var x = 0; x < sum; x++) {
        if (x < lengthMatrix && (sum - x) < lengthMatrix && (sum - x) > 0) {
            cross2.push(matrixCaro[x][sum - x]);
        }
    }

    if (cross1.length >= 5) {
        resArray1 = splitFiveCells(cross1);
        for (var j = 0; j < resArray1.length; j++) {
            if (checkSum(resArray1[j])) {
                if (resArray1[j][1] == 1) {
                    alert('X THẮNG');
                    resetWinGame();
                }
                else {
                    alert('O THẮNG');
                    resetWinGame();
                }
            }
        }
    }
    if (cross2.length >= 5) {
        resArray2 = splitFiveCells(cross2);
        for (var j = 0; j < resArray2.length; j++) {
            if (checkSum(resArray2[j])) {
                if (resArray1[j][1] == 1) {
                    alert('X THẮNG');
                    resetWinGame();
                }
                else {
                    alert('O THẮNG');
                    resetWinGame();
                }
            }
        }
    }
}