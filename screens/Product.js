import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, ScrollView, StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";



export default function Product(props) {

  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  const [icon, setIcon] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        return setProduct(result.data.product);
      })
      .catch(() => {
        return console.error(error);
      });
    axios
      .get(`${API_URL}/icons`)
      .then((result) => {
        return setIcon(result.data.Icons[0].imageUrl);
      })
      .catch(() => {
        return console.error(error);
      });
  }, [])

  const onPressButton = () => {
    Alert.alert('구매가 완료 되었습니다')
  }
  if (!product) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image style={styles.productImage} source={{ uri: `${API_URL}/${product.imageUrl}` }} resizeMode="contain" />
        </View>
        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Text style={styles.sellerText}>{product.seller}</Text>
            <Image styles={styles.avatarImage} source={{ uri: `${API_URL}/${icon}` }} />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}원</Text>
          <Text style={styles.productDate}>{dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</Text>
          <Text style={styles.productDesc}>{product.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={onPressButton}>
        <View style={product.soldout === 1 ? styles.purchaseDisabled : styles.purchaseButton}	>
          <Text style={styles.purchaseText}>{product.soldout === 1 ? "품절" : "구매하기"}</Text>
        </View>
      </TouchableOpacity >
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff"
  },
  productImage: {
    width: '100%',
    height: 300
  },

  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    height: 50,
    width: 50,
  },
  sellerText: {
    color: "#333"
  },
  productSection: {
    padding: 16,

  },
  divider: {
    backgroundColor: "#ddd",
    height: 1,
    marginVertical: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: "400",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  productDate: {
    fontSize: 14,
    marginTop: 4,
    color: "#ddd",
  },
  productDesc: {
    fontSize: 16,
    marginTop: 4,
    color: "#666",
  },
  purchaseButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "rgb(255,80,88)",
    alignItems: "center",
    justifyContent: "center",
  },
  purchaseText: {
    color: "white",
    fontSize: 20,
  },
  purchaseDisabled: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
})