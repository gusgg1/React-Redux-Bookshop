"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Panel, Well, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [{}],
      img: ''
    }
  }

  componentDidMount() {
    this.props.getBooks();
    // get images from API
    axios.get('/api/images')
      .then(res => {
        this.setState({ images: res.data });
      })
      .catch(err => {
        this.setState({ images: 'error loading image files from the server', img: '' });
      });
  }

  handleSubmit = () => {
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images: findDOMNode(this.refs.images).value,
      price: findDOMNode(this.refs.price).value, 
    }];
    this.props.postBooks(book);
  }

  onDelete = () => {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBooks(bookId);
  }

  handleSelect = (img) => {
    this.setState({
      img: '/images/' + img
    });
  }

  resetForm = () => {
    this.props.resetButton();
    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({ img: '' });
  }

  render() {
    const bookList = this.props.books.map(booksArr => {
      return (
        <option key={booksArr._id}>{booksArr._id}</option>
      )
    });

    const imgList = this.state.images.map((imgArr, i) => {
      return(
        <MenuItem 
          key={i} 
          eventKey={imgArr.name}
          onClick={() => this.handleSelect(imgArr.name)} >
        {imgArr.name}</MenuItem>
      )
    });

    return(
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type='text' ref='images' value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id='input-dropdown-addon'
                  title='Select an image'
                  bsStyle='primary'
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId='title' validationState={this.props.validation}>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder='Enter Title'
                  ref='title' />
                <FormControl.Feedback/>
              </FormGroup>

              <FormGroup controlId='description' validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder='Enter Description'
                  ref='description'/>
                <FormControl.Feedback/>
              </FormGroup>

              <FormGroup controlId='price' validationState={this.props.validation}>
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder='Enter Price'
                  ref='price'/>
                <FormControl.Feedback/>
              </FormGroup>
              <Button 
                onClick={!this.props.msg ? this.handleSubmit : this.resetForm} 
                bsStyle={!this.props.style ? 'primary' : this.props.style}>
                {!this.props.msg ? 'Save book' : this.props.msg}
              </Button>
              <hr/>
              <FormGroup controlId="formControlsSelect" style={{marginTop: '15px'}}>
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl ref='delete' componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  {bookList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete} bsStyle='danger'>Delete book</Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postBooks, 
    deleteBooks, 
    getBooks,
    resetButton
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
