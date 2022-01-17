'use strict' 

const repository = require('../repositories/publication-repository');
const ValidationContract = require('../validators/fluent-validation');

exports.get = (req, res, next) => {
    repository.get()
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
    repository.getById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({messege: 'erro:', data: e });
    });
};

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.imageUrl, 3);
    repository.create(req.body)   
    .then(x => {
        res.status(200).send({salvar: 'ok', messege: 'salvo com sucesso!'});
    }).catch(e => {
        res.status(400).send({messege: e});
    });
    
};

exports.put = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.imageUrl, 3);
    contract.hasMinLen(req.body.description, 3); 

    repository.update(req.params.id, req.body)
    .then(x => {
        res.status(200).send({salvar: 'ok', messege: 'Atualizado com sucesso!'});
    }).catch(e => {
        res.status(400).send({messege: e});
    });
};

exports.delete = (req, res, next) => {    let contract = new ValidationContract();
    repository.delete(req.params.id)
    .then(x => {
        res.status(200).send({salvar: 'ok', messege: 'Deletado com sucesso!'});
    }).catch(e => {
        res.status(400).send({messege: e});
    });
};