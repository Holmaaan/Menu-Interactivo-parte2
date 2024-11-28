const fs = require('fs');
const path = require('path');

// Función para guardar tareas en un archivo
function guardarDB(data, formato = 'json') {
    const dir = './data';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const filePath = path.join(dir, `tareas.${formato}`);
    const contenido = formato === 'json' ? JSON.stringify(data, null, 2) : data;

    fs.writeFileSync(filePath, contenido, 'utf8');
}

module.exports = {
    guardarDB
};
