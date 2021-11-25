const shortid = require('shortid')
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
    key_id: 'rzp_test_EPOGJf24mrVUeM',
    key_secret: 'GfA7XJCbOvAXHsT8NF5cJvmR'
})

exports.verify = (req, res) => {
    const secret = 'GfA7XJCbOvAXHsT8NF5cJvmR'

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {
        // pass it
    }
    res.json({ status: 'ok' })
}

exports.processPayment = async (req, res) => {
    const payment_capture = 1
    const amount = 499
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try {
        const response = await razorpay.orders.create(options)
        console.log("resposne from razpay controller: ", response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }

}