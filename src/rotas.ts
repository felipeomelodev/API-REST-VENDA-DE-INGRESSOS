import { Request, Response, Router } from "express"

const rotas = Router()

rotas.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        mensagem: "API de vendas de ingressos!"
    })
})

export default rotas
