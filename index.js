const { menu, pausa, leerInput, listadoTareasCheck } = require('./helpers/menu');
const Tareas = require('./models/tareas');
const { guardarDB } = require('./app');

const principal = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                guardarDB(tareas.listadoArr, 'json'); // Guarda en JSON
                guardarDB(tareas.listadoArr.map(t => `${t.id} - ${t.desc}`).join('\n'), 'txt'); // Guarda en TXT
                console.log('Tarea creada y almacenada correctamente.');
                break;

            case '2':
                // Listar tareas
                tareas.listarTareas();
                break;

            case '3':
                // Listar tareas completadas
                tareas.listarCompletadas();
                break;

            case '4':
                // Listar tareas pendientes
                tareas.listarPendientes();
                break;

            case '5':
                // Completar tareas
                const ids = await listadoTareasCheck(tareas.listadoArr);
                tareas.completarTareas(ids);
                guardarDB(tareas.listadoArr, 'json');
                console.log('Tareas actualizadas correctamente.');
                break;

            default:
                break;
        }

        await pausa();
    } while (opt !== '0');
}

principal();
