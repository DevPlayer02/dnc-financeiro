"use client"

export const LoginForm = () => {
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('Formulario enviado')
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>LoginForm</h1>
            <label htmlFor="email"> E-mail </label>
            <input type="text" placeholder="E-mail" id="email" name="email"/>

            <label htmlFor="password"> Senha </label>
            <input type="password" placeholder="Password" id="password" name="password"/>
        
            <button type="submit"> Enviar </button>
        </form>
    )
}