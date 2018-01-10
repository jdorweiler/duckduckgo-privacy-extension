const bel = require('bel')
const hero = require('./shared/hero.es6.js')
const details = require('./shared/privacy-practices-details.es6.js')

module.exports = function () {
  const domain = this.model && this.model.domain
  const tosdr = this.model && this.model.tosdr

  const tosdrMsg = (tosdr && tosdr.message) ||
    window.constants.tosdrMessages.unknown
  const tosdrStatus = tosdrMsg.toLowerCase()

  return bel`<section class="sliding-subview sliding-subview--has-fixed-header">
    <div class="privacy-practices site-info site-info--full-height card">
      <div class="js-privacy-practices-hero">
        ${hero({
          status: tosdrStatus,
          title: domain,
          subtitle: `${tosdrMsg} Privacy Practices`,
          showClose: true
        })}
      </div>
      <div class="privacy-practices__explainer padded border--bottom--inner
          text--center">
        Privacy practices indicate how much the personal information
        that you share with a website is protected.
      </div>
      <div class="privacy-practices__details padded border--bottom--inner
          js-privacy-practices-details">
        ${details(tosdr)}
      </div>
      <div class="privacy-practices__attrib padded text--center">
        Privacy Practice results from <a href="https://tosdr.org/" class="bold" target="_blank">ToS;DR</a>
      </div>
    </div>
  </section>`
}
