
const {Client} = require('pg')
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123123123',
    port: 5432
}
const client = new Client(config)
client.connect()

const agregar = async (datos) => {
    try {
        const [nombre, rut, curso, nivel] = datos
        const sql = await client.query(`INSERT INTO estudiantes(nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', '${nivel}');`)
        console.log(`${nombre}`)
        client.end()
    } catch (error) {
        console.log(error)
    }

}
const consultar = async () => {
    try {
        const sql = await client.query("SELECT * FROM estudiantes;")
        if (sql.rows.length == 0){
            console.log("No hay registros")
        }
        else{
            console.log(sql.rows)
        }
        client.end()
    } catch (error) {
        console.log(error)
    }
}
const editar = async (datos) => { 
    try {
        const [nombre, rut, curso, nivel] = datos
        const sql = `UPDATE estudiantes SET rut = '${rut}', curso = '${curso}', nivel = '${nivel}' WHERE nombre = '${nombre}' RETURNING *;` 
        const res = await client.query(sql)
        console.log(`${nombre}`)
        client.end()
    } catch (error) {
        console.log(error)
    }
}

const consultarPorRut = async (datos) => {
    try{
        const rut = datos[0];
        const sql = `SELECT * FROM estudiantes WHERE rut = '${rut}';`
        const res = client.query(sql)
        res.then((resolve) => {
            (resolve.rows.length == 0) ? console.log("No se encontraro rut ingresado") : console.log(resolve.rows)
            client.end()
        })
    }catch(error){
        console.log(error)
    }
}

const eliminar = (datos) => {
    try{
        const rut = datos[0];
        const sql = `DELETE FROM estudiantes WHERE rut = '${rut}' RETURNING *;`
        const res = client.query(sql)
        res.then((resolve) => {
            console.log(resolve.rows)
            if (resolve.rows.length == 1){
                console.log(`${resolve.rows[0].nombre} -> Eliminado`)
            } 
            else{
                console.log("No se encontraro rut ingresado...")
            }    
            client.end()
        })
    }catch(error){
        console.log(error)
    }
}

module.exports = {agregar, consultar, editar, consultarPorRut, eliminar} 