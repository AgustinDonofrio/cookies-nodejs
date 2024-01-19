import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello')
})

/** Crear una cookie */ 
app.get('/setCookiesExample', (req, res) => {
    res.cookie('cookie name', 'cookie1', {
        maxAge: 15000, // Tiempo de duración de la cookie (miliseconds)
        httpOnly: true, // Puede ser accedida a traves de peticiones (no desde el navegador)
        secure: true, // Solo puede ser leida por https
        sameSite: 'lax' // 'strict' -> mismo dominio de backend y frontend, 'lax' ->  contrario a strict
    })
    res.send('Creating cookie...')
})

/** Leer una cookie */
app.get('/getCookiesExample', (req, res) => {
    console.log(req.cookies)
    res.send('Reading cookie...')
})

/** Borrar una cookie específica */
app.get('/deleteCookieExample/:cookieName', (req, res) => {
    const cookieName = req.params.cookieName;
    if (req.cookies[cookieName] !== undefined) {
        res.clearCookie(cookieName);
        res.send(`Deleting cookie ${cookieName}...`);
    } else {
        res.status(400).send(`Cookie ${cookieName} does not exist.`)
    }
})

/** Borrar todas las cookies */
app.get('/deleteAllCookiesExample', (req, res) => {
    const cookies = Object.keys(req.cookies);
    cookies.forEach(cookieName => {
        res.clearCookie(cookieName);
    });
    res.send('Deleting all cookies...')
})

app.listen(process.env.PORT || 3000)
console.log('Server running')