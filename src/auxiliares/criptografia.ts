function criptografarSenha(senha: string): string {
    const senhaInvertida = senha.split('').reverse().join('')
    const criptografiaDaSenha = `zz${senhaInvertida}yy`
    
    return criptografiaDaSenha
}

export default criptografarSenha