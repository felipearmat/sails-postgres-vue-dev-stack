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
  criaLista: async function(request, response) {
    var _nome = request.body.nome
    var _item = await Item.find({nome: _nome})
    if (_item.length > 0) {
      return response.status(400).json({ erros: [`Item nome: '${_nome}' já existe!`]})
    }
    await Item.create({nome: _nome})
    return response.json({ resposta: `Item nome: '${_nome}' criado com sucesso!` })
  },
  criaAnotacao: async function(request, response) {
    var _nomeItem = request.body.item
    var _texto = request.body.texto
    var _item = await Item.findOne({ nome: _nomeItem })
    await Anotacao.create({item: _item.id, texto: _texto})
    return response.json({ resposta: `Anotacao criada com sucesso na lista: '${_nomeItem}'!` })
  },
  alteraLista: async function(request, response) {

  },
  removeLista: async function(request, response) {

  },
  alteraAnotacao: async function(request, response) {

  },
  removeAnotacao: async function(request, response) {

  },
}

