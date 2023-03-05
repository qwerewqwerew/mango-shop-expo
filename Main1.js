import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { API_URL } from "../config/constants";
import Avatar from "../assets/icons/avatar.png";
import Carousel from "react-native-anchor-carousel";
import Carousel from "react-native-reanimated-carousel";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
const { width: windowWidth } = Dimensions.get("window");
dayjs.extend(relativeTime);
dayjs.locale("ko");
export default function Main(props) {

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
		<View>
			<StatusBar style="auto" />
			<ScrollView>
				<View style={styles.carousels}>
					<Carousel data={banners} style={styles.carousel} renderItem={obj} ref={carouselRef} itemWidth={0.7 * windowWidth} inActiveOpacity={0.3} containerWidth={windowWidth} />
				</View>
				<View style={styles.container}>
					<Text style={styles.headline}>Products</Text>
					<View style={styles.productList}>
						{products.map((product, index) => {
							return (
								<TouchableOpacity onPress={()=>{props.navigation.navigate("Product")}}>
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
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			</ScrollView>
		</View>
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
		zIndex: 999,
	},
	carousels: {
		position: "relative",
		top: 0,
	},
	carousel: {
		display: "flex",
		height: 340,
		backgroundColor: '#eee',
	},
	bannerImage: {
		elevation: 3,
		position: "absolute",
		width: "80%",
		top: 0,
		flex: 1,
		height: 170,
	},
});
