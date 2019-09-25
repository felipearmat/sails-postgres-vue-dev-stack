<template>
  <b-card
    :header="titulo"
    :title="titulo"
  >
    <b-form-checkbox-group
      v-model="value.selecionados"
      :options="value.valores"
      stacked
    />
    <template v-slot:footer>
      <b-input-group
        prepend="Novo Item"
        class="mt-2 mb-2"
      >
        <b-form-input v-model="texto" />
        <b-input-group-append>
          <b-button
            variant="primary"
            @click="insereValor(texto)"
          >
            Inserir
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </template>
  </b-card>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      texto: ''
    }
  },
  computed: {
    scopedValue: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', newVal)
      }
    }
  },
  methods: {
    insereValor (string) {
      this.scopedValue.valores.push(string)
      this.texto = ''
    }
  }
}
</script>

<style>
</style>
