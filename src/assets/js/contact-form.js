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
  if (urlParams.has('success') && statusAlert) {
    // Show success message
    statusAlert.textContent = '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
    statusAlert.classList.remove('hidden');
    statusAlert.classList.add('text-green-600', 'bg-green-50', 'border', 'border-green-200', 'rounded-lg', 'p-4', 'mt-4');
    
    // Hide the message after 10 seconds
    setTimeout(() => {
      statusAlert.classList.add('hidden');
    }, 10000);

    // Clear the URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
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
        submitButton.innerHTML = '<span>Sending...</span><div class="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full ml-2" role="status" aria-label="loading"></div>';
        
        // Reset button after 3 seconds in case the page doesn't redirect immediately
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }, 3000);
      }
    });
  }
}); 