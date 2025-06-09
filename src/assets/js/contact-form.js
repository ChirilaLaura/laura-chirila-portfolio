document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const statusAlert = document.querySelector('.status.alert');

  // Helper function to sanitize inputs
  function sanitizeInput(input) {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Show status message
  function showStatusMessage(message, isSuccess = true) {
    if (!statusAlert) return;
    
    statusAlert.classList.remove('hidden');
    statusAlert.textContent = message;
    
    // Clear previous classes
    statusAlert.classList.remove('text-green-600', 'bg-green-50', 'border-green-200', 
                                 'text-red-600', 'bg-red-50', 'border-red-200');
    
    if (isSuccess) {
      statusAlert.classList.add('text-green-600', 'bg-green-50', 'border', 'border-green-200', 'rounded-lg', 'p-4', 'mt-4');
    } else {
      statusAlert.classList.add('text-red-600', 'bg-red-50', 'border', 'border-red-200', 'rounded-lg', 'p-4', 'mt-4');
    }
    
    setTimeout(() => {
      statusAlert.classList.add('hidden');
    }, 8000);
  }

  // Check for success parameter on page load (after Netlify redirect)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('success') && urlParams.get('success') === 'true') {
    showStatusMessage('✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!', true);
    // Clear the success parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Check if this is a Netlify form
      const isNetlifyForm = contactForm.hasAttribute('data-netlify');
      
      if (isNetlifyForm) {
        // For Netlify forms, just sanitize inputs and show loading state
        // Let the form submit naturally to Netlify
        
        // Sanitize inputs
        const formInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], textarea');
        formInputs.forEach(input => {
          if (input.name !== 'bot-field' && input.type !== 'hidden' && input.value.trim()) {
            input.value = sanitizeInput(input.value);
          }
        });

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerHTML = '<span>Sending...</span><div class="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full ml-2" role="status" aria-label="loading"></div>';
        }
        
        // Do NOT prevent default - let Netlify handle the form
        return true;
      }
    });
  }

  // Prevent any other scripts from interfering with form submission
  window.addEventListener('load', function() {
    // Remove any other form event listeners that might conflict
    if (contactForm) {
      // Clone the form to remove all other event listeners
      const newForm = contactForm.cloneNode(true);
      contactForm.parentNode.replaceChild(newForm, contactForm);
      
      // Re-add our form handler to the new form
      const finalForm = document.getElementById('contact-form');
      if (finalForm) {
        finalForm.addEventListener('submit', function(e) {
          const isNetlifyForm = finalForm.hasAttribute('data-netlify');
          
          if (isNetlifyForm) {
            // Sanitize inputs
            const formInputs = finalForm.querySelectorAll('input[type="text"], input[type="email"], textarea');
            formInputs.forEach(input => {
              if (input.name !== 'bot-field' && input.type !== 'hidden' && input.value.trim()) {
                input.value = sanitizeInput(input.value);
              }
            });

            // Show loading state
            const submitButton = finalForm.querySelector('button[type="submit"]');
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.innerHTML = '<span>Sending...</span><div class="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full ml-2" role="status" aria-label="loading"></div>';
            }
            
            // Let Netlify handle the form submission
            return true;
          }
        });
      }
    }
  });
}); 