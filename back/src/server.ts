import app from './app'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
    .then(() => {
        const PORT = process.env.PORT || 3000
        console.log('Server is running')
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })
