/* const denominations = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];
// mult by 100 to convert
const money = {
    'PENNY': 1,
    'NICKEL': 5,
    'DIME': 10,
    'QUARTER': 25,
    'ONE': 100,
    'FIVE': 500,
    'TEN': 1000,
    'TWENTY': 2000,
    'ONE HUNDRED': 10000
};
const moneyFromCid = (amtLeftToPay, cidObj, changeToGive, moneyType) => {
    if (amtLeftToPay >= money[moneyType] && cidObj[moneyType]) {
        if (amtLeftToPay >= cidObj[moneyType]) {
            const amtToSubtract = cidObj[moneyType];
            amtLeftToPay -= amtToSubtract;
            changeToGive.push([moneyType, amtToSubtract / 100]);
            cidObj[moneyType] = 0;
        } else {
            const amtToSubtract = Math.floor(amtLeftToPay / money[moneyType]) * money[moneyType];
            amtLeftToPay -= amtToSubtract;
            changeToGive.push([moneyType, amtToSubtract / 100]);
            cidObj[moneyType] -= amtToSubtract;
        }
    }
    return [amtLeftToPay, cidObj, changeToGive];
};

function checkCashRegister(price, cash, cid) {
    let amtLeftToPay = Math.round((cash - price) * 100);

    // reduce = loops through each element and coverts it
    let cidObj = cid.reduce((acc, [moneyType, amt]) => {
        return {
            ...acc,
            [moneyType]: Math.round(amt * 100)
        }
    }, {})
    //console.log(cidObj);
    // destructure the objects of return [amtLeftToPay, cidObj, changeToGive]
    let changeToGive = [];
    denominations.forEach(moneyType => {
        [amtLeftToPay, cidObj, changeToGive] =
            moneyFromCid(amtLeftToPay, cidObj, changeToGive, moneyType);
    });

    if (amtLeftToPay > 0) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    const amtLeftInCid = Object.values(cidObj).reduce((acc, amt) => acc + amt, 0);

    if (amtLeftInCid > 0) {
        return { status: 'OPEN', change: changeToGive };
    }

    return { status: "CLOSED", change: cid };
}


console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])); */

var purchaseAmount;
var payment;

//submit button stuff
$('#submit').click(function (evt) {

    evt.preventDefault();

    //grab text from form
    purchaseAmount = document.getElementById('purchaseAmount').value;
    payment = document.getElementById('payment').value;

    function checkCashRegister(price, cash, cid) {
        var change;
        var cidTotal = 0.0;
        var changeDue = 0.00;
        var dumpDecimal;

        for (var a = 0; a < 9; a++) {
            dumpDecimal = (cid[a][1]) * 100;
            cidTotal = cidTotal + dumpDecimal;
            cidTotal = Math.ceil(cidTotal * 100) / 100;
            dumpDecimal = 0;
        }

        // Here is your change
        price = price * 100;
        cash = cash * 100;
        changeDue = cash - price;

        if (changeDue === cidTotal) {
            change = "Closed";
        } else if (changeDue > cidTotal) {
            change = "Insufficient Funds";
        } else {
            console.log
            console.log(changeDue * 0.01);

            change = [];

            // sort change
            var changeDueStr = changeDue.toString();
            var changeDueLength = changeDueStr.length;
            var pennies = Number(changeDueStr.slice(changeDueLength - 1));
            var nickels = (Math.floor(pennies / 5)) * 0.05;
            pennies = (pennies % 5) * 0.01;
            var dimes = Number(changeDueStr.slice(changeDueLength - 2, changeDueLength - 1));
            var quarters = Math.floor((dimes / 25) * 10);
            quarters = quarters * 0.25;
            dimes = (dimes % 2.5) * 0.10;
            var dollars = Number(changeDueStr.slice(changeDueLength - 3, changeDueLength - 2));
            var fives = (Math.floor(dollars / 5)) * 5.00;
            dollars = dollars % 5;
            var tens = Number(changeDueStr.slice(changeDueLength - 4, changeDueLength - 3));
            var twenties = (Math.floor(tens / 2)) * 20.00;
            tens = (tens % 2) * 10.00;
            var hundreds = Number(changeDueStr.slice(changeDueLength - 5, changeDueLength - 4));
            hundreds = hundreds * 100.00;

            // compare change due to cash in drawer
            if (cid[8][1] < hundreds && changeDueLength >= 5) {
                twenties = twenties + (hundreds - cid[8][1]);
                hundreds = cid[8][1];
                console.log("twenties " + twenties);
            }
            if (cid[7][1] < twenties && changeDueLength >= 4) {
                tens = tens + (twenties - cid[7][1]);
                twenties = cid[7][1];
                console.log("tens " + tens);
            }
            if (cid[6][1] < tens && changeDueLength >= 4) {
                fives = fives + (tens - cid[6][1]);
                tens = cid[6][1];
                console.log("fives " + fives);
            }
            if (cid[5][1] < fives && changeDueLength >= 3) {
                dollars = dollars + (fives - cid[5][1]);
                fives = cid[5][1];
                console.log("dollars " + dollars);
            }
            if (cid[4][1] < dollars && changeDueLength >= 3) {
                quarters = quarters + ((dollars / 0.25) - cid[4][1]);
                dollars = cid[4][1];
                console.log("quarters " + quarters);
            }
            if (cid[3][1] < quarters && changeDueLength >= 2) {
                dimes = dimes + (((quarters / 10) * 10) - cid[3][1]);
                nickels = quarters - dimes;
                quarters = cid[3][1];
                console.log("dimes " + dimes);
            }
            if (cid[2][1] < dimes && changeDueLength >= 2) {
                nickels = nickels + dimes - cid[2][1];
                dimes = cid[2][1];
                console.log("nickels " + nickels);
            }
            if (cid[1][1] < nickels && changeDueLength >= 2) {
                pennies = pennies + nickels - cid[1][1];
                nickels = cid[1][1];
                console.log("pennies " + pennies);
            }
            if (cid[0][1] < pennies && changeDueLength >= 1) {
                pennies = 0;
                change.unshift(["Insufficient Funds"]);
                console.log(change.toString());
                return change.toString();
            }

            // push change due to change array
            if (pennies > 0) {
                change.unshift(["PENNY", pennies]);
            }
            if (nickels > 0) {
                change.unshift(["NICKEL", nickels]);
            }
            if (dimes > 0 && changeDueLength >= 2) {
                change.unshift(["DIME", dimes]);
            }
            if (quarters > 0 && changeDueLength >= 2) {
                change.unshift(["QUARTER", quarters]);
            }
            if (dollars > 0 && changeDueLength >= 3) {
                change.unshift(["ONE", dollars]);
            }
            if (fives > 0 && changeDueLength >= 3) {
                change.unshift(["FIVE", fives]);
            }
            if (tens > 0 && changeDueLength >= 4) {
                change.unshift(["TEN", tens]);
            }
            if (twenties > 0 && changeDueLength >= 4) {
                change.unshift(["TWENTY", twenties]);
            }
            if (hundreds > 0 && changeDueLength >= 5) {
                change.unshift(["HUNDRED", hundreds]);
            }

        }
        // console.log(change);
        // console.log((cidTotal + cash) - changeDue);
        var cidTotalCash = cidTotal + cash;
        cidTotal = cidTotalCash - changeDue;
        console.log(cidTotal * 0.01);
        document.getElementById("cid").innerHTML = cidTotal * 0.01;
        return change;
    }

    checkCashRegister(purchaseAmount, payment, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);

});