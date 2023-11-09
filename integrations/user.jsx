export const fetchAPI = async (username, email, password) => {
    const url = "http://192.168.70.107:7269/api/Auth/SignUp";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "username": username,
      "email": email,
      "password": password
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(url, requestOptions);
      const result = await response.text();
      return JSON.parse(result) // Maneja la respuesta aquí
    } catch (error) {
      return ('Error:',error) // Maneja el error aquí
    }
  };
  