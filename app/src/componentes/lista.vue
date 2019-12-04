<template>
  <b-card
    :header="titulo"
    :title="titulo"
  >
    <template v-for="option in value.valores">
      <b-form-checkbox
        :key="option.texto + '_checkbox'"
        v-model="value.selecionados"
        :value="option.id"
        @change="trataCheckBox($event, option)"
      >
        {{ option.texto }}
      </b-form-checkbox>
      <app-post
        :key="option.id + '_post'"
        :ref="option.id + '_post'"
        :value="postLista(option)"
        url="/alteraAnotacao"
        hidden
        @resolved="trataPost"
      />
    </template>
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
        this.$emit('input', this.value)
      }
    }
  },
  methods: {
    postLista (anotacao) {
      return anotacao
    },
    trataCheckBox (event, item) {
      var _itemIndex = this.value.valores.findIndex(valor => valor.id === item.id)
      if (_itemIndex >= 0) {
        this.value.valores[_itemIndex].selecionado = !this.value.valores[_itemIndex].selecionado
      }
      this.$refs[item.id + '_post'][0].submit()
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
