import { Request, Response, Router } from "express"
import bancoDeDados from "./bancoDeDados"
import TEvento from "./tipos/Evento"

const rotas = Router()

rotas.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        mensagem: "API de vendas de ingressos!"
    })
})

rotas.get("/eventos", (req: Request, res: Response) => {
    const { maxPreco } = req.query
    const eventos: TEvento[] = bancoDeDados.eventos

    if (maxPreco == null) {
        return res.status(200).json(eventos)
    }

    const maxPrecoInt = parseInt(maxPreco.toString(), 10)

    if (isNaN(parseInt(maxPreco.toString(), 10)) || maxPrecoInt < 0) {
        return res.status(400).json({
            mensagem: "O preço máximo do evento deve conter apenas números e deve ser positivo"
        })
    }
    
    const response = bancoDeDados.eventos.filter((evento) => {
        return evento.preco <= maxPrecoInt
    })

    res.status(200).json(response)

})


export default rotas
