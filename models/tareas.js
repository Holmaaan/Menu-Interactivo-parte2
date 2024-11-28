const Tarea = require('../models/tarea');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea); 
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    // Crear tarea
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    // Listar tareas
    listarTareas() {
        console.log('\n' + '=== Listado de Tareas ==='.green);
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    // Listar tareas completadas
    listarCompletadas() {
        console.log('\n' + '=== Tareas Completadas ==='.green);
        this.listadoArr.filter(t => t.completadoEn).forEach((tarea, index) => {
            const idx = `${index + 1}.`.green;
            console.log(`${idx} ${tarea.desc} :: ${tarea.completadoEn}`);
        });
    }

    // Listar tareas pendientes
    listarPendientes() {
        console.log('\n' + '=== Tareas Pendientes ==='.red);
        this.listadoArr.filter(t => !t.completadoEn).forEach((tarea, index) => {
            const idx = `${index + 1}.`.red;
            console.log(`${idx} ${tarea.desc}`);
        });
    }

    // Completar tareas
    completarTareas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                tarea.completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
