document.addEventListener('scroll',()=>{
  const header = document.querySelector('header');
   
  if(window.scrollY>0){
    header.classList.add('scrolled');
  }
  else{
    header.classList.remove('scrolled');
  }
  }
);
const scriptURL = 'https://script.google.com/macros/s/AKfycbydA7-R6Fk4a_WxlKbsQ9p4rNaLWsAxH6-D5_3eZZEV380W6Coa0UXgSaRtjnrNUzkRZQ/exec';
const form = document.getElementById('contactForm');
const popup = document.getElementById('popup');

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            showPopup("Message sent successfully!");
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            showPopup("Error sending message. Please try again.");
        })
        .finally(() => {
            submitButton.disabled = false;
        });
});

function showPopup(message) {
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 5000);
}