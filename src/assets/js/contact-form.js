// Simple, foolproof contact form success message
console.log('=== CONTACT FORM SCRIPT LOADED ===');

document.addEventListener('DOMContentLoaded', function() {
  // Check for success message immediately
  setTimeout(function() {
    showSuccessIfNeeded();
  }, 100);
  
  // Also check after page fully loads
  window.addEventListener('load', function() {
    setTimeout(function() {
      showSuccessIfNeeded();
    }, 200);
  });
});

function showSuccessIfNeeded() {
  console.log('=== CHECKING FOR SUCCESS PARAMETER ===');
  
  const urlParams = new URLSearchParams(window.location.search);
  const hasSuccess = urlParams.has('success');
  const successValue = urlParams.get('success');
  
  console.log('Current URL:', window.location.href);
  console.log('Has success param:', hasSuccess);
  console.log('Success value:', successValue);
  
  if (hasSuccess && successValue === 'true') {
    console.log('=== SUCCESS PARAMETER FOUND! SHOWING MESSAGE ===');
    
    // Find the status element
    const statusElement = document.querySelector('.status.alert');
    console.log('Status element found:', !!statusElement);
    
    if (statusElement) {
      // Show the success message
      statusElement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534;">
          <div style="font-size: 24px;">✅</div>
          <div>
            <div style="font-weight: 600; font-size: 14px; color: #166534;">Message sent successfully!</div>
            <div style="font-size: 14px; color: #16a34a; margin-top: 4px;">Thank you for reaching out! I'll get back to you within 24 hours.</div>
          </div>
        </div>
      `;
      
      // Make it visible
      statusElement.style.display = 'block';
      statusElement.classList.remove('hidden');
      
      console.log('=== SUCCESS MESSAGE DISPLAYED ===');
      
      // Auto-hide after 10 seconds
      setTimeout(function() {
        statusElement.style.display = 'none';
        statusElement.classList.add('hidden');
        console.log('=== SUCCESS MESSAGE HIDDEN ===');
      }, 10000);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      console.log('=== URL CLEANED ===');
    } else {
      console.error('=== STATUS ELEMENT NOT FOUND ===');
      
      // Create our own success message
      const successDiv = document.createElement('div');
      successDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; align-items: center; gap: 12px; padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="font-size: 24px;">✅</div>
          <div>
            <div style="font-weight: 600; font-size: 14px; color: #166534;">Message sent successfully!</div>
            <div style="font-size: 14px; color: #16a34a; margin-top: 4px;">Thank you for reaching out! I'll get back to you within 24 hours.</div>
          </div>
        </div>
      `;
      
      document.body.appendChild(successDiv);
      console.log('=== CREATED FALLBACK SUCCESS MESSAGE ===');
      
      // Auto-hide after 10 seconds
      setTimeout(function() {
        successDiv.remove();
        console.log('=== FALLBACK MESSAGE REMOVED ===');
      }, 10000);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } else {
    console.log('=== NO SUCCESS PARAMETER FOUND ===');
  }
}

// Form submission handling (optional - for better UX)
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    console.log('=== CONTACT FORM FOUND ===');
    
    contactForm.addEventListener('submit', function(e) {
      console.log('=== FORM SUBMITTED ===');
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '⏳ Sending...';
        console.log('=== LOADING STATE SHOWN ===');
      }
      
      // Let the form submit naturally to Netlify
      return true;
    });
  } else {
    console.log('=== CONTACT FORM NOT FOUND ===');
  }
}); 