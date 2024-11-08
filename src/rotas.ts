import { Request, Response, Router } from "express"
import bancoDeDados from "./bancoDeDados"
import TEvento from "./tipos/Evento"
import criptografarSenha from "./auxiliares/criptografia"
import autenticar from "./middlewares/autenticarLogin"
import { v4 as uuidv4 } from 'uuid'
import fraseSecreta from "./fraseSecreta"


const rotas = Router()

rotas.post("/usuarios", async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        })
    }

    const usuarioExiste = bancoDeDados.usuarios.find((usuario) => usuario.email === email)
    
    if (usuarioExiste) {
        return res.status(400).json({
            mensagem: "E-mail já cadastrado"
        })
    }

    const senhaCriptografada = criptografarSenha(senha)

    const novoUsuario = {
        id: uuidv4(),
        nome,
        email,
        senha: senhaCriptografada
    }

    bancoDeDados.usuarios.push(novoUsuario)

    return res.status(201).json({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
    })

})

rotas.post("/login", async (req: Request, res: Response) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        })
    }

    const usuario = bancoDeDados.usuarios.find((usuario) => usuario.email === email)

    if (!usuario) {
        return res.status(400).json({
            mensagem: "E-mail ou senha inválidos"
        })
    }

    const senhaCriptografada = criptografarSenha(senha)

    if (senhaCriptografada !== usuario.senha) {
        return res.status(400).json({
            mensagem: "E-mail ou senha inválidos"
        })
    }

    res.status(200).json({
        "comprovante": fraseSecreta + "/" + usuario.id
    })
})

rotas.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        mensagem: "API de vendas de ingressos"
    })
})

rotas.get("/eventos", (req: Request, res: Response) => {
    const { maxPreco } = req.query
    const eventos: TEvento[] = bancoDeDados.eventos

    if (!maxPreco) {
        return res.status(200).json(eventos)
    }

    const maxPrecoInt = Number(maxPreco)

    if (isNaN(maxPrecoInt) || maxPrecoInt < 0) {
        return res.status(400).json({
            mensagem: "O preço máximo do evento deve conter apenas números e deve ser positivo"
        })
    }
    
    const eventosFiltrados = eventos.filter((evento) => evento.preco <= maxPrecoInt)

    return res.status(400).json(eventosFiltrados)

})

rotas.post('/compras', autenticar, async (req: Request, res: Response) => {
    const { idEvento } = req.body
    const comprovante = req.query.comprovante as string
  
    if (!idEvento) {
        return res.status(400).json({
            mensagem: "O identificador do evento é obrigatório"
        })
}
    const evento = bancoDeDados.eventos.find((evento) => evento.id === idEvento)

    if (!evento) {
        return res.status(404).json({ 
            mensagem: "Evento não encontrado" })
}
const idUsuario = comprovante.split('/')[1]
    if (!idUsuario) {
        return res.status(401).json({
            mensagem: "Falha na autenticação"
        })
    }

    const novaCompra = {
        id: uuidv4(),
        id_usuario: idUsuario,
        id_evento: idEvento
    }

    bancoDeDados.compras.push(novaCompra)

    return res.status(201).json(novaCompra)
})

rotas.get("/compras", autenticar, (req: Request, res: Response) => {
    const { comprovante } = req.query as { comprovante : string}
    const idUsuario = comprovante.split('/')[1]

    const compras = bancoDeDados.compras.filter((compra => compra.id_usuario === idUsuario))

    if (compras.length === 0) {
        return res.status(404).json({
            mensagem: "Compra não encontrada"
        })
    }

    const comprasDoUsuario = []

    for (let compra of compras) {
        const evento = bancoDeDados.eventos.find((evento) => evento.id === compra.id_evento) 

        const comprasRetornadas = {
        idCompra: compra.id,
        idEvento: compra.id_evento,
        nome: evento?.nome,
        endereco: evento?.endereco,
        data: evento?.data,
        preco: evento?.preco
    }

    comprasDoUsuario.push(comprasRetornadas)

    }


    return res.status(200).json(comprasDoUsuario)
})

rotas.delete("/compras/:id", autenticar, async (req: Request, res: Response) => {
    const { id } = req.params
    const { comprovante } = req.query as { comprovante : string}
    const idUsuario = comprovante.split('/')[1] 


    
    const compraIndex = bancoDeDados.compras.findIndex((compra => compra.id === id && compra.id_usuario === idUsuario))

    if (compraIndex === -1) {
        return res.status(404).json({
            mensagem: "Compra não encontrada"
        })
    }

    bancoDeDados.compras.splice(compraIndex, 1)

    return res.status(204).send()
})


export default rotas