import './App.css';
import React, { useState, useEffect } from 'react';

const Header = () => <header>"Amazing" React App</header>;

const Footer = () => <footer>&copy; 2021</footer>;

const Loader = () => <div className="lds-dual-ring"></div>;

const Modal = ({ id, handleClose }) => {
  const [comments, setComments] = useState([]);
  const [url, setUrl] = useState('https://via.placeholder.com/600x400.png');
  const [nameValue, setNameValue] = useState('');
  const [commentValue, setCommentValue] = useState('');

  useEffect(() => {
    fetch('https://boiling-refuge-66454.herokuapp.com/images/' + id)
      .then(response => response.json())
      .then(data => {
        setComments(data.comments);
        setUrl(data.url);
      });
  }, [id]);

  const formatedDate = date => {
    return new Date(date).toLocaleDateString();
  }

  const cummentOff = (e) => {
    e.preventDefault();
    if (commentValue && nameValue) {
      fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: nameValue,
          comment: commentValue,
        })
      })
    }
  };

  return (
    <div className='modal'>
      <div className='modal__container'>
        <div className='modal__image'>
          <img src={url} alt='' />
        </div>
        <div className='modal__content'>
          <form onSubmit={e => cummentOff(e)}>
            <input type='text' value={nameValue} placeholder='Ваше имя' onChange={(e) => setNameValue(e.target.value)} required />
            <input type='text' value={commentValue} placeholder='Ваш комментарий' onChange={(e) => setCommentValue(e.target.value)} required />
            <button className='comment__send' type='submit'>Cumment off</button>
          </form>
        </div>
        <ul className='comments'>
          {comments.length === 0
            ? <div>Под этой фотографией пока нет комментариев</div>
            : comments.map(comment => {
              return (
                <li className='comment' key={comment.id}>
                  <div className='comment__date'>{formatedDate(comment.date)}</div>
                  <div className='comment__text'>{comment.text}</div>
                </li>
              );
            })}
        </ul>
        <button type='button' className='modal__close' onClick={() => handleClose()}></button>
      </div>
    </div >
  )
};

function App() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [targetImageId, setTargetImageId] = useState(0);

  useEffect(() => {
    fetch('https://boiling-refuge-66454.herokuapp.com/images')
      .then(response => response.json())
      .then(data => setImages(data));

    setIsLoading(false);
  }, []);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      {isLoading && <Loader />}
      <main>
        {images.map(image => <div key={image.id} ><img src={image.url} alt='' onClick={() => {
          setIsModalOpen(true);
          setTargetImageId(image.id);
        }} /></div>)}
      </main>
      {isModalOpen && <Modal id={targetImageId} handleClose={closeModal} />}
      <section></section>
      <Footer />
    </>
  );
}

export default App;
