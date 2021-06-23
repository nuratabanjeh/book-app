import React from 'react';
import {Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class BestBooks extends React.Component {



  render() {
    return this.props.books.map((item, index) => {
      return (
        <Card style={{ width: '18rem' }} key={index}>
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.bookName}</Card.Title>
            <Card.Text>{item.describtion}</Card.Text>
            <Button onClick={()=>this.props.deleteBook(item._id)} variant="danger">Delete</Button>
          </Card.Body>
        </Card>
      );
    });
  }
}
export default BestBooks;

// import React from 'react';
// import axios from 'axios';
// import { withAuth0 } from '@auth0/auth0-react';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// class BestBooks extends React.Component {
//   state = {
//     books: [],
//   };
//   componentDidMount = async () => {
//     const books = await axios.get("http://localhost:3001", {
//       params: { userEmail: this.props.auth0.user.email },
//     });
//     this.setState({
//       books: books.data,
//     });
//   };
//   render() {
//     return this.state.books.map((item) => {
//       return (
//         <>
//           <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src={item.image} />
//             <Card.Body>
//               <Card.Title>{item.bookName}</Card.Title>
//               <Card.Text>{item.describtion}</Card.Text>
//             </Card.Body>
//           </Card>
//         </>
//       );
//     });
//   }
// }
// export default withAuth0(BestBooks);