const Task = require('../model/task');
require('../db/mongoose');

// Task.findByIdAndRemove('61d8b91a8b9aaeed27f900ca')
//   .then((result) => {
//     console.log(result);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });

const deleteTaskAndCount = async (id) => {
  const taskRemoved = await Task.findByIdAndRemove(id);
  const documentsCount = await Task.countDocuments({ completed: false });
  return documentsCount;
};

deleteTaskAndCount('61d8b8fd8b9aaeed27f900c8')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
