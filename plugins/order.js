const pizzapi = require('dominos')

function getStores(done) {
  pizzapi.Util.findNearbyStores('11 Times Square, New York, NY 10036', 'Delivery', (storeData) => {
    console.log(storeData.result.Stores)

    const filteredStores = storeData.result.Stores
    .filter(store => store.IsOnlineCapable && store.IsOnlineNow && store.IsOpen)
    .map(store => `${store.StoreID}: ${store.AddressDescription}`)
    .sort()
    done(filteredStores)
  })
}

module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention'], (bot, message) => {
      

      getStores(function(filteredStores){

        bot.reply(message, `looking for nearby stores, \n ${filteredStores.join("\n")}`)
      })
    })
  },
  help: {
    command: 'I want a pizza',
    text: `Say "I want a pizza" and I'll look for a store`
  }
}
