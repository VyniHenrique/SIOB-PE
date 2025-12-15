import CustomTextInput from "@/components/CustomTextInput";
import { NewOccurrenceStyle } from "@/styles/newOccurrence";
import { View, Text, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";

export default function NewOccurrence() {
  return (
    <View style={NewOccurrenceStyle.screen}>
      <ScrollView>
        <Card style={NewOccurrenceStyle.card}>
          <Text style={NewOccurrenceStyle.header}>
            Registrar nova ocorrência
          </Text>

          <CustomTextInput
            label="Diretoria"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Viatura Empregada"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Número do Aviso"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Número da Viatura"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Cód. Local Ocorrência"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Grupamento"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Data/Hora Acionamento"
            style={NewOccurrenceStyle.textInput}
            placeholder="DD/MM/AAAA HH:mm"
          />

          <CustomTextInput
            label="Ponto Base"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Forma de Acionamento"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Local de Acionamento"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Região"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput 
		  	label="AIS" 
		  	style={NewOccurrenceStyle.textInput} 
		  />

          <CustomTextInput
            label="Município"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Bairro"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Tipo de Logradouro"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Logradouro"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Tipo Natureza Ocorrência"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Subgrupo Ocorrência"
            style={NewOccurrenceStyle.textInput}
          />

          <CustomTextInput
            label="Situação Ocorrência"
            style={NewOccurrenceStyle.textInput}
          />

		  <Button mode="contained" style={NewOccurrenceStyle.button}>
			Registrar
		  </Button>
        </Card>
      </ScrollView>
    </View>
  );
}
