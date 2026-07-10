import { books } from '../../data/books';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(books);
      break;
    case 'POST':
      const book = req.body;
      books.push(book);
      res.status(201).json(book);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
