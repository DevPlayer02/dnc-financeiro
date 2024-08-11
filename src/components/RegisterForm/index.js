"use client"

export const RegisterForm = () => {
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('Formulario enviado')
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>RegisterForm</h1>
            <label htmlFor="name"> Nome </label>
            <input type="text" placeholder="Name" id="name" name="name"/>

            <label htmlFor="email"> E-mail </label>
            <input type="text" placeholder="E-mail" id="email" name="email"/>

            <label htmlFor="password"> Senha </label>
            <input type="password" placeholder="Password" id="password" name="password"/>
        
            <button type="submit"> Enviar </button>
        </form>
    )
}