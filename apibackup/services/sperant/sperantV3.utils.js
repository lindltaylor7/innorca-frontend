const Big = require('big.js')

class UtilsV3 {
    /**
     * @param {string} date
     */
    static formaPaymentstDate = (date, incluteTime = false) => {
        if (!date) return ''
        const d = new Date(date * 1000)
        const day = d.getDate().toString().length == 1 ? `0${d.getDate()}` : `${d.getDate()}`
        const month = (d.getMonth() + 1).toString().length == 1 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`

        const time = incluteTime ? ` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` : ''
        return `${day}/${month}/${d.getFullYear()}${time}`
    }

    /**
     * @param {number} expiresAt in seconds
     * @param {string} status
     */
    static getPaymentStatus = (expiresAt, status) => {
        const expiresAtDate = new Date(expiresAt * 1000)
        const today = new Date()

        if (status == 'completed') return status

        if (expiresAtDate < today) {
            return 'expired'
        } else {
            return 'pending'
        }
    }

    /** @param {object} rawPayment */
    static getExpiresAt = (rawPayment) => {
        switch (rawPayment.type) {
            case 'quotas':
                return rawPayment.attributes.quota_at
            case 'payments':
                return rawPayment.attributes.estimated_at
            default:
                return
        }
    }

    /** @param {object} rawPayment */
    static getFormattedExpiresAt = (rawPayment) => {
        switch (rawPayment.type) {
            case 'quotas':
                return UtilsV3.formaPaymentstDate(rawPayment.attributes.quota_at)
            case 'payments':
                return UtilsV3.formaPaymentstDate(rawPayment.attributes.estimated_at)
            default:
                return
        }
    }

    /** @param {object} rawPayment */
    static getDepositAt = (rawPayment) => {
        switch (rawPayment.type) {
            case 'quotas':
                return rawPayment.attributes.deposit_at
            case 'payments':
                return rawPayment.attributes.payment_at
            default:
                return
        }
    }

    static numberToCurrency = (currency = 'USD') => {
        const lang = currency == 'USD' ? 'en-US' : 'pe-PE'
        const currencyFormatter = new Intl.NumberFormat(lang, { style: 'currency', currency: currency })

        /** @param {Intl.NumberFormat} currencyFormatter */
        const formatNumber = (currencyFormatter) =>
            /** @param {number} amount */
            (amount) => {
                const amountTemp = amount || 0
                const dec = (amountTemp.toString()).split(".")
                const splittedAmount = (currencyFormatter.format(amountTemp)).split(".")

                return dec[1] == undefined ? `${splittedAmount[0]}.00`.replace(/PEN/i, 'S/') : `${splittedAmount[0]}.${dec[1]}`.replace(/PEN/i, 'S/')
            }

        return formatNumber(currencyFormatter)
    }

    static formatPaymentTag = (tag) => {
        switch (tag) {
            case 'quota_initial':
                return 'Cuota inicial'
            case 'quota_capital':
                return 'Cuota capital'
            case 'amortization':
                return 'Cuota de amortización'
            case 'cancelation':
                return 'Cuota de cancelación'
            case 'contract_signature':
                return 'Firma de Contrato'
            default:
                return 'Separación'
        }
    }

    /** @param {number} x @param {number} y @returns {number} */
    static Sum = (x, y) => {
        return (new Big(x)).plus(new Big(y)).toNumber()
    }

    /** @param {number} x @param {number} y @returns {number} */
    static Times = (x, y) => {
        const value = (new Big(x)).times(new Big(y))
        return value.round(2, 1).toNumber()
    }

    /** @param {object} rawPayment */
    static computePaymentValues = (rawPayments) => {
        let totalSaldo = 0
        let totalAmount = 0

        for (const payment of rawPayments) {
            if (payment.active) {
                if (payment.type == 'quotas') {
                    if (payment.status == 'pending') {

                        totalSaldo = UtilsV3.Sum(totalSaldo, payment.saldo);
                    } else if (payment.status == 'completed') {
                        //console.log('quota totalSaldo', payment.amount);
                        totalAmount = UtilsV3.Sum(totalAmount, payment.amount);
                    }
                } else {
                    if (payment.status == 'pending') {
                        totalSaldo = UtilsV3.Sum(totalSaldo, payment.saldo);
                    } else if (payment.status == 'completed') {
                        //console.log('quota else', payment.amountPaid);
                        totalAmount = UtilsV3.Sum(totalAmount, payment.amountPaid);
                    }
                }
            }
        }

        const projectTotal = UtilsV3.Sum(totalSaldo, totalAmount)

        return { totalSaldo, totalAmount, projectTotal }
    }

    /** @param {string} url @param {string} param*/
    static getQueryParam(url, param) {
        const query = url.split('?')[1]
        const params = query.split("&")
        for (let i = 0; i < params.length; i++) {
            const pair = params[i].split("=")
            if (pair[0] == param) { return pair[1] }
        }
        return
    }

    /** @param {string} bankName*/
    static getBankLink = (bankName) => {
        if (!bankName) return 'javascript:void(0)'

        return `mapa/banco?bankName=${bankName}`
    }

    /** @param {string} bankCode*/
    static getBankManual = (bankCode) => {
        if (!bankCode) return 'javascript:void(0)'

        switch (`${bankCode}`) {
            case 'PEBBVA':
                return 'https://ventanamenorca.s3.us-east-2.amazonaws.com/Infograi%CC%80fico+pagos+BBVA+(2).pdf'
            case 'PEBCP':
                return 'https://ventanamenorca.s3.us-east-2.amazonaws.com/Infograi%CC%80fico+pagos+BCP+(2).pdf'
            case 'PEBANBIF':
                return 'https://ventanamenorca.s3.us-east-2.amazonaws.com/Infogra%CC%81fico%2Bpagos%2BBanBif%2B(VF).pdf'
            case 'PESCOTIABANK':
                return 'https://ventanamenorca.s3.us-east-2.amazonaws.com/1641411848414.pdf'
            case 'PEINTERBANK':
                return 'https://ventanamenorca.s3.us-east-2.amazonaws.com/1641411848414.pdf'
            default:
                return 'javascript:void(0)'
        }
    }

    static getBankIcon = (bankCode) => {
        if (!bankCode) return 'javascript:void(0)'

        switch (`${bankCode}`) {
            case 'PEBBVA':
                return 'bbva-icon.svg'
            case 'PEBCP':
                return 'bcp-icon.svg'
            case 'PEBANBIF':
                return 'banbif-icon.svg'
            case 'PESCOTIABANK':
                return 'scotiabank-icon.svg'
            case 'PEINTERBANK':
                return 'interbank-icon.svg'
            default:
                return 'javascript:void(0)'
        }
    }

}

module.exports = UtilsV3