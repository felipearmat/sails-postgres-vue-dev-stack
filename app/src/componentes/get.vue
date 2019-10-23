<template>
  <b-button
    v-if="!hidden"
    :id="id"
    :variant="variant"
    :size="size"
    :pill="pill"
    :disabled="disabled"
    :href="href"
    @click.prevent.stop="submit()"
  >
    <slot />
  </b-button>
</template>

<script>
import Util from './util.js'
export default {
  props: {
    variant: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    pill: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      required: true
    },
    parameters: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      default: ''
    },
    hidden: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Array, Object],
      default () {
        return {}
      }
    }
  },
  data: function () {
    return { lastResponse: {} }
  },
  methods: {
    setValue (val) {
      this.$emit('input', val)
    },
    setResponse (response) {
      this.lastResponse = response
      this.$emit('resolved', response)
    },
    submit () {
      var self = this
      this.$emit('click', '')
      this.$http.get(self.url, {
        params: self.parameters,
        headers: { 'X-CSRF-Token': window._csrf }
      }).then(function (response) {
        self.setValue(response.data)
        self.setResponse(response)
      }).catch(function (e) {
        self.setValue({})
        if (e.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (e.response.status >= 500) {
            e.response.data = {
              'data_req': e.response.data_req,
              'erros': [`Ocorreu um erro ${e.response.status}.`]
            }
          }
          self.setResponse(e.response)
        } else if (e.request) {
          // The request was made but no response was received
          // `e.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          e.request.data = {
            'data_req': e.request.data_req,
            'erros': ['Ocorreu um erro sem resposta.']
          }
          self.setResponse(e.request)
        } else {
          // Something happened in setting up the request that triggered an error
          e.response = {
            'data': {
              'erros': ['Ocorreu um erro desconhecido.']
            }
          }
          self.setResponse(e.response)
        }
      })
    }
  }
}
</script>

<style>
</style>
