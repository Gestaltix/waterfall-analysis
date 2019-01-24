const funct = (exitValue, investors) => {
    console.log('investors: ', investors, '\nexitValue: ', exitValue)
    const spentMoney = investors.map(investor => investor.type === 'preferred' ? investor.invested : null).reduce((acc, n) => acc + n)
    if (spentMoney >= exitValue) { return payDebts(exitValue, investors) }
    else { return distributeFunds(exitValue - spentMoney, investors) }
}

const payDebts = (exitValue, investors) => {
    let newExitValue = exitValue
    return investors.map(investor => {
        if (investor.invested > newExitValue) { investor.money = newExitValue; newExitValue = 0 }
        else { investor.money = investor.invested; newExitValue -= investor.invested }
        return investor.money
    })
}

const distributeFunds = (moneyLeft, investors) => {
    const totalShares = investors.map(investor => investor.shares).reduce((acc, n) => acc + n)
    let done = true
    let extraMoney = 0
    const newInvestors = investors.map(investor => {
        if (investor.type === 'common') { investor.money = 0 }
        else if (investor.type === 'preferred' && ((moneyLeft + investor.invested) / totalShares) * investor.shares >= 2 * investor.invested) {
            investor.type = 'common';
            extraMoney += investor.invested
            investor.money = 0
            done = false
        } else { investor.money = investor.invested }
        return investor
    })
    return !done ? distributeFunds(extraMoney + moneyLeft, newInvestors) : makePayments(moneyLeft + extraMoney, newInvestors, totalShares)
}

const makePayments = (moneyLeft, investors, totalShares) => {
    let newTotalShares = totalShares
    let newMoneyLeft = moneyLeft
    const payedPreferred = investors.map(investor => {
        if (investor.type === 'preferred') {
            let potentialMoney = (moneyLeft / totalShares) * investor.shares
            if (investor.invested < potentialMoney) {
                investor.money += investor.invested
                newMoneyLeft -= investor.invested
            } else { investor.money += potentialMoney; newMoneyLeft -= potentialMoney }
            newTotalShares -= investor.shares
        }
        return investor
    })
    const payedAll = payedPreferred.map(investor => {
        if (investor.type === 'common') {
            investor.money += (newMoneyLeft / newTotalShares) * investor.shares
        }
        return investor.money
    })
    return payedAll
}

console.log(funct(
    60000000,
    [
        {
            series: 'c', shares: 1500000, invested: 15000000, type: 'preferred'
        },
        {
            series: 'b', shares: 300000, invested: 2100000, type: 'preferred'
        },
        {
            series: 'a', shares: 200000, invested: 900000, type: 'preferred'
        },
        {
            series: 'founders', shares: 1000000, invested: 0, type: 'common'
        },
    ]
))

export default funct;