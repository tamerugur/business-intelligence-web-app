const mongoose = require('mongoose');
require('dotenv').config();

// Replace with your MongoDB URL
const url = process.env.url;
const Model = require('./models/employeeModel'); // Replace with your actual model

mongoose.connect(url);

const duplicateDocuments = async () => {
  try {
    const documents = await Model.find({}).exec();
    for (const doc of documents) {
      for (let i = 0; i < 99; i++) {
        const docToInsert = doc.toObject();
        delete docToInsert._id;
        await Model.create(docToInsert);
      }
    }
    console.log('Documents duplicated successfully.');
  } catch (err) {
    console.error('Error duplicating documents:', err);
  } finally {
    mongoose.disconnect();
  }
};

duplicateDocuments();
