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
    if (!_item) {
      return response.json({ resposta: `Item nome: '${_nome}' não existe!` })
    }
    await Anotacao.create({item: _item.id, texto: _texto})
    return response.json({ resposta: `Anotacao criada com sucesso na lista: '${_nomeItem}'!` })
  },
  alteraLista: async function(request, response) {
  },
  removeLista: async function(request, response) {
    var _nome = request.body.nome
    var _item = await Item.find({nome: _nome})
    if (_item.length < 1) {
      return response.status(400).json({ erros: [`Item nome: '${_nome}' não existe!`]})
    }
    await Item.destroy({nome: _nome})
    return response.json({ resposta: `Item nome: '${_nome}' removido com sucesso!` })
  },
  alteraAnotacao: async function(request, response) {
    var _anotacaoId = request.body.id
    var _anotacao = await Anotacao.findOne({ id: _anotacaoId })
    console.log(_anotacao)
    if (!_anotacao) {
      return response.json({ resposta: `Anotacao id: '${_anotacaoId}' não existe!` })
    }
    var updatedAnotacao = await Anotacao.updateOne({ id: _anotacaoId })
    .set({
      selecionado: request.body.selecionado,
      texto: request.body.texto
    })
    if (updatedAnotacao) {
      return response.json({ resposta: `Anotacao id: '${_anotacaoId}' atualizada com sucesso!` })
    } else {
      return response.json({ resposta: `Não foi possível atualizar a anotação id: '${_anotacaoId}'!` })
    }
  },
  removeAnotacao: async function(request, response) {
    
  },
}

