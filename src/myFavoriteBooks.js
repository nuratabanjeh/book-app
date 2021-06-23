import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Button } from 'react-bootstrap';
import BestBooks from './components/BestBooks';
import './myFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AddBook from './components/AddBook';
class MyFavoriteBooks extends React.Component {
  state = {
    show: false,
    books: [],
  };
  componentDidMount = async () => {
    const books = await axios.get("http://localhost:3001/books",{
      params: { email: this.props.auth0.user.email },
    });
    this.setState({
      books: books.data,
    });
  };
  getNewBookData = (newBooks) => {
    this.setState({
      books: newBooks,
      show: false,
    });
  };

  deleteBook = async (bookId) => {
    const books = await axios.delete(
      `http://localhost:3001/deletebooks/${bookId}`, //** */
      { params: {email: this.props.auth0.user.email } }
    );

    this.setState({
      books:books.data
    })
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  render() {
    return (
      <Jumbotron>
        <h1>My Favourite Books</h1>
        <AddBook
          show={this.state.show}
          handleClose={this.handleClose}
          getNewBookData={this.getNewBookData}
          email={this.props.auth0.user.email}
        />
        <BestBooks deleteBook={this.deleteBook} books={this.state.books} />
        <Button variant="primary" onClick={this.handleShow}>
          Add to Favourite Books
        </Button>
      </Jumbotron>
    );
  }
  
}

export default withAuth0(MyFavoriteBooks);


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import BestBooks from './components/BestBooks';
// import './myFavoriteBooks.css';

// class MyFavoriteBooks extends React.Component {
//   render() {
//     return (
//       <Jumbotron>
//         <h1>My Favorite Books</h1>
//         <BestBooks />
//       </Jumbotron>
//     );
//   }
// }

// export default MyFavoriteBooks;