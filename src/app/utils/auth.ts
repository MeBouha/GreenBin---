// utils/auth.ts
export interface user {
  id: number;
  login: string;
  password: string;
  nom: string;
  prenom: string;
  role: string;
}

export async function validateUserCredentials(username: string, password: string): Promise<user | null> {
  try {
    const response = await fetch('/data/users.xml');
    console.log(response);
    const xmlText = await response.text();
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const users = xmlDoc.getElementsByTagName("user");
    
    for (let i = 0; i < users.length; i++) {
    
      const user = users[i];
      const userLogin = user.getElementsByTagName("login")[0]?.textContent;
      const userPassword = user.getElementsByTagName("password")[0]?.textContent;
      console.log(userLogin )
      if (userLogin === username && userPassword === password) {
        return {
          id: parseInt(user.getElementsByTagName("id")[0]?.textContent || "0"),
          login: userLogin || "",
          password: userPassword || "",
          nom: user.getElementsByTagName("nom")[0]?.textContent || "",
          prenom: user.getElementsByTagName("prenom")[0]?.textContent || "",
          role: user.getElementsByTagName("role")[0]?.textContent || "",
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error("Erreur lors de la validation des credentials:", error);
    return null;
  }
}