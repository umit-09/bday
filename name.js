function change_name(){
    const name = new URLSearchParams(window.location.search).get("name");

    text = document.getElementById('birthday-text')
    text.innerHTML = "Happy birthday!<br>" + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}