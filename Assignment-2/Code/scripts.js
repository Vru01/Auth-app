document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const detailsButtons = document.querySelectorAll('.details-btn');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    detailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const detailsContent = this.nextElementSibling;
            if (detailsContent.style.display === 'none' || detailsContent.style.display === '') {
                detailsContent.style.display = 'block';
                this.textContent = 'Hide Details';
            } else {
                detailsContent.style.display = 'none';
                this.textContent = 'Show Details';
            }
        });
    });
});
