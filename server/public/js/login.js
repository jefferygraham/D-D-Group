window.onload = () => {
  document.getElementById('submit').onclick = login;
  //.addEventListenter('click', login);
};

function login() {
  let user = document.getElementById('username').value;
  console.log(user);
  let pass = document.getElementById('password').value;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    console.log(xhttp.readyState);
    console.log(xhttp.status);
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      document.getElementById('username').innerHTML = xhttp.response;
    }
  };
  xhttp.open('POST', '/users');
  // by default a post request is going to send the data with a header indicating that the data is a JSON.
  // For this example, we want the data to be form encoded (because that's what the server is expecting)

  // xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  // xhttp.send(`username=${user}&password=${pass}`); // post request will have data in the body.
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify({ username: user, password: pass }));
}
