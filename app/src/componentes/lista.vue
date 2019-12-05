<template>
  <b-card>
    <template v-slot:header>
      <h5 class="d-inline">
        {{ titulo }}
      </h5>
      <b-button
        v-b-modal="'modal-alterar-' + value.id"
        variant="light"
        class="pl-1 pt-0 pb-0 pr-1 ml-1"
      >
        <i class="fas fa-pencil-alt" />
      </b-button>
      <b-modal
        :id="'modal-alterar-' + value.id"
        :ref="'modal-alterar-' + value.id"
        hide-header
        @ok="postLista($event, value.id, 'alterar')"
      >
        <h6>Insira um novo nome para a lista {{ titulo }}:</h6>
        <b-form-input
          :id="'modal-alterar-' + value.id + '-input'"
          v-model.trim="novoTitulo"
          :state="estadoTitulo"
          type="text"
          required
        />
        <b-form-invalid-feedback :id="'modal-alterar-' + value.id + '-input'">
          Insira um novo Título
        </b-form-invalid-feedback>
      </b-modal>
      <b-button
        v-b-modal="'modal-excluir-' + value.id"
        variant="light"
        class="pl-1 pt-0 pb-0 pr-1 ml-1 text-danger"
      >
        <i
          class="far fa-trash-alt "
          aria-hidden="true"
        />
      </b-button>
      <b-modal
        :id="'modal-excluir-' + value.id"
        hide-header
        @ok="postLista($event, value.id, 'excluir')"
      >
        <h6>Tem certeza que você quer excluir a lista: {{ titulo }}?</h6>
      </b-modal>
    </template>
    <template v-for="option in value.valores">
      <b-form-checkbox
        :key="option.id + '_checkbox'"
        v-model="value.selecionados"
        :value="option.id"
        @change="alternaCheckBox(option)"
      >
        {{ option.texto }}
        <b-button
          variant="light"
          class="pl-1 pt-0 pb-0 pr-1 ml-1"
          @click="removeCheckBox(option)"
        >
          <i class="fas fa-eraser fa-sm text-danger" />
        </b-button>
      </b-form-checkbox>
      <app-post
        :key="option.id + '_post'"
        :ref="option.id + '_post'"
        :value="option"
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
        <b-form-input
          v-model="texto"
          type="text"
          required
        />
        <b-input-group-append>
          <app-post
            ref="app-post"
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
      texto: '',
      novoTitulo: ''
    }
  },
  computed: {
    estadoTitulo () {
      // Novo título deve ter comprimento > 1 e deve ser diferente do antigo titulo
      return this.novoTitulo.length > 1 && this.novoTitulo !== this.titulo
    },
    postData () {
      return {
        texto: this.texto,
        nomeItem: this.value.nome
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
    postLista (evento, id, tipo) {
      var _obj = { id: this.value.id, nome: this.novoTitulo }
      if (tipo === 'alterar') {
        evento.preventDefault()
        if (!this.estadoTitulo) {
          return
        }
        this.$refs['app-post'].submit('/alteraLista', {}, _obj)
        this.$nextTick(() => {
          this.$refs['modal-alterar-' + id].hide()
        })
        return
      }
      if (tipo === 'excluir') {
        this.$refs['app-post'].submit('/removeLista', {}, _obj)
        return
      }
      this.$emit('resolved', { data: { erros: ['Comando inválido!'] } })
    },
    alternaCheckBox (item) {
      var _itemIndex = this.value.valores.findIndex(valor => valor.id === item.id)
      if (_itemIndex >= 0) {
        this.value.valores[_itemIndex].selecionado = !this.value.valores[_itemIndex].selecionado
      }
      this.$refs[item.id + '_post'][0].submit()
    },
    removeCheckBox (item) {
      this.$refs[item.id + '_post'][0].submit('/removeAnotacao')
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
