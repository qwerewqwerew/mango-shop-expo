import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { API_URL } from "./config/constants";
import Avatar from "./assets/icons/avatar.png";
import Carousel from "react-native-anchor-carousel";

import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
const { width: windowWidth } = Dimensions.get("window");
console.log(windowWidth);

dayjs.extend(relativeTime);
dayjs.locale("ko");
export default function App() {
	
	const [products, setProducts] = React.useState([]);
	const [banners, setBanners] = React.useState([]);

	const carouselRef = useRef(null);

	function obj({ item, index }) {
		return (
			<View>
				<TouchableOpacity
					style={styles.item}
					onPress={() => {
						carouselRef.current.scrollToIndex(`${index}`);
					}}
				>
					<Image style={styles.bannerImage} source={{ uri: `${API_URL}/${item.imageUrl}` }} />
				</TouchableOpacity>
			</View>
		);
	}
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
	}, []);

	return (
		<SafeAreaView>
			<StatusBar style="auto" />
			<ScrollView>
			<View style={styles.carousels}>
				<Carousel data={banners} style={styles.carousel} renderItem={obj} ref={carouselRef} itemWidth={0.9 * windowWidth} inActiveOpacity={0.3} containerWidth={windowWidth} />
			</View>
				<View style={styles.container}>
					<Text style={styles.headline}>Products</Text>
					<View style={styles.productList}>
						{products.map((product, index) => {
							return (
								<View style={styles.productCard} key={product.id}>
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
		paddingVertical: 100,
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
		backgroundColor: "#ffffffaa",
		zIndex: 999,
	},
	carousels:{
		position: "relative",
		top:"0%"
	},
	carousel: {
		top: 0,
		left: 0,
		display: "flex",
		height: 200,
	},
	bannerImage: {
		elevation: 3,
		position: "absolute",
		width: "20%",
		flex: 1,
		borderWidth: 5,
		borderColor: "white",
		height: 340,
		top:0,
	},
});
