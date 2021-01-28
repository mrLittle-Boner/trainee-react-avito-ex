# Hello :wave:

Here is a little test exercise from [avito](https://github.com/avito-tech/safedeal-frontend-trainee) for trainee developers(react js).
All code written by me ofcourse.

## About app
This app getg images from server :

```javascript
useEffect(() => {
fetch('https://boiling-refuge-66454.herokuapp.com/images')
  .then(response => response.json())
  .then(data => setImages(data));
}, []);
```

and render it :
```jsx
<main>
  {images.map(image => 
    <div key={image.id}>
      <img src={image.url} alt='' onClick={() => {
      setIsModalOpen(true);
      setTargetImageId(image.id);
      }}/>
    </div>)}
</main>
```

Common look of app :<br/>
<img width='300px' height='300px'  src='https://i.ibb.co/BgBbPQB/avito-images-main.jpg' />

Each image is clickable.It opens modal window which contains comments and a form to leave a comment:<br/>
<img width='300px' height='300px'  src='https://i.ibb.co/9NwFFdt/avito-images-modal.jpg' />

Modal component take id from image u clicked one and loads a new data such as(id, url and comments)

```javascript
useEffect(() => {
  fetch('https://boiling-refuge-66454.herokuapp.com/images/' + id)
    .then(response => response.json())
    .then(data => {
      setComments(data.comments);
      setUrl(data.url);
    });
}, [id]);
```

This little guy handle comments if it is an empty array he renders a plain text like : This image has no comments(looks  bad but works):

```javascript
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
```

Form in modal window is also working driven by react(“controlled component”) but it has no any response from server. You can look at network tab browser devtools

### post scriptum
I realize it is a simple app and my code is not so good(:poop:) , but i am learning and want to create a cool things.
<br/>
Thanks for your attention.

Have a nice day! :wave:


