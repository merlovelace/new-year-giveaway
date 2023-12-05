const express = require('express')()
const {randomGiveawayFunction} = require('./giveaway')
const {sendGrid} = require('./sendGrid')


const cors = require('cors')
express.use(cors({origin: '*'}))


const {json} = require('body-parser')
express.use(json({limit: '50kb'}))
express.post('/new-year/giveaway', async (req, res) => {
    try {
        const data = randomGiveawayFunction(req.body.array);
        for (let user of data) {
            let giverUserName = user.giver.name.toLocaleUpperCase()
            let giverUserMail = user.giver.email
            let receiverUserName = user.receiver.name.toLocaleUpperCase()
            let receiverUserMail = user.receiver.email

            const emailMessage = `Congratulations ${giverUserName}! You will start the new year by making ${receiverUserName} happy with your gift. Here is the contact email ${receiverUserMail}`
            await sendGrid('give-away', giverUserMail, emailMessage)
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


express.listen(4000, () => {
    console.log('---------------------------------------------------------------------------------')
    console.log(`Give Away Backend Running! Port: 4000`)
    console.log(`Server Start Time: ${new Date()}`)
    console.log('---------------------------------------------------------------------------------')
})
