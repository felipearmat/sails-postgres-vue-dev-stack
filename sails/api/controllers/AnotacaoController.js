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
  consulta: async function(req, res) {

  },
  criaAnotacao: async function(req, res) {

  },
  alteraAnotacao: async function(req, res) {

  },
  removeAnotacao: async function(req, res) {

  },
  formTest: async function (req, res) {
   var first_name = req.param('first_name');
   var last_name = req.param('last_name');
   await Person.create({firstName: first_name, lastName: last_name});
   return res.send(`<p>Hello, ${first_name} ${last_name}!</p>`);
  }
};

