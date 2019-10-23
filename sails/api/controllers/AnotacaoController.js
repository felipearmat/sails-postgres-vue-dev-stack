/**
 * AnotacaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * `AnotacaoController`
   */
  consulta: async function(request, response) {
    var _itens = await Item.find().populate('anotacoes')
    return response.send(_itens)
  },
  criaItem: async function(request, response) {
    var _nome = request.param('nome')
    await Item.create({nome: _nome})
    return response.send(`<p>Criado: ${_nome}!</p>`)
  },
  criaAnotacao: async function(request, response) {
    var _nomeItem = request.body.item
    var _texto = request.body.texto
    var _item = await Item.findOne({ nome: _nomeItem })
    await Anotacao.create({item: _item.id, texto: _texto})
    return response.send(`<p>Criado: ${_texto} em ${_nomeItem}!</p>`)
  },
  alteraItem: async function(request, response) {

  },
  removeItem: async function(request, response) {

  },
  alteraAnotacao: async function(request, response) {

  },
  removeAnotacao: async function(request, response) {

  },
}

