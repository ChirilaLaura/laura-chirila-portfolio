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
    statusAlert.innerHTML = message;
    
    // Clear previous classes
    statusAlert.classList.remove('text-green-600', 'bg-green-50', 'border-green-200', 
                                 'text-red-600', 'bg-red-50', 'border-red-200',
                                 'transform', 'scale-95', 'opacity-0');
    
    if (isSuccess) {
      statusAlert.classList.add('text-green-600', 'bg-green-50', 'border', 'border-green-200', 'rounded-lg', 'p-4', 'mt-4', 'shadow-sm', 'transform', 'transition-all', 'duration-500', 'ease-out');
      
      // Add slide-in animation
      statusAlert.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        statusAlert.classList.remove('scale-95', 'opacity-0');
        statusAlert.classList.add('scale-100', 'opacity-100');
      }, 10);
    } else {
      statusAlert.classList.add('text-red-600', 'bg-red-50', 'border', 'border-red-200', 'rounded-lg', 'p-4', 'mt-4', 'shadow-sm', 'transform', 'transition-all', 'duration-500', 'ease-out');
      
      // Add slide-in animation
      statusAlert.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        statusAlert.classList.remove('scale-95', 'opacity-0');
        statusAlert.classList.add('scale-100', 'opacity-100');
      }, 10);
    }
    
    // Auto-hide with fade-out animation
    setTimeout(() => {
      statusAlert.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        statusAlert.classList.add('hidden');
      }, 500);
    }, 8000);
  }

  // Check for success parameter on page load (after Netlify redirect)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('success') && urlParams.get('success') === 'true') {
    showStatusMessage(`
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-medium text-green-800">Message sent successfully!</h3>
          <p class="text-sm text-green-700 mt-1">Thank you for reaching out! I'll get back to you within 24 hours.</p>
        </div>
      </div>
    `, true);
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
          submitButton.innerHTML = `
            <div class="flex items-center justify-center gap-2">
              <div class="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></div>
              <span>Sending your message...</span>
            </div>
          `;
          submitButton.classList.add('opacity-90', 'cursor-not-allowed');
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
              submitButton.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                  <div class="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></div>
                  <span>Sending your message...</span>
                </div>
              `;
              submitButton.classList.add('opacity-90', 'cursor-not-allowed');
            }
            
            // Let Netlify handle the form submission
            return true;
          }
        });
      }
    }
  });
}); 