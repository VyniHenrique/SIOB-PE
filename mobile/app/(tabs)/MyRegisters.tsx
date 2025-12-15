import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { MyRegistersStyle } from "@/styles/myRegisters";
import { Card } from "react-native-paper";
import ItemIncident from "@/components/ItemIncident";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MyRegisters(){

	return(
    <View style={MyRegistersStyle.screen}>
      <ScrollView>
        <Card style={MyRegistersStyle.cardTop}>
          <Text style={MyRegistersStyle.militaryName}>Major Silva</Text>
        </Card>

        <Card style={MyRegistersStyle.cardIncidentList}>
          <Text style={MyRegistersStyle.incidentListHeader}>Meus registros</Text>
          <View style={MyRegistersStyle.rowSearch}>
            <TextInput
              style={MyRegistersStyle.textInput}
              placeholder="Buscar ocorrência"
            />
            <Pressable
              onPress={() => {
                console.log("Pressionado");
              }}
              style={MyRegistersStyle.pressable}
            >
              <FontAwesome name="search" size={24} color="black" />
            </Pressable>
          </View>
          <View>
            {/* <ItemIncident/>
            <ItemIncident/>
            <ItemIncident/>
            <ItemIncident/>
            <ItemIncident/> */}
          </View>
        </Card>
      </ScrollView>
    </View>
	);
}