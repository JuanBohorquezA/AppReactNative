const fs = require('fs');
const crypto = require('crypto');

// Función para encriptar un mensaje con una clave pública RSA
function encryptWithPublicKey(publicKeyPath, message) {
  // Leer la clave pública desde el archivo
  const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

  // Encriptar el mensaje
  const encryptedMessage = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // Asegúrate de convertir el mensaje en un buffer si es un string
    Buffer.from(message)
  );

  // Retornar el mensaje encriptado en formato base64
  return encryptedMessage.toString('base64');
}

// Usar la función para encriptar un mensaje
const pathToPublicKey = './public_key.pem';
const messageToEncrypt = 'Mensaje secreto';
const encryptedMessage = encryptWithPublicKey(pathToPublicKey, messageToEncrypt);
console.log('Mensaje encriptado:', encryptedMessage);
