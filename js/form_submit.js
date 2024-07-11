document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      const formProps = Object.fromEntries(formData);
  
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new URLSearchParams(formProps),
        });
  
        if (response.ok) {
          const result = await response.json();
          const successMessage = document.getElementById('success-message');
          if (result.status === 'success') {
            successMessage.textContent = result.message;
            form.reset();
            setTimeout(() => {
              successMessage.textContent = '';
            }, 2000); // Clear message after 2 seconds
          } else {
            successMessage.textContent = 'Failed to submit the form.';
            setTimeout(() => {
              successMessage.textContent = '';
            }, 2000); // Clear message after 2 seconds
          }
        } else {
          const successMessage = document.getElementById('success-message');
          successMessage.textContent = 'Failed to submit the form.';
          setTimeout(() => {
            successMessage.textContent = '';
          }, 2000); // Clear message after 2 seconds
        }
      } catch (error) {
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'An error occurred: ' + error.message;
        setTimeout(() => {
          successMessage.textContent = '';
        }, 2000); // Clear message after 2 seconds
      }
    });
  });
  