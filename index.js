function copyFormOutput() {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const params = new URLSearchParams();
  
    for (const [name, value] of formData.entries()) {
      params.append(name, value);
    }
  
    const formOutput = window.location.origin + '/main.html?' + params.toString();
    navigator.clipboard.writeText(formOutput).then(function (){
        console.log(formOutput);
        alert("Link copied to clipboard!");
    });
}
  