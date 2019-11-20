<template>
  <b-container>
    <app-get
      ref="get_anotacoes"
      :parameters="{}"
      url="/anotacoes"
      hidden
      @resolved="trataGet"
    />
    <b-row class="mt-4">
      <b-col />
      <b-col cols="6">
        <app-lista
          v-for="(item, index) in listas"
          :key="'lista_' + index"
          :value="listas[index]"
          :titulo="item.nome"
          class="mb-3"
          @changeLista="atualizaLista"
          @resolved="trataPost"
        />
      </b-col>
      <b-col />
    </b-row>
    <b-row class="mt-4">
      <b-col />
      <b-col cols="6">
        <b-input-group
          prepend="Nova Lista"
          class="mb-2"
        >
          <b-form-input v-model="nome" />
          <b-input-group-append>
            <app-post
              url="/criaLista"
              :value="postData"
              @resolved="trataPost"
            >
              Inserir
            </app-post>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col />
    </b-row>
  </b-container>
</template>

<script>
import lista from './componentes/lista.vue'
import get from './componentes/get.vue'
import post from './componentes/post.vue'
import mensagens from './componentes/mensagens.vue'
export default {
  components: {
    'app-lista': lista,
    'app-get': get,
    'app-post': post,
    'app-mensagens': mensagens
  },
  data: function () {
    return {
      erros: [],
      valores: [],
      selecionados: {},
      nome: ''
    }
  },
  computed: {
    postData () {
      return {
        nome: this.nome
      }
    },
    listas () {
      var _res = []
      for (var chave in this.valores) {
        var _id = this.valores[chave].id
        var _anotacoes = this.valores[chave].anotacoes
        var _item = {
          id: _id,
          nome: this.valores[chave].nome,
          valores: _anotacoes,
          selecionados: this.selecionados[_id]
        }
        _res.push(_item)
      }
      return _res
    }
  },
  mounted: function () {
    this.$refs.get_anotacoes.submit()
  },
  methods: {
    trataGet (response) {
      this.erros = []
      if (response.data.erros) {
        this.erros = response.data.erros
      } else {
        this.valores = response.data
        for (var chave in this.valores) {
          var _item = this.valores[chave]
          var _id = String(_item.id)
          _item.anotacoes.sort(this.ordenaPorID)
          this.selecionados[_id] = []
          for (var key in _item.anotacoes) {
            var _anotacao = _item.anotacoes[key]
            if (_anotacao.selecionado) {
              this.selecionados[_id].push(_anotacao.id)
            }
          }
        }
      }
    },
    trataPost (response) {
      this.erros = []
      this.nome = ''
      if (response.data.erros) {
        this.erros = response.data.erros
      } else {
        this.$refs.get_anotacoes.submit()
      }
    },
    ordenaPorID (item1, item2) {
      if (item1.id < item2.id) {
        return -1
      }
      if (item1.id > item2.id) {
        return 1
      }
      return 0
    },
    atualizaLista (value) {
      console.log(value)
    }
  }
}
</script>

<style>
</style>
