import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker"; 
import API from "../../utils/api"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

function CollectForm() {
  const [selectedBus, setSelectedBus] = useState(""); 
  const [amount, setAmount] = useState("1200"); 
  const [telephone, setTelephone] = useState(""); 
  const [echeance, setEcheance] = useState("1"); 
  const [buses, setBuses] = useState([]); 
  const [error, setError] = useState(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [statusMessage, setStatusMessage] = useState(""); // Message d'erreur ou de succès
  const [messageType, setMessageType] = useState(""); // "success" ou "error"
  const [showMessage, setShowMessage] = useState(false); // Affichage du message

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await API.get("/bus"); 
        const carArray = response.data.map((item, index) => ({
          label: item.nom, 
          value: item.id, 
        }));
        setBuses(carArray); 
      } catch (err) {
        setError("Impossible de récupérer les bus. Veuillez réessayer.");
      }
    };
    fetchBuses();
  }, []);

  const handleSubmit = async () => {
    if (!selectedBus || !telephone) {
        setStatusMessage('Veuillez remplir tous les champs.') 
        setMessageType("error"); 
        setShowMessage(true); 
      return
    };

    const formData = {
      bus: selectedBus,
      telephone: telephone,
    };
    try {
      const resp = await API.post("/collected", formData);
      if (resp.status === 201) {
        setStatusMessage("Bus collecté avec succès!");
        setMessageType("success"); 
        setShowMessage(true); 
        setSelectedBus(""); 
        setTelephone("");   
        setAmount("1200");  
        setEcheance("1");  

        setTimeout(() => {
          setShowMessage(false); 
        }, 5000);
      }
    } catch (error) {
      setStatusMessage("Error!!!. Veuillez réessayer.");
      setMessageType("error"); 
      setShowMessage(true); 

      setTimeout(() => {
        setShowMessage(false); 
      }, 5000);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); 
      console.log('Token après déconnexion:', token); 
      router.push('/users/login');  
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }
  

  return (
    <View style={styles.container}>

      <View style={styles.form}>
        {showMessage && (
          <Text
            style={[
              styles.message,
              messageType === "success" ? styles.successText : styles.errorText,
            ]}
          >
            {statusMessage}
          </Text>
        )}

        <Text style={styles.label}>Choisissez un bus :</Text>
        <DropDownPicker
          open={isDropdownOpen}
          value={selectedBus}
          items={buses}
          setOpen={setIsDropdownOpen}
          setValue={setSelectedBus}
          searchable={true}
          searchPlaceholder="Recherchez un bus..."
          placeholder="Sélectionnez un bus"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={[styles.dropdownContainer, { maxHeight: 300 }]}
        />

        <Text style={styles.label}>Montant :</Text>
        <TextInput
          style={styles.input}
          value={amount}
          editable={false}
        />

        <Text style={styles.label}>Echeance :</Text>
        <TextInput
          style={styles.input}
          value={echeance}
          editable={false}
        />

        <Text style={styles.label}>Telephone :</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
          placeholder="Entrez le numéro du receveur"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enregistrer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#FF6347",  // Couleur rouge pour le bouton Logout
    borderRadius: 8,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  
  message: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  successText: {
    backgroundColor: "#d4edda",
    color: "green",
  },
  errorText: {
    backgroundColor: "#f8d7da",
    color: "red",
  },
  dropdown: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownContainer: {
    backgroundColor: "#f1f1f1",
  },
});

export default CollectForm;
