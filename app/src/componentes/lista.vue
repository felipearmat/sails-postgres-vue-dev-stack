<template>
  <b-card
    :header="titulo"
    :title="titulo"
  >
    <b-form-checkbox
      v-for="option in value.valores"
      :key="option.texto"
      v-model="scopedSelecionados"
    >
      {{ option.texto }}
    </b-form-checkbox>
    <template v-slot:footer>
      <b-input-group
        prepend="Novo Item"
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
        console.log('Escopo da lista', newVal)
        this.value.selecionados = newVal
        this.$emit('input', this.value)
      }
    }
  },
  methods: {
    trataPost (response) {
      // Emite um evento resolved para que o pai do item saiba que deve atualizar
      this.$emit('resolved', response)
    }
  }
}
</script>

<style>
</style>
