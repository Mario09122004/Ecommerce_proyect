import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
    const [name, setName] = useState('Oscar');
    const [email, setEmail] = useState('oscar.perez@example.com');
    const [image, setImage] = useState('https://randomuser.me/api/portraits/men/1.jpg');
    const [isEditing, setIsEditing] = useState(false); // Cambiado de 'editing' a 'isEditing'

    const handleChangeProfileImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permisos requeridos', 'Necesitamos acceso a tu galería para cambiar la foto');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            Alert.alert('¡Listo!', 'Tu foto de perfil ha sido actualizada');
        }
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        Alert.alert('Perfil actualizado', 'Tus cambios se han guardado correctamente');
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing); // Actualizado para usar setIsEditing
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Mi Perfil</Text>
                        <TouchableOpacity onPress={toggleEdit}>
                            <Text style={styles.editButton}>
                                {isEditing ? 'Cancelar' : 'Editar'} {/* Actualizado a isEditing */}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Foto de perfil */}
                    <View style={styles.profileImageContainer}>
                        <Image source={{ uri: image }} style={styles.profileImage} />
                        {isEditing && ( // Actualizado a isEditing
                            <TouchableOpacity 
                                onPress={handleChangeProfileImage} 
                                style={styles.changeImageButton}
                            >
                                <Ionicons name="camera" size={20} color="white" />
                                <Text style={styles.changeImageText}>Cambiar foto</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Formulario */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                style={[styles.input, !isEditing && styles.disabledInput]} // Actualizado
                                value={name}
                                onChangeText={setName}
                                editable={isEditing} // Actualizado
                                placeholder="Ingresa tu nombre"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Correo electrónico</Text>
                            <TextInput
                                style={[styles.input, !isEditing && styles.disabledInput]} // Actualizado
                                value={email}
                                onChangeText={setEmail}
                                editable={isEditing} // Actualizado
                                keyboardType="email-address"
                                placeholder="Ingresa tu email"
                            />
                        </View>

                        {isEditing && ( // Actualizado
                            <TouchableOpacity 
                                style={styles.saveButton}
                                onPress={handleSaveChanges}
                            >
                                <Text style={styles.saveButtonText}>Guardar cambios</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        padding: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2c3e50',
    },
    editButton: {
        color: '#625dff',
        fontSize: 16,
        fontWeight: '600',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#625dff',
    },
    changeImageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#625dff',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginTop: 10,
    },
    changeImageText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 5,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#7f8c8d',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'white',
    },
    disabledInput: {
        backgroundColor: '#f5f5f5',
        color: '#95a5a6',
    },
    saveButton: {
        backgroundColor: '#625dff',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Profile;