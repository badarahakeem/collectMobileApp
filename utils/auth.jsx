import API from "./api"; // Import de l'instance Axios configurée
import AsyncStorage from "@react-native-async-storage/async-storage";


const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
    console.log("Token enregistré avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du token", error);
  }
};


export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token", error);
    return null;
  }
};


export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token"); 
    console.log("Token supprimé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression du token", error);
  }
};


export const login = async (username, password) => {
  try {
    const response = await API.post("/users", { username, password });
    const { token } = response.data; 
    await saveToken(token); // Enregistre le token dans AsyncStorage
    console.log("Connexion réussie !");
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.response?.data || error.message);
  }
};


export const logout = async () => {
  await removeToken(); // Supprime le token
  console.log("Déconnexion réussie !");
};


