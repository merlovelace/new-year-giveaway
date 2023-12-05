const client = require('@sendgrid/mail')
client.setApiKey("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")

const sendGrid = async (type, email, text) => {
    let options = {
        to: email,
        from: 'NEW YEAR GIVE AWAY 🥂🎄🥳',
        templateId: '',
        dynamicTemplateData: {}
    }

    if(type === 'give-away') {
        options.templateId = 'd95b6232-d759-4a83-976c-340875cf98b3'
        options.dynamicTemplateData = {
            text: text
        }
    }

    console.log(options)
    return client.send(options).then(r => { console.log('E-Posta Gönderildi!') }).catch(e => { console.log(e) })
}


module.exports = sendGrid
