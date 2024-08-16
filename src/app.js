document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.moving-image');
    let index = 0;

    function showNextImage() {
        if (index > 0) {
            images[index - 1].style.opacity = '0';
        }
        
        images[index].style.opacity = '1';
        index = (index + 1) % images.length; 
        
        setTimeout(showNextImage, 4000);
    }

    showNextImage();
});

document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = '#00cc99';
    });
    link.addEventListener('mouseout', () => {
        link.style.color = 'white';
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const feedback = { name, email, message };

    fetch('/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback)
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your message!');
            document.getElementById('contact-form').reset();
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('There was a network error. Please try again.');
    });
});
