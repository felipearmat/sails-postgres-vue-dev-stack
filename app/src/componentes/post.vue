<template>
  <b-button
    v-if="!hidden"
    :variant="variant"
    :size="size"
    :pill="pill"
    :disabled="busy || disabled"
    :href="href"
    @click.prevent.stop="submit()"
  >
    <slot />
  </b-button>
</template>

<script>
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
    hidden: {
      type: Boolean,
      default: false
    },
    parameters: {
      type: Object,
      default () { return {} }
    },
    value: {
      type: [String, Array, Object, window.FormData],
      default () {
        return []
      }
    }
  },
  data: function () {
    return {
      lastResponse: {},
      busy: false
    }
  },
  methods: {
    setValue (val) {
      this.$emit('input', val)
    },
    setResponse (response) {
      this.lastResponse = response
      this.$emit('resolved', response)
    },
    submit (url, params, data) {
      if (!url) {
        url = this.url
      }
      if (!params) {
        params = this.parameters
      }
      if (!data) {
        data = this.value
      }
      var self = this
      this.busy = true
      this.$emit('busy', true)
      this.$emit('click', '')
      this.$http({
        method: 'POST',
        url: url,
        params: params,
        data: data,
        headers: { 'X-CSRF-Token': window._csrf }
      }).then(function (response) {
        self.busy = false
        self.$emit('busy', false)
        self.setValue(response.data)
        self.setResponse(response)
      }).catch(function (e) {
        self.$emit('busy', false)
        self.busy = false
        self.setValue([])
        self.$emit('error', '')
        if (e.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (e.response.status >= 500) {
            e.response.data = {
              'erros': [`Ocorreu um erro ${e.response.status}.`]
            }
          }
          self.setResponse(e.response)
        } else if (e.request) {
          // The request was made but no response was received
          // `e.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          e.request.data = {
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
