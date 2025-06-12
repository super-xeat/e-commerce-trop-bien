// Prendre le header Authorization dans la requête entrante (req.headers.authorization)

//Vérifier que ça commence par "Bearer " (bonne structure du token)

//Extraire le token avec .split(" ")[1]

//Vérifier et décoder le token avec jwt.verify(...) :

//Si c’est bon → tu récupères le payload (ex: { userId: ..., role: 'admin' })

//Stocker le payload dans req.user pour pouvoir y accéder dans les routes suivantes

//Appeler next() pour passer à la suite

const jwt = require('jsonwebtoken')


function middleware(req, res, next) {

    const head = req.headers.authorization

    try {
    if (!head || !head.startsWith('Bearer')) {
        res.status(403).json({message:'erreur token inexistant'})
    }

    const token = head.split(' ')[1]
    const payload = jwt.verify(token, 'cle-secrete')
    
    req.user = payload

    next()
    } catch(error) {
        res.status(400).json({message: 'erreur'})
    }
} 


function isadmin(req, res, next) {

    if (req.user.role !== 'admin') {
        return res.status(403).json({message: 'erreur'})
    }
    next()
}


module.exports = {veriftoken : middleware, isadmin}