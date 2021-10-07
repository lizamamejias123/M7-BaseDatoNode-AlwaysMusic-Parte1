const {consultar, agregar, editar, consultarPorRut, eliminar} = require('./modulos')

const [accion, ...datos] = process.argv.slice(2)
console.log(accion, datos)

// consulta los datos de estudiante
if (accion === 'consulta' && datos.length == 0){
    consultar()
}
// agrega un nuevo estudiante
else if (accion === 'nuevo' && datos.length == 4){
    agregar(datos)
}
// edita estudiantes por medio del nombre
else if (accion === 'editar' && datos.length == 4){
    editar(datos)
}
// Buscar por rut
else if (accion === 'rut' && datos.length == 1){
    consultarPorRut(datos)
}
// Eliminar por Rut
else if (accion === 'eliminar' && datos.length == 1){
    eliminar(datos)
}

else{
    console.log("Comando No Valido")
}