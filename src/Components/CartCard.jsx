import React, { useState } from 'react'
import '../Components/CartCard.css'
import { baseUrl } from '../services/baseUrl'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRipple
} from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap';

function CartCard({product}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <div>
      <MDBCard style={{width:'250px',height:'350px',backgroundColor:'beige'}} onClick={handleShow} className='m-3 p-3'>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={product?`${baseUrl}/uploads/${product.cartImage}`:"empty image"} fluid alt='...' style={{width:'250',height:'300px'}}/>
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle><b>{product.brand}</b></MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.brand}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <img src={product?`${baseUrl}/uploads/${product.cartImage}`:"empty image"} width={'100%'} alt="" />
                </Col>
                <Col>
                <h3><b>Brand:</b> {product.brand}</h3>
                <hr/>
                <p><b>Title:</b> {product.title}</p>
                <p><b>Price:</b> {product.price}</p>
                <p><b>Size:</b> {product.size}</p>
                <p><b>Quantity:</b> {product.quantity}</p>
                <p><b>Description:</b> {product.description}</p>
                </Col>
            </Row>
        </Modal.Body>
      </Modal>
      </div>
 
  )
}

export default CartCard