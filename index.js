function copyFormOutput() {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const params = new URLSearchParams();
  
  for (const [name, value] of formData.entries()) {
    params.append(name, value);
  }
  
  const mainPageURL = new URL(window.location.origin + '/main.html');
  mainPageURL.search = params.toString();
  
  navigator.clipboard.writeText(mainPageURL.href).then(function() {
    console.log(mainPageURL.href);
    alert("Link copied to clipboard!\n\n" + mainPageURL.href);
  });
}
