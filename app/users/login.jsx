import { useRouter } from 'expo-router' 
import React, { useState } from 'react' 
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native' 
import {login} from '../../utils/auth'

function Login() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('') 
  const router = useRouter() // Permet de naviguer vers un autre écran avec expo-router.

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Veuillez remplir tous les champs.') 
      return
    }

    try {
      await login(username, password)
      setError('')
      router.push('/components/collect')
    } catch (error) {
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
    }
    
  }

  return (
    <View style={styles.container}>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={username} 
          keyboardType="default"
          placeholder='Nom d’utilisateur'
          onChangeText={setUsername} 
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          placeholder='Mot de passe'
          keyboardType="default"
          onChangeText={setPassword}
          secureTextEntry 
        />
      </View>

      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
})

export default Login