/**
 * Anotacao.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        item: {
            model: 'item',
            required: true
        },
        selecionado: {
            type: 'boolean',
        },
        texto: {
            type: 'string',
        },
    }
};

