import SingleBook from '../SingleBook/SingleBook';
import classes from './Book.module.scss';

const Book = ({ books = [] }) => {
  const mappedBooks = books.map(book => {
    return (
      <SingleBook
        key={book._id}
        user={book.user.username}
        image={book.image}
        title={book.title}
        precio={book.precio}
      />
    );
  })

  return (
    <section className={classes["container"]} >
 
      <article className={classes["section-cards-books"]}>
        {mappedBooks}
      </article>

    </section>
  );
}

export default Book;