import React, { useState } from "react";
import { router } from "expo-router";
import { Button, Card, Checkbox, Text, TextInput } from "react-native-paper";
import { loginStyles } from "../../styles/login";
import { View, Image, ScrollView, Alert } from "react-native";
import { InputsLogin } from "@/types/InputTypes";
import { API_LOGIN } from "@/routes/routes";

type LoginProps = {
  data: InputsLogin;
};

export default function Login({data}: LoginProps) {
  
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(true);
  
  
  const handleLogin = async () => {
    if (!matricula || !senha){
      Alert.alert("Erro", "Por favor, preencha todos os campos.")
    }
    
    try{
      const response = await fetch(`${API_LOGIN}?matricula=${matricula}&senha=${senha}`);
      if (response.ok){
        router.replace("/Home");
        console.log("Login feito com sucesso")
      }
      
    } catch(error){
      console.error(error);
    }
  };

  return (
    <View style={loginStyles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <Text style={loginStyles.header} variant="displayLarge">
            Bem vindo ao SIOB-PE
          </Text>
        </View>
        <View style={loginStyles.viewImage}>
          <Image
            style={loginStyles.image}
            source={require("../../assets/images/Grupo 5.png")}
          />
        </View>
        <Card style={loginStyles.card}>
          <Card.Content>
            <Text style={loginStyles.loginHeader}>Faça seu login</Text>
            <View style={{ marginTop: 40 }}>
              <View style={{ marginBottom: 40 }}>
                <Text variant="labelLarge">Digite a sua matrícula</Text>
                <TextInput onChangeText={setMatricula} value={matricula} label={"Matrícula"} />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text variant="labelLarge">Digite a sua senha</Text>
                <TextInput
                  secureTextEntry={!visible}
                  onChangeText={setSenha}
                  value={senha}
                  right={
                    <TextInput.Icon
                      icon={visible ? "eye" : "eye-off"}
                      onPress={() => {
                        setVisible(!visible);
                      }}
                    />
                  }
                  label={"Senha"}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >
                <Text variant="bodyMedium">Lembre-se de mim</Text>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
            </View>
            <View>
              <Button mode="contained" onPress={handleLogin}>
                Entrar
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
