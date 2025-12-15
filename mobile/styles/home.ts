import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
	screen: {
		backgroundColor: "#A71414",
		flex: 1,
		marginTop: 35
	},

	cardTop: {
		marginBottom: 30,
		borderRadius: 0,
		alignItems: "flex-end",
		backgroundColor: "#EBEBEB"
	},

	militaryName: {
		fontSize: 20,
		margin: 15
	},

	incidentListHeader: {
		textAlign: "center",
		margin: 30,
		fontSize: 20,
		fontFamily: 'Montserrat-SemiBold'
	},
	
	cardIncidentList: {
		marginHorizontal: 10,
		marginBottom: 20,
		paddingBottom: 50
	},

	rowSearch: {
		paddingBottom: 30,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
	},

	textInput: {
		margin: 5,
		borderColor: "#D8D8D8",
		borderWidth: 1,
		borderRadius: 8,
		minHeight: 50,
		minWidth: 300
	},
	
	pressable: {
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	}
});