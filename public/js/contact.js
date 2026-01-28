// Contact Form Handler
function handleContactForm(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Simulate form submission
  console.log('Contact form submitted:', {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  });

  // Show success message
  const statusElement = document.getElementById('form-status');
  statusElement.textContent = 'Thank you! We\'ll get back to you shortly.';
  statusElement.style.color = '#27ae60';
  statusElement.style.display = 'block';

  // Reset form
  form.reset();

  // Hide message after 5 seconds
  setTimeout(() => {
    statusElement.style.display = 'none';
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', handleContactForm);
  }
});
