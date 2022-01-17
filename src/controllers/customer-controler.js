'use strict' 

const repository = require('../repositories/customer-repository');
const ValidationContract = require('../validators/fluent-validation');
const authService = require('..//services/auth-service');
const md5 = require('md5');

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
    repository.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,        
        password: md5(req.body.password + global.SALT_KEY)
    })
    .then(x => {       
        res.status(200).send({salvar: 'ok', messege: 'salvo com sucesso!'});
    }).catch(e => {
        res.status(400).send({messege: e});
    });
    
};

exports.put = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'Campo nome obrigatorio.');
    contract.hasMinLen(req.body.phone, 11, "Fone minimo: ex: 41 98825 1244");
    contract.hasMinLen(req.body.password, 8, 'Senha minimo 6 caracteres"');

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

exports.authenticate = async(req, res, next) => {
    try{
        const custumer = await repository.authenticate({
            phone: req.body.phone,       
            password: md5(req.body.password + global.SALT_KEY)        
        });
        
        const token = await authService.generateToken({
            phone: custumer.phone,
            password: custumer.password,
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processsar'
        });

        if(!custumer){
            res.status(404).send({
                message: 'Dados invalidos'
            });
            return;
        }   

        res.status(201).send({
            token: token, 
            data: custumer.data
        });
    } 
    
};