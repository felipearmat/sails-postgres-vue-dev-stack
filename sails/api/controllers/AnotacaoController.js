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
  alteraLista: async function(request, response) {
    var _idItem = request.body.id
    var _novoNome = request.body.nome
    var _item = await Item.find({ nome: _novoNome })
    if (_item.length > 0) {
      return response.status(400).json({ erros: [`Item com nome: '${_novoNome}' já existe!`] })
    }
    var updatedItem = await Item.updateOne({ id: _idItem }).set({ nome: _novoNome })
    if (updatedItem) {
      return response.json({ resposta: `Item id: '${_idItem}' atualizado com sucesso!` })
    } else {
      return response.status(400).json({ erros: [`Não foi possível atualizar o item id: '${_idItem}'!`] })
    }
  },
  removeLista: async function(request, response) {
    var _idItem = request.body.id
    var _item = await Item.findOne({ id: _idItem }).populate('anotacoes')
    if (!_item) {
      return response.status(400).json({ erros: [`Item id: '${_idItem}' não existe!`]})
    }
    for (var chave in _item.anotacoes) {
      var destroyedAnotacao = await Anotacao.destroyOne({ id: _item.anotacoes[chave].id })
      if (!destroyedAnotacao) {
        return response.status(400).json({
          erros: [`Não foi possível remover a anotação id: '${_item.anotacoes[chave].id}' do item id: '${_idItem}!`]
        })
      }
    }
    var destroyedItem = await Item.destroyOne({ id: _idItem })
    if (destroyedItem) {
      return response.json({ resposta: `Item id: '${_idItem}' removido com sucesso!` })
    } else {
      return response.status(400).json({ erros: [`Não foi possível remover o item id: '${_idItem}'!`] })
    }
  },
  criaAnotacao: async function(request, response) {
    var _nomeItem = request.body.nomeItem
    var _texto = request.body.texto
    var _item = await Item.find({ nome: _nomeItem })
    if (_item.length < 1) {
      return response.status(400).json({ erros: [`Item nome: '${_nomeItem}' não existe!`] })
    }
    await Anotacao.create({item: _item[0].id, texto: _texto})
    return response.json({ resposta: `Anotacao criada com sucesso na lista: '${_nomeItem}'!` })
  },
  alteraAnotacao: async function(request, response) {
    var _anotacaoId = request.body.id
    var _anotacao = await Anotacao.findOne({ id: _anotacaoId })
    if (!_anotacao) {
      return response.status(400).json({ erros: [`Anotacao id: '${_anotacaoId}' não existe!`] })
    }
    var updatedAnotacao = await Anotacao.updateOne({ id: _anotacaoId })
    .set({
      selecionado: request.body.selecionado,
      texto: request.body.texto
    })
    if (updatedAnotacao) {
      return response.json({ resposta: `Anotacao id: '${_anotacaoId}' atualizada com sucesso!` })
    } else {
      return response.status(400).json({ erros: [`Não foi possível atualizar a anotação id: '${_anotacaoId}'!`] })
    }
  },
  removeAnotacao: async function(request, response) {
    var _anotacaoId = request.body.id
    var _anotacao = await Anotacao.findOne({ id: _anotacaoId })
    if (!_anotacao) {
      return response.status(400).json({ erros: [`Anotacao id: '${_anotacaoId}' não existe!`] })
    }
    var destroyedAnotacao = await Anotacao.destroyOne({ id: _anotacaoId })
    if (destroyedAnotacao) {
      return response.json({ resposta: `Anotacao id: '${_anotacaoId}' removida com sucesso!` })
    } else {
      return response.status(400).json({ erros: [`Não foi possível remover a anotação id: '${_anotacaoId}'!`] })
    }
  },
}

