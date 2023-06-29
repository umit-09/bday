function copyFormOutput() {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const params = new URLSearchParams();
  
  for (const [name, value] of formData.entries()) {
    params.append(name, value);
  }
  
  const mainPageURL = new URL(window.location.origin + '/main.html');
  mainPageURL.search = params.toString();
  
  const finalURL = mainPageURL.href;
  
  navigator.clipboard.writeText(finalURL).then(function() {
    console.log(finalURL);
    alert("Link copied to clipboard!\n\n" + finalURL);
  });
}
