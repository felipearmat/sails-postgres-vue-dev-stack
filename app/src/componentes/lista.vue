<template>
  <b-card
    :header="titulo"
    :title="titulo"
  >
    <b-form-checkbox
      v-for="(option, index) in value.valores"
      :key="option.texto"
      :value="value.selecionados"
      @change="trataCheckBox($event, index)"
    >
      {{ option.texto }}
    </b-form-checkbox>
    <template v-slot:footer>
      <b-input-group
        prepend="Nova Anotação"
        class="mt-2 mb-2"
      >
        <b-form-input v-model="texto" />
        <b-input-group-append>
          <app-post
            url="/criaAnotacao"
            :value="postData"
            @resolved="trataPost"
          >
            Inserir
          </app-post>
        </b-input-group-append>
      </b-input-group>
    </template>
  </b-card>
</template>

<script>
import post from './post.vue'
export default {
  components: {
    'app-post': post
  },
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
    postData () {
      return {
        texto: this.texto,
        item: this.value.nome
      }
    },
    scopedSelecionados: {
      get () {
        return this.value.selecionados
      },
      set (newVal) {
        var _valores = this.value.valores
        this.value.selecionados = newVal
        for (var chave in _valores) {
          _valores[chave].selecionado = newVal[chave]
        }
        console.log('escopo da lista', this.value)
        this.$emit('input', this.value)
      }
    }
  },
  methods: {
    trataCheckBox (event, index) {
      var _valores = this.value.valores
      this.value.selecionados[index] = !this.value.selecionados[index]
      this.value.valores[index].selecionado = !this.value.valores[index].selecionado
      console.log('escopo da lista', this.value)
      this.$emit('input', this.value)
    },
    trataPost (response) {
      // Emite um evento resolved para que o pai do item saiba que deve atualizar
      this.texto = ''
      this.$emit('resolved', response)
    }
  }
}
</script>

<style>
</style>
