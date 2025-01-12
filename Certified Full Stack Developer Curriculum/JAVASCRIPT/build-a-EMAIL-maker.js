const maskEmail = (email) =>{
    const [username, domain] = email.split("@");
    const maskedUsername = username[0] + "*".repeat(username.length - 2) + username[username.length - 1];
    
      return `${maskedUsername}@${domain}`;
    }
    let email = "shivagana2004@gmail.com";
    console.log(maskEmail(email));
    