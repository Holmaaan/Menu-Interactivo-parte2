var colors = require('colors');
const inquirer = require('inquirer').default;

// Preguntas del menú
const preguntas = [
    {
        type: 'list',
        name: 'options',
        message: '¿Qué quieres hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.red} Crear tarea`,
            },
            {
                value: '2',
                name: `${'2.'.red} Listar tareas`,
            },
            {
                value: '3',
                name: `${'3.'.red} Listar tareas completas`,
            },
            {
                value: '4',
                name: `${'4.'.red} Listar tareas pendientes`,
            },
            {
                value: '5',
                name: `${'5.'.red} Completar tarea(s)`,
            },
            {
                value: '6',
                name: `${'6.'.red} Borrar tarea`,
            },
            {
                value: '0',
                name: `${'0.'.red} Salir`,
            }
        ]
    }
];

// Función principal del menú
const menu = async () => {
    console.clear();
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.green}`);
    console.log(`${'           First Application'.white}`);
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.green}`);

    const { options } = await inquirer.prompt(preguntas);
    return options;
}

// Función de pausa
const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'Enter'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
}

// Función para leer el input de la descripción
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

// Función para mostrar tareas y permitir seleccionar las completadas
const listadoTareasCheck = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const idx = `${index + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: !!tarea.completadoEn
        };
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas a completar:',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    menu,
    pausa,
    leerInput,
    listadoTareasCheck
};
