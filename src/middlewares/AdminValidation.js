const AdminModel = require('../model/AdminModel')
const validator = require('validator')

class AdminValidation {
    async verifyEmailAndPass(req, res, next) {
        const { email, password } = req.body

        if (!email)
            return res.status(400).json({ error: 'O e-mail é obrigatório!' })
        else if (!validator.isEmail(email))
            return res.status(400).json({ error: 'O e-mail é inválido!' })
        else if (!password)
            return res.status(400).json({ error: 'A senha é obrigatória!' })
        else if (password.length < 6)
            return res.status(400).json({ error: 'A senha deve conter no minímo 6 caracteres!' })
        else {
            let exists = await AdminModel.findOne({
                'email': { '$eq': email }
            })

            if (exists)
                return res.status(400).json({ error: 'Já existe uma conta com esse e-mail!' })

            next()
        }
    }

    async verifyId(req, res, next) {
        const id = req.params.id

        let exists = await AdminModel.findOne({
            '_id': { '$eq': id }
        })

        if (!exists)
            return res.status(400).json({ error: 'Esse administrador não existe!' })

        next()
    }

    verifyPass(req, res, next) {
        if (req.body.password && req.body.password.length < 6)
            return res.status(400).json({ error: 'A senha deve conter no minímo 6 caracteres!' })
 
        next()
    }
}

module.exports = new AdminValidation
