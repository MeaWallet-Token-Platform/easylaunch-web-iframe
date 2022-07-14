<template>
  <div class="mea-easy-launch-container">
    <loading :active="activeOverlay" :is-full-page="false" loader="bars" class="mea-overlay-style"/>
    <template v-if="!activeOverlay && !cardDataObject.panImage">
      <div class="mea-data mea-pan-result" v-if="encodedData.pan && cardDataObject.showPan">
        <div class="mea-input-name">PAN:</div> {{encodedData.pan}}
      </div>
      <div class="mea-data mea-expiry-result" v-if="encodedData.expiry && cardDataObject.showExpiry" >
        <div class="mea-input-name">Expiry:</div> {{formattedExpiry}}
      </div>
      <div class="mea-data mea-cvv-result" v-if="encodedData.cvv && cardDataObject.showCvv">
        <div class="mea-input-name">CVC:</div> {{encodedData.cvv}}
      </div>
      <div class="mea-data mea-emboss-result" v-if="encodedData.embossname && cardDataObject.showEmbossName">
        <div class="mea-input-name">Name:</div> {{encodedData.embossname}}
      </div>
    </template>
  </div>
</template>

<script>
import forge from 'node-forge'
import easyLaunchService from '@/services/easyLaunchService'
import CryptoJS from 'crypto-js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      key: '',
      keyHex: '',
      publicKey: '',
      encodedData: '',
      displayTimeout: 60000,
      formattedExpiry: '',
      activeOverlay: false,
      panCopied: false,
      expiryCopied: false,
      embossCopied: false,
      cardDataObject: ''
    }
  },
  props: {
    cardData: Object
  },
  methods: {
    initEncryptionKey () {
      this.$emit('infoLog', 'Getting data')
      this.activeOverlay = true
      let publicKey = '-----BEGIN PUBLIC KEY-----' + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(this.publicKey)) + '-----END PUBLIC KEY-----'
      let publicKeyDecoded = forge.pki.publicKeyFromPem(publicKey)
      this.cardDataObject.encryptedKey = forge.util.bytesToHex(publicKeyDecoded.encrypt(this.key, 'RSA-OAEP', {
        md: forge.md.sha512.create(),
        mgf1: {
          md: forge.md.sha512.create()
        }
      }))
      if (!this.cardDataObject.panImage) {
        easyLaunchService.getPan(this.cardDataObject)
          .then(response => {
            this.decryptData(response)
            this.initResultTimeout()
            this.$emit('infoLog', 'Getting data done')
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.activeOverlay = false
          })
      } else {
        easyLaunchService.getCardImage(this.cardDataObject)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.activeOverlay = false
          })
      }
    },
    decryptData (data) {
      let key = CryptoJS.enc.Hex.parse(this.keyHex)
      let encIv  = CryptoJS.enc.Hex.parse(data.iv)
      let cryptText = CryptoJS.enc.Hex.parse(data.encryptedData)
      let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: cryptText
      })
      this.encodedData = JSON.parse(CryptoJS.AES.decrypt(cipherParams, key, { iv: encIv}).toString(CryptoJS.enc.Utf8))
      if (this.cardDataObject.showExpiry) {
        this.formatExpiryDate()
      }
    },
    formatExpiryDate() {
      const t = new Date(this.encodedData.expiry);
      const month = ('0' + (t.getMonth() + 1)).slice(-2);
      const year = t.getFullYear().toString().substr(-2)
      this.formattedExpiry = `${month}/${year}`;
    },
    copyPan () {
      this.panCopied = true
      setTimeout(() => {
        this.panCopied = false
      }, 2000)
    },
    copyExpiry () {
      this.expiryCopied = true
      setTimeout(() => {
        this.expiryCopied = false
      }, 2000)
    },
    copyEmboss () {
      this.embossCopied = true
      setTimeout(() => {
        this.embossCopied = false
      }, 2000)
    },
    initResultTimeout () {
      setTimeout(() => {
        this.encodedData = ''
        this.$emit('infoLog', 'Data was cleared')
      }, this.displayTimeout)
    },
  },
  beforeMount () {
    this.publicKey = this.cardData.publicKey
    this.key = forge.random.getBytesSync(32)
    this.keyHex = forge.util.bytesToHex(this.key)
    delete this.cardData.publicKey
    this.cardDataObject = this.cardData
  },
  mounted () {
    this.initEncryptionKey()
  },
  components: {
    Loading
  }
}
</script>
