import { SafeAreaView, StyleSheet} from "react-native";
import React from "react";
import  Main  from "./screens/Main";
import  Product  from "./screens/Product";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<SafeAreaView style={styles.safeAreaView}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Main">
					<Stack.Screen name="Main" component={Main} options={{title:"홈 화면"}} />
					<Stack.Screen name="Product" component={Product} options={{title:"상품상세 화면"}}/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: "#fff",
	}
});
