<template>
  <EasyLaunch v-if="missingFields.length === 0 && initCardData" :cardData="getCardData" :defaultStyle="params.defaultStyle"/>
</template>
<script>
  import EasyLaunch from '../components/EasyLaunch.vue'
  import store from '../store'
  export default {
    data () {
      return {
        params: "",
        missingFields: [],
        requiredFields: ['cardId', 'secret', 'publicKey', 'publicKeyFingerprint', 'requestUrl', 'apiKeyId', 'apiKey'],
        initCardData: false
      }
    },
    computed: {
      getCardData () {
        let dataObject = Object()
        for (let [key, value] of Object.entries(this.params)) {
          dataObject[key] = value
        }
        return dataObject
      }
    },
    methods: {
      checkValidParams () {
        this.requiredFields.forEach(element => {
          let value = this.params[element]
          if (value === undefined || value.length < 1 ) {
            this.missingFields.push(element)
          }
          else {
            if (element === 'apiKeyId') {
              store.commit('setApiKeyId', value)
            } else if (element === 'apiKey') {
              store.commit('setApiKey', value)
            }
          }
        })
        if (this.missingFields.length === 0) {
          this.initCardData = true
        } else {
          store.commit('initError', 'Missing required parameters: ' + this.missingFields)
        }
      }
    },
    beforeMount () {
      this.params = JSON.parse(atob(this.$route.query.data))
    },
    mounted () {
      setTimeout(() => {
        this.checkValidParams()
      }, 100)
    },
    components: {
      EasyLaunch
    }
  }
</script>
