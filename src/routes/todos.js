import { Router } from 'express';
import todosModel from '../models/todos';

const router = Router();

router.get('/', (req, res) => {
  todosModel.find( (err, todos) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(todos);
  });
});

router.get('/:id', (req, res) => {
  todosModel.findById(req.params.id, (err, todos) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(todos);
  });
});

router.post('/', (req, res) => {
  const todo = new todosModel(req.body);
  todo.save()
    .then(todo => {
      return res.status(201).json(todo);
    })
    .catch(err => {
      return res.status(400).json(err);
    });
});

router.put('/:id', (req, res, next) => {
  todosModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true}, (err, todo) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(todo);
  });
});

router.delete('/:id', (req, res) => {
  todosModel.findByIdAndDelete(req.params.id, (err, todo) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (!todo) {
      return res.status(404).json("Not found");
    }

    return res.status(204).json("Deleted");
  });
});

export default router;
