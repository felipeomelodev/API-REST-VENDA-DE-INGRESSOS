import { NextFunction, Request, Response } from "express"
import bancoDeDados from "../bancoDeDados"

const autenticar = (req: Request, res: Response, next: NextFunction) => {
    const { comprovante } = req.query

if(!comprovante || typeof comprovante !== 'string') {
    return res.status(401).json({
        mensagem: "Falha na autenticação"
    })
}
    const idUsuario = comprovante.split('/')[1]

    if (!idUsuario) {
        return res.status(401).json({
            mensagem: "Falha na autenticação"
        })
    }

    const usuario = bancoDeDados.usuarios.find(usuario => usuario.id === idUsuario)

    if (!usuario) {
        return res.status(401).json({
            mensagem: "Falha na autenticação"
        })
    }
   
    next()

}

export default autenticar


