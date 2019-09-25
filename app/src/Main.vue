<template>
  <b-container>
    <b-row class="mt-4">
      <b-col />
      <b-col cols="6">
        <comp-lista
          v-for="(item, index) in listas"
          :key="'lista_' + index"
          v-model="listas[index]"
          :titulo="'Teste de lista ' + index"
          class="mb-3"
        />
      </b-col>
      <b-col />
    </b-row>
  </b-container>
</template>

<script>
import compLista from './componentes/lista.vue'
export default {
  components: {
    'comp-lista': compLista
  },
  data: function () {
    return {
      listas: [
        { valores: [], selecionados: [] },
        { valores: [], selecionados: [] },
        { valores: [], selecionados: [] },
        { valores: [], selecionados: [] },
        { valores: [], selecionados: [] }
      ],
      teste: { valores: [], selecionados: [] }
    }
  }
}
</script>

<style>
</style>
