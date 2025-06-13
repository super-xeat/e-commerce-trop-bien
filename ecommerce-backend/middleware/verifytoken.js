// Prendre le header Authorization dans la requête entrante (req.headers.authorization)

//Vérifier que ça commence par "Bearer " (bonne structure du token)

//Extraire le token avec .split(" ")[1]

//Vérifier et décoder le token avec jwt.verify(...) :

//Si c’est bon → tu récupères le payload (ex: { userId: ..., role: 'admin' })

//Stocker le payload dans req.user pour pouvoir y accéder dans les routes suivantes

//Appeler next() pour passer à la suite

const jwt = require('jsonwebtoken')


function verifytoken(req, res, next) {

    const head = req.headers.authorization

    try {
    if (!head || !head.startsWith('Bearer')) {
        return res.status(403).json({message:'erreur token inexistant'})
    }

    const token = head.split(' ')[1]
    const payload = jwt.verify(token, 'cle_secrete')
    console.log('Payload JWT décodé :', payload);
    req.user = payload

    next()
    } catch(error) {
        console.error('Erreur dans verifytoken :', error)
        return res.status(400).json({message: 'erreur'})
    }
} 


function isadmin(req, res, next) {
    console.log(req.user)
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        return res.status(403).json({message: 'accés interdit'})
    }

}


module.exports = {verifytoken , isadmin}