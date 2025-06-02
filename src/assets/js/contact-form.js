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

  // Check for success parameter on page load (after Netlify redirect)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('success') && urlParams.get('success') === 'true' && statusAlert) {
    statusAlert.textContent = '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
    statusAlert.classList.remove('hidden');
    statusAlert.classList.add('text-green-600', 'bg-green-50', 'border', 'border-green-200', 'rounded-lg', 'p-4', 'mt-4');
    
    setTimeout(() => {
      statusAlert.classList.add('hidden');
    }, 10000);

    // Clear the success parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Add form submission handler ONLY for input sanitization and 'Sending...' message
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Sanitize inputs
      const formInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], textarea');
      formInputs.forEach(input => {
        if (input.name !== 'bot-field' && input.type !== 'hidden' && input.value.trim()) {
          input.value = sanitizeInput(input.value);
        }
      });

      // Show 'Sending...' message and disable button
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span><div class="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full ml-2" role="status" aria-label="loading"></div>';
      }
      
      // IMPORTANT: Do NOT call e.preventDefault() here.
      // Let the form submit normally so Netlify can process it and redirect.
    });
  }
}); 