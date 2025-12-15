import { StyleSheet } from "react-native";


export const loginStyles = StyleSheet.create({
	screen: {
		backgroundColor: "#A71414",
		flex: 1,
		justifyContent: "center",
		paddingTop: 35
	},

	header: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 45,
		textAlign: "center",
		color: "#fff"
	},

	loginHeader: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 35,
		textAlign: "center"
	},

	card: {
		flex: 1,
		borderBottomEndRadius: 0,
		borderBottomStartRadius: 0,
	},

	image: {
		width: 100,
		height: 100
	},
	
	viewImage: {
		width: '100%',
		alignItems: "center"
	}
});