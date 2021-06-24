import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Button } from 'react-bootstrap';
import BestBooks from './components/BestBooks';
import './myFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateForm';
class MyFavoriteBooks extends React.Component {
  state = {
    show: false,
    showUpdate: false,
    books: [],
    previousBookData: {
      bookId: '',
      bookName: '',
      describtion: '',
      image: '',
    },
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
      showUpdate: false,
    });
  };
  

  deleteBook = async (bookId) => {
    const books = await axios.delete(
      `http://localhost:3001/deletebooks/${bookId}`, //** */
      { params: {email: this.props.auth0.user.email } }
      );
      
      this.setState({
        books:books.data,
      })
    };
    

  handleClose = () => this.setState({ show: false ,showUpdate: false });
  handleShow = () => this.setState({ show: true });
  handleShowUpdate = () => this.setState({ showUpdate: true });
  updateBook = (bookId, bookName, describtion, image) => {
    this.setState({
      previousBookData: {
        bookId,
        bookName,
        describtion,
        image,
      },
    });
    console.log(this.state.previousBookData);
  };
  render() {
    return (
      <Jumbotron>
      <div className="header-button">
      <h1>My Favourite Books</h1>
      <Button
        variant="primary"
        onClick={this.handleShow}
        style={{ margin: '40px 0' }}
      >
        Add to Favourite Books
      </Button>
    </div>
    <AddBook
      show={this.state.show}
      handleClose={this.handleClose}
      getNewBookData={this.getNewBookData}
      email={this.props.auth0.user.email}
    />
    {this.state.showUpdate && (
      <UpdateBook
        show={this.state.showUpdate}
        handleClose={this.handleClose}
        previousBookData={this.state.previousBookData}
        email={this.props.auth0.user.email}
        getNewBookData={this.getNewBookData}
      />
    )}
    <BestBooks
      deleteBook={this.deleteBook}
      books={this.state.books}
      updateBook={this.updateBook}
      handleShowUpdate={this.handleShowUpdate}
    />
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