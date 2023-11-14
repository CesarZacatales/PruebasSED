const { client } = require('../config/mongoose'); // Asegúrate de que este sea el camino correcto al archivo que contiene la conexión de MongoDB.

const Post = {
  async create(postData) {
    const db = client.db('wdyt-uca');
    const newPost = {
      ...postData,
      hidden: false, // Valor predeterminado si no se proporciona
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('posts').insertOne(newPost);
    return result.ops[0];
  },
  async findOne(filter) {
    const db = client.db('wdyt-uca');
    return await db.collection('posts').findOne(filter);
  },
  async find(filter) {
    const db = client.db('wdyt-uca');
    return await db.collection('posts').find(filter).toArray();
  },
  async updateOne(postId, updateData) {
    const db = client.db('wdyt-uca');
    const result = await db.collection('posts').updateOne({ _id: postId }, { $set: updateData });
    return result;
  },
  // Agrega aquí otros métodos según sea necesario.
};

module.exports = Post;

