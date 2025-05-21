const form = document.getElementById('contactForm');
const spinner = document.getElementById('spinner');
const responseMessage = document.getElementById('responseMessage');
const submitBtn = document.getElementById('submitBtn');

// Validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
  responseMessage.style.display = 'none';

  // Form values
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let hasError = false;
  if (!name) {
    document.getElementById('nameError').style.display = 'block';
    hasError = true;
  }
  if (!email || !validateEmail(email)) {
    document.getElementById('emailError').style.display = 'block';
    hasError = true;
  }
  if (!message) {
    document.getElementById('messageError').style.display = 'block';
    hasError = true;
  }

  if (hasError) return;

  // Disable button and show spinner
  submitBtn.disabled = true;
  spinner.style.display = 'inline-block';

  const data = { name, email, message };

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      responseMessage.textContent = 'Message sent successfully!';
      responseMessage.className = 'response-message success';
      responseMessage.style.display = 'block';
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (error) {
    responseMessage.textContent = 'Failed to send message. Please try again later.';
    responseMessage.className = 'response-message error';
    responseMessage.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    spinner.style.display = 'none';
  }
});
