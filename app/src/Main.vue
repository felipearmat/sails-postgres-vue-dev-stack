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
          v-model="listas[index]"
          :titulo="item.nome"
          class="mb-3"
          @resolved="trataPost"
        />
      </b-col>
      <b-col />
    </b-row>
  </b-container>
</template>

<script>
import lista from './componentes/lista.vue'
import get from './componentes/get.vue'
export default {
  components: {
    'app-lista': lista,
    'app-get': get
  },
  data: function () {
    return {
      erros: [],
      valores: [],
      selecionados: {},
      teste: { valores: [], selecionados: [] }
    }
  },
  computed: {
    listas () {
      var _res = []
      for (var item in this.valores) {
        var _id = this.valores[item].id
        var _item = {
          id: _id,
          nome: this.valores[item].nome,
          valores: this.valores[item].anotacoes,
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
      if (response.data.erros) {
        this.erros = response.data.erros
      } else {
        this.$refs.get_anotacoes.submit()
      }
    }
  }
}
</script>

<style>
</style>
