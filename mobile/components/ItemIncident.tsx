import React from "react";
import { Card } from "react-native-paper";
import { Pressable, Text, View } from "react-native";
import { ItemIncidentStyle } from "@/styles/itemIncident";
import { router } from "expo-router";
import { InputsOcorrencia } from "@/types/InputTypes"

type ItemIncidentProps = {
  data: InputsOcorrencia;
};

export default function ItemIncident({data}: ItemIncidentProps) {

  const redirectToIncidentScreen = () => {
    router.push({
      pathname: "/EditIncident",
      params: { incidentData: JSON.stringify(data)}
    });
  }
  return (
    <Pressable onPress={redirectToIncidentScreen}>
      <Card style={ItemIncidentStyle.card}>
        <Text style={ItemIncidentStyle.titleIncident}>
          {data.subgrupoOcorrencia}
        </Text>
        <View style={ItemIncidentStyle.rowBodyTextIncident}>
          <Text style={ItemIncidentStyle.bodyTextIncident}>{data.tipoLogradouro} {data.logradouro}</Text>
          <Text style={ItemIncidentStyle.bodyTextIncident}>{data.bairro}</Text>
        </View>
      </Card>
    </Pressable>
  );
}
