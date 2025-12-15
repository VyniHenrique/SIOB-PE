import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { HomeStyle } from "@/styles/home";
import { Card } from "react-native-paper";
import ItemIncident from "@/components/ItemIncident";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { API_URl_FIND_ALL_INCIDENTS } from "@/routes/routes";
import { InputsOcorrencia } from "@/types/InputTypes";

export default function Home() {
  useEffect(() => {
    handleGetAllIncidents();
  }, []);

  const [incidents, setIncidents] = useState<InputsOcorrencia[]>([]);

  const handleGetAllIncidents = async () => {
    try {
      const response = await fetch(API_URl_FIND_ALL_INCIDENTS);
      const data = await response.json();

      setIncidents(data);
      console.log("passou");
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <View style={HomeStyle.screen}>
      <ScrollView>
        <Card style={HomeStyle.cardTop}>
          <Text style={HomeStyle.militaryName}>Major Silva</Text>
        </Card>

        <Card style={HomeStyle.cardIncidentList}>
          <Text style={HomeStyle.incidentListHeader}>Lista de ocorrências</Text>
          <View style={HomeStyle.rowSearch}>
            <TextInput
              style={HomeStyle.textInput}
              placeholder="Buscar ocorrência"
            />
            <Pressable
              onPress={() => {
                console.log("Pressionado");
              }}
              style={HomeStyle.pressable}
            >
              <FontAwesome name="search" size={24} color="black" />
            </Pressable>
          </View>
          <View>
            <FlatList
              scrollEnabled={false}
              data={incidents}
              renderItem={({ item }) => <ItemIncident data={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
