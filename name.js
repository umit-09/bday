function change_name(){
    const name = new URLSearchParams(window.location.search).get("name");
    const message = new URLSearchParams(window.location.search).get("text");
    const link = new URLSearchParams(window.location.search).get("link");

    text = document.getElementById('birthday-text')
    text.innerHTML = message + "<br>" + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    console.log(String(link) == "https://example.com");
    if (String(link) == "https://example.com"){
        document.getElementById("rainbow-button").style.display = "none";
    }
    else {
        if (!link.startsWith("https://")) {
            corrected_link = "https://" + link;
            document.getElementById("rainbow-button").style.display = "block";
            document.getElementById("rainbow-button").href = corrected_link;
        }
        else {
            document.getElementById("rainbow-button").style.display = "block";
            document.getElementById("rainbow-button").href = link;
        }
    }

    const urlWithoutParams = window.location.href.split('?')[0];
    history.replaceState({}, document.title, urlWithoutParams);
}
  