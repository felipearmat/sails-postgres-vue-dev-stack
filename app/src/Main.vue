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
          class="mt-2 mb-2"
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
export default {
  components: {
    'app-lista': lista,
    'app-get': get,
    'app-post': post
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
        var _selecionados = []
        var _anotacoes = this.valores[chave].anotacoes
        for (var index in _anotacoes) {
          _selecionados[index] = this.valores[chave].anotacoes[index].selecionado
        }
        var _item = {
          id: _id,
          nome: this.valores[chave].nome,
          valores: _anotacoes,
          selecionados: _selecionados
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
        for (var chave in response.data) {
          var _id = response.data[chave].id
          if (!this.selecionados[_id]) {
            this.selecionados[_id] = []
          }
        }
        this.valores = response.data
      }
    },
    trataPost (response) {
      this.erros = []
      this.nome = ''
      if (response.data.erros) {
        window.alert(response.data.erros)
      } else {
        this.$refs.get_anotacoes.submit()
      }
    }
  }
}
</script>

<style>
</style>
