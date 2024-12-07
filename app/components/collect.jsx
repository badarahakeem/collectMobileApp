import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker"; // Import correct
import API from "../../utils/api"; // Instance Axios configurée

function CollectForm() {
  const [selectedBus, setSelectedBus] = useState(""); 
  const [amount, setAmount] = useState("1200"); 
  const [telephone, setTelephone] = useState(""); 
  const [echeance, setEcheance] = useState("1"); 
  const [buses, setBuses] = useState([]); 
  const [error, setError] = useState(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await API.get("/bus"); 
        //console.log("Données récupérées :", JSON.stringify(response.data));
        const carArray = response.data.map((item, index) => ({
          label: item.nom, 
          value: `${item.id}-${index}`, 
        }));
        setBuses(carArray); 
      } catch (err) {
        setError("Impossible de récupérer les bus. Veuillez réessayer.");
      }
    };
    fetchBuses();
  }, []);

  // useEffect(() => {
  //   const fetchBusDetails = async () => {
  //     if (selectedBus) {
  //       try {
  //         const response = await API.get(`/collected/${selectedBus}/`)
  //         console.log(response)
  //       } catch (error) {
  //         console.error("erreur lors de la recuperation des details: ", error)
  //       }
  //     }
      
  //   }
  //   fetchBusDetails()
  // }, [selectedBus])

  const handleSubmit = () => {
    console.log("Bus sélectionné :", selectedBus);
    console.log("Montant :", amount);
    console.log("Jour :", day);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.label}>Choisissez un bus :</Text>
        <DropDownPicker
          open={isDropdownOpen}
          value={selectedBus}
          items={buses}
          setOpen={setIsDropdownOpen}
          setValue={setSelectedBus}
          searchable={true} // Active la recherche
          searchPlaceholder="Recherchez un bus..."
          placeholder="Sélectionnez un bus"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={[
            styles.dropdownContainer,
            { maxHeight: 300 },
          ]}
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
            placeholder="entrez le numero du receveur"
            keyboardType="numeric"
          />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enregistrer</Text>
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
    padding: 10,
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
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
