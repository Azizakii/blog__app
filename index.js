let posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 1000;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-share-btn');
const postsNode = document.querySelector('.posts');
const validationMessage = document.querySelector('#validationMessage')


newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts ();
})


postTitleInputNode.addEventListener('input', function () {
    validation();
    btnDisabled();
} )

postTextInputNode.addEventListener('input', function () {
    validation();
    btnDisabled();
} )

function validation () {
    const titleLength = postTitleInputNode.value.length;
    const textLength = postTextInputNode.value.length;

    if (titleLength > TITLE_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длина заголовка недолжна превышать ${TITLE_VALIDATION_LIMIT} символов`
        validationMessage.classList.remove('validationMessage__hidden') 
        return;
    }
    if (textLength > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длина текста недолжна превышать ${TEXT_VALIDATION_LIMIT} символов`
        validationMessage.classList.remove('validationMessage__hidden') 
        return;
    }
    validationMessage.classList.add('validationMessage__hidden')

}

function btnDisabled () {
    const titleLength = postTitleInputNode.value.length;
    const textLength = postTextInputNode.value.length;

    if (titleLength > TITLE_VALIDATION_LIMIT || textLength > TEXT_VALIDATION_LIMIT) {
        newPostBtnNode.setAttribute('disabled', 'true');
    } else {
        newPostBtnNode.removeAttribute('disabled')
    }
} 




function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;
    
    return {
        title: title,
        text: text,
        time: new Date().toLocaleString()
    };
}

function addPost({title, text, time}) {
    posts.push ({
        title,
        text, 
        time
    })

}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
            <div class="post">
                <p class ="post__time">${post.time}</p>
                <p class ="post__title">${post.title}</p>
                <p class ="post__text">${post.text}</p>
            </div>
        `
    });

    postsNode.innerHTML = postsHTML;
}


