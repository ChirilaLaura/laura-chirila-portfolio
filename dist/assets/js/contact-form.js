function showSuccessIfNeeded(){console.log("=== CHECKING FOR SUCCESS PARAMETER ===");var e=new URLSearchParams(window.location.search),o=e.has("success"),e=e.get("success");if(console.log("Current URL:",window.location.href),console.log("Has success param:",o),console.log("Success value:",e),o&&"true"===e){console.log("=== SUCCESS PARAMETER FOUND! SHOWING MESSAGE ===");let e=document.querySelector(".status.alert");if(console.log("Status element found:",!!e),e)e.innerHTML=`
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534;">
          <div style="font-size: 24px;">✅</div>
          <div>
            <div style="font-weight: 600; font-size: 14px; color: #166534;">Message sent successfully!</div>
            <div style="font-size: 14px; color: #16a34a; margin-top: 4px;">Thank you for reaching out! I'll get back to you within 24 hours.</div>
          </div>
        </div>
      `,e.style.display="block",e.classList.remove("hidden"),console.log("=== SUCCESS MESSAGE DISPLAYED ==="),setTimeout(function(){e.style.display="none",e.classList.add("hidden"),console.log("=== SUCCESS MESSAGE HIDDEN ===")},1e4),window.history.replaceState({},document.title,window.location.pathname),console.log("=== URL CLEANED ===");else{console.error("=== STATUS ELEMENT NOT FOUND ===");let e=document.createElement("div");e.innerHTML=`
        <div style="position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; align-items: center; gap: 12px; padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="font-size: 24px;">✅</div>
          <div>
            <div style="font-weight: 600; font-size: 14px; color: #166534;">Message sent successfully!</div>
            <div style="font-size: 14px; color: #16a34a; margin-top: 4px;">Thank you for reaching out! I'll get back to you within 24 hours.</div>
          </div>
        </div>
      `,document.body.appendChild(e),console.log("=== CREATED FALLBACK SUCCESS MESSAGE ==="),setTimeout(function(){e.remove(),console.log("=== FALLBACK MESSAGE REMOVED ===")},1e4),window.history.replaceState({},document.title,window.location.pathname)}}else console.log("=== NO SUCCESS PARAMETER FOUND ===")}console.log("=== CONTACT FORM SCRIPT LOADED ==="),document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){showSuccessIfNeeded()},100),window.addEventListener("load",function(){setTimeout(function(){showSuccessIfNeeded()},200)})}),document.addEventListener("DOMContentLoaded",function(){let t=document.getElementById("contact-form");t?(console.log("=== CONTACT FORM FOUND ==="),t.addEventListener("submit",function(e){console.log("=== FORM SUBMITTED ===");var o=t.querySelector('button[type="submit"]');return o&&(o.disabled=!0,o.innerHTML="⏳ Sending...",console.log("=== LOADING STATE SHOWN ===")),!0})):console.log("=== CONTACT FORM NOT FOUND ===")});