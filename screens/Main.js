import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Alert, Text, View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { API_URL } from "../config/constants";
import Avatar from "../assets/icons/avatar.png";
import Carousel from "react-native-reanimated-carousel";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");
export default function Main(props) {

	const [products, setProducts] = React.useState([]);
	const [banners, setBanners] = React.useState([]);

	React.useEffect(() => {
		axios
			.get(`${API_URL}/banners`)
			.then((result) => {
				console.log(result);
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
	}, []);

	return (
		<SafeAreaView>
			<StatusBar style="auto" />
			<ScrollView>
				<View style={styles.container}>
					<Carousel
						data={banners}
						width={Dimensions.get("window").width}
						height={200}
						autoPlay={true}
						sliderWidth={Dimensions.get("window").width}
						itemWidth={Dimensions.get("window").width}
						itemHeignt={200}
						renderItem={(obj) => {
							return (
								<TouchableOpacity onPress={() => { Alert.alert('click') }}>
									<Image style={styles.bannerImage} source={{ uri: `${API_URL}/${obj.item.imageUrl}` }} resizeMode="contain" />
								</TouchableOpacity>
							)
						}} />
					<Text style={styles.headline}>Products</Text>
					<View style={styles.productList}>
						{products.map((product, index) => {
							return (
								<TouchableOpacity onPress={() => { props.navigation.navigate("Product") }}>
									<View style={styles.productCard} key={index}>
										{product.soldout === 1 && <View style={styles.productBlur} />}
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
											<Text style={styles.productName}>{product.name}</Text>
											<Text style={styles.productPrice}>{product.price}원</Text>
											<View style={styles.productFooter}>
												<View style={styles.productSeller}>
													<Image source={Avatar} style={styles.productAvatar} />
													<Text style={styles.productSellerName}>{product.seller}</Text>
												</View>
												<Text style={styles.productDate}> {dayjs(product.createdAt).fromNow()}</Text>
											</View>
										</View>
									</View>
								</TouchableOpacity>
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
		marginBottom: 8,
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
		zIndex: 999,
	},
	bannerImage: {
		height: "100%",
		width: "100%",
	},
});
