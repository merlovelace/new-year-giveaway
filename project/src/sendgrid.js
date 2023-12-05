const client = require('@sendgrid/mail')
require('dotenv').config()

client.setApiKey(process.env.SEND_GRID_KEY)
exports.sendGrid = async (type, email, text) => {
    const msg = {
        to: email,
        from: {
            name: 'NEW YEAR GIVE AWAY 🥂🎄🥳',
            email: process.env.GMAIL
        },
        subject: 'Sending New Year Give Away',
        templateId: '',
        dynamicTemplateData: {}
    };

    if(type === 'giveaway'){
        msg.templateId =  'd-dccf8e53b3db4db7b16fff75a1c9a73a'
        msg.dynamicTemplateData = {
            text: text
        }

    }
    console.log(msg);
    return client.send(msg)
        .then(r => { console.log('E-Posta sent!') })
        .catch(e => { console.error(e) });
}


