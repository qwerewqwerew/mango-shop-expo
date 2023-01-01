import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet } from "react-native";
import { API_URL } from "./config/constants";
import Avatar from "./assets/icons/avatar.png";

import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

export default function App() {
	const [products, setProducts] = React.useState([]);
	const [banners, setBanners] = React.useState([]);

	React.useEffect(() => {
		axios
			.get(`${API_URL}/banners`)
			.then((result) => {
				return setBanners(result.data.banners);
			})
			.catch(() => {
				return console.error(error);
			});

		axios
			.get(`${API_URL}/products`)
			.then((result) => {
				setProducts(result.data.products);
			})
			.catch((error) => {
				console.error(error);
			});
			console.log(products)
	}, []);

	return (
		<SafeAreaView>
			<StatusBar style="auto" />
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.banners}>
						{banners.map((banner, index) => {
							return <Image source={{ uri: `${API_URL}/${banner.imageUrl}` }} style={styles.bannerImage} key={index} />;
						})}
					</View>
					<Text style={styles.headline}>Products</Text>
					<View style={styles.productList}>
						{products.map((product, index) => {
							return (
								<View style={styles.productCard} key={index}>
									{/* {product.soldout === 1 && <View style={styles.productBlur} />} */}
									<View>
										<Image
											source={{
												uri: `${API_URL}/${product.imageUrl}`,
											}}
											style={styles.productImage}
											resizeMode={"contain"}
										/>
									</View>
									<View style={styles.productContent}>
										<Text style={styles.productName}>하네스</Text>
										<Text style={styles.productPrice}>50000원</Text>
										<View style={styles.productFooter}>
											<View style={styles.productSeller}>
												<Image source={Avatar} style={styles.productAvatar} />
												<Text style={styles.productSellerName}>도기멍</Text>
											</View>
											<Text style={styles.productDate}>1분전</Text>
										</View>
									</View>
								</View>
							);
						})}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	headline: {
		fontSize: 24,
		fontWeight: "800",
		marginBottom: 24,
	},
	productCard: {
		width: 320,
		borderColor: "rgb(230,230,230)",
		borderWidth: 1,
		borderRadius: 16,
		backgroundColor: "#fff",
		padding: 10,
	},
	productImage: {
		width: "100%",
		height: 210,
	},
	productContent: {
		padding: 8,
	},
	productSeller: {
		flexDirection: "row",
		alignItems: "center",
	},
	productAvatar: { width: 20, height: 20 },
	productFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
	productName: { fontSize: 16 },
	productSellerName: { fontSize: 16 },
	productDate: { fontSize: 16 },
	productPrice: {
		fontSize: 18,
		fontWeight: "600",
		marginTop: 8,
	},
	productList: {
		alignItems: "center",
	},
	productBlur: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: "#ffffffaa",
		zIndex: 999,
	},
	bannerImage: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
	},
	banners: {
		width: "100%",
		height: 200,
		position: "relative",
		top: 0,
		left: 0,
	},
});
