const { MongoClient } = require('mongodb');
const debug = require('debug')('app:mongodb');

const dbhost = process.env.DBHOST || 'localhost';
const dbport = process.env.DBPORT || '27017';
const dbname = process.env.DBNAME || 'wdyt-uca';

// Usando las variables dbhost y dbport.
const dburi = `mongodb://${dbhost}:${dbport}/${dbname}`;

const client = new MongoClient(dburi);

const connect = async () => {
  try {
    await client.connect();
    debug('Conexión a la base exitosa');
    console.log('Conectado a la base')
    return client.db(dbname); // Esto es útil si deseas usar la instancia de la base de datos directamente
  } catch (error) {
    debug('Error en la conexión de la base:', error);
    // Manejar el error adecuadamente, por ejemplo, intentando reconectar
    // process.exit(1); // Considera eliminar esto y manejar la reconexión o terminar la aplicación de manera más controlada
  }
};

module.exports = {
  connect,
  client // Exporta el cliente si necesitas usarlo directamente en otros archivos
};
