const fs = require('fs');

let listadoPorHacer = [];

/* Funcion */
const guardarDB = () => {
    /* Objeto convertido a JSON */
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('DB/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../DB/data.json')
    } catch (error) {
        listadoPorHacer = [];
    }
}

/* Funcion */
const crear = (descripcion) => {
    /* Cargar base de datos */
    cargarDB();
    /* Objeto */
    let porHacer = {
        /* Propiedades */
        descripcion,
        completado: false
    };
    /* Mandar el Objeto */
    listadoPorHacer.push(porHacer);
    /* Ejecutar funcion de guardar archivo JSON */
    guardarDB();

    return porHacer;
}

const listar = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}