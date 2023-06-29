function copyFormOutput() {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const params = new URLSearchParams();
  
  for (const [name, value] of formData.entries()) {
    params.append(name, value);
  }
  
  const currentURL = new URL(window.location.href);
  currentURL.search = params.toString();
  
  navigator.clipboard.writeText(currentURL.href).then(function() {
    console.log(currentURL.href);
    alert("Link copied to clipboard!\n\n"+currentURL.href);
  });
}
