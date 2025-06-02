document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const statusAlert = document.querySelector('.status.alert');

  // Helper function to sanitize inputs
  function sanitizeInput(input) {
    // Convert special characters to HTML entities
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Check if we're on a success page (Netlify redirect after form submission)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('form-success') && statusAlert) {
    // Show success message
    statusAlert.textContent = 'Thank you! Your message has been sent successfully.';
    statusAlert.classList.remove('hidden');
    statusAlert.classList.add('text-green-500');
    
    // Hide the message after 5 seconds
    setTimeout(() => {
      statusAlert.classList.add('hidden');
    }, 5000);
  }

  // Add form submission handler for visual feedback and sanitization
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Sanitize all inputs before submission
      const formInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], textarea');
      formInputs.forEach(input => {
        // Skip honeypot field and hidden inputs
        if (input.name !== 'bot-field' && input.type !== 'hidden') {
          // Only sanitize if the input has a value
          if (input.value.trim()) {
            // Store the original value for reference (optional)
            input.dataset.originalValue = input.value;
            // Apply sanitization
            input.value = sanitizeInput(input.value);
          }
        }
      });

      // Show a temporary "sending" message
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span>';
        
        // Reset button after 2 seconds in case the page doesn't redirect immediately
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }, 2000);
      }
    });
  }
}); 