import { Card, Button } from "react-native-paper";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import { EditIncidentStyle } from "@/styles/editIncident";
import CustomTextInput from "@/components/CustomTextInput";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { InputsOcorrencia } from "@/types/InputTypes";
import { API_URl_UPDATE } from "@/routes/routes";

export default function EditIncident() {
  const { incidentData } = useLocalSearchParams();
  const [formData, setFormData] = useState<Partial<InputsOcorrencia>>({});

  const Label = [
{ id: "1", label: "Diretoria", key: "diretoria" },
    { id: "2", label: "Viatura Empregada", key: "viaturaEmpregada" },
    { id: "3", label: "Número do Aviso", key: "numeroAviso" },
    { id: "4", label: "Número da Viatura", key: "numeroViatura" },
    { id: "5", label: "Cód. Local Ocorrência", key: "codigoLocalOcorrencia" },
    { id: "6", label: "Grupamento", key: "grupamento" },
    {
      id: "7",
      label: "Data/Hora Acionamento",
      key: "dataHoraAcionamento",
      placeholder: "AAAA-MM-DDTHH:mm:ss",
    },
    { id: "8", label: "Ponto Base", key: "pontoBase" },
    { id: "9", label: "Forma de Acionamento", key: "formaAcionamento" },
    { id: "10", label: "Local de Acionamento", key: "localAcionamento" },
    { id: "11", label: "Região", key: "regiao" },
    { id: "12", label: "AIS", key: "ais" },
    { id: "13", label: "Município", key: "municipio" },
    { id: "14", label: "Bairro", key: "bairro" },
    { id: "15", label: "Tipo de Logradouro", key: "tipoLogradouro" },
    { id: "16", label: "Logradouro", key: "logradouro" },
    { id: "17", label: "Tipo Natureza", key: "tipoNaturezaOcorrencia" },
    { id: "18", label: "Subgrupo Ocorrência", key: "subgrupoOcorrencia" },
    { id: "19", label: "Situação Ocorrência", key: "situacaoOcorrencia" },
  ];

  useEffect(() => {
    if (incidentData) {
      try {
        const parsedData = JSON.parse(incidentData as string);
        setFormData(parsedData);
      } catch (e) {
        console.error("Erro ao converter dados do incidente", e);
      }
    }
  }, [incidentData]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.id) {
      Alert.alert("Erro", "ID da ocorrência não encontrado.");
      return;
    }
    try {
      const payload = { ...formData };

      delete payload.id;
      const response = await fetch(API_URl_UPDATE(formData.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao atualizar item.");
      } else {
        console.log("passou aqui");
      }
      router.navigate("/Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={EditIncidentStyle.screen}>
      <ScrollView>
        <Card style={EditIncidentStyle.card}>
          <Text style={EditIncidentStyle.header}> Editar ocorrencia</Text>

          <FlatList
            scrollEnabled={false}
            data={Label}
            renderItem={({ item }) => (
              <CustomTextInput
                placeholder={item.placeholder || ""}
                style={EditIncidentStyle.textInput}
                label={item.label}
                value={formData[item.key as keyof InputsOcorrencia]?.toString() || ""}
                onChangeText={(text: string) => handleChange(item.key, text)}
              />
            )}
            keyExtractor={(item) => item.id}
          />

          <Button
            onPress={() => {
              handleUpdate();
            }}
            mode="contained"
            style={EditIncidentStyle.button}
          >
            Atualizar
          </Button>
        </Card>
      </ScrollView>
    </View>
  );
}
