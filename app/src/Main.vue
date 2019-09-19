<template>
  <b-container>
    <b-row class="mt-4">
      <b-col />
      <b-col cols="6">
        <b-card
          header="Minha Primeira Lista"
          :title="titulo"
        >
          <b-form-checkbox-group
            v-model="selecionados"
            :options="valores"
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
      </b-col>
      <b-col />
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: function () {
    return {
      titulo: 'Teste de titulo',
      selecionados: [],
      valores: [],
      texto: ''
    }
  },
  methods: {
    insereValor (string) {
      this.valores.push(string)
      this.texto = ''
    }
  }
}
</script>

<style>
body {
  background-image: url(../public/bg.jpg);
}
</style>
