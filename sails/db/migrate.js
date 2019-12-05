module.exports = {
  run: async function () {
    // Criando listas iniciais
    await Item.create({ nome: 'Lista1' })
    await Item.create({ nome: 'Lista2' })
    await Item.create({ nome: 'Lista3' })

    var _item1 = await Item.find({ nome: 'Lista1' })
    var _item2 = await Item.find({ nome: 'Lista2' })
    // Criando anotações Iniciais
    if (_item1.length > 0) {
      await Anotacao.create({ item: _item1[0].id, texto: 'Anotação1 do Item1' })
      await Anotacao.create({ item: _item1[0].id, texto: 'Anotação2 do Item1', selecionado: true })
      await Anotacao.create({ item: _item1[0].id, texto: 'Anotação3 do Item1' })
      await Anotacao.create({ item: _item1[0].id, texto: 'Anotação4 do Item1', selecionado: true })
    }
    if (_item2.length > 0) {
      await Anotacao.create({ item: _item2[0].id, texto: 'Anotação1 do Item2' })
      await Anotacao.create({ item: _item2[0].id, texto: 'Anotação2 do Item2', selecionado: true })
      await Anotacao.create({ item: _item2[0].id, texto: 'Anotação3 do Item2' })
    }
  }
}
