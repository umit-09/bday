function copyFormOutput() {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const params = new URLSearchParams();
  
  for (const [name, value] of formData.entries()) {
    params.append(name, value);
  }
  
  const baseURL = window.location.origin + '/bday';
  const mainPageURL = '/main.html';
  const queryParams = params.toString();
  
  const finalURL = `${baseURL}${mainPageURL}${queryParams ? `?${queryParams}` : ''}`;
  
  navigator.clipboard.writeText(finalURL).then(function() {
    console.log(finalURL);
    alert("Link copied to clipboard!\n\n" + finalURL);
  });
}
