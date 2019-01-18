import { Router } from 'express';
import todosModel from '../models/todos';

const router = Router();

router.get('/', (req, res) => {
  todosModel.find( (err, todos) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Internal error');
    }

    return res.json(todos);
  });
});

router.post('/', (req, res) => {
  const todo = new todosModel(req.body);
  todo.save()
    .then(todo => {
      return res.status(201).json({'todo': 'item added successfully'});
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send("Wrong data");
    });
});

router.put('/:name', (req, res, next) => {
  todosModel.findOneAndUpdate({name: req.params.name}, req.body, {new: true}, (err, todo) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Internal error');
    }

    return res.status(200).send(todo);
  });

  return res.status(204);
});

router.delete('/:name', (req, res) => {
  todosModel.findOneAndDelete({name: req.params.name}, (err, todo) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Internal error');
    }

    if (!todo) {
      return res.status(404).send("Not found");
    }

    return res.status(204);
  });
});

export default router;
