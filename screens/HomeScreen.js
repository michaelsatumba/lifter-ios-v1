import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect, useRef } from 'react';
import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import useAuth from "../hooks/useAuth"
import tw from "tailwind-rn"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";




const HomeScreen = () => {

    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const swipeRef = useRef(null);

    const DUMMY_DATA = [
        {
            firstName: "Michael",
            lastName: "Satumba",
            sports: "Basketball",
            photoURL: user.photoURL,
            age: 23,
            id: 1,
        },
        {
            firstName: "Michael",
            lastName: "Satumba",
            sports: "Basketball",
            photoURL: user.photoURL,
            age: 23,
            id: 2,
        },
        {
            firstName: "Michael",
            lastName: "Satumba",
            sports: "Basketball",
            photoURL: user.photoURL,
            age: 23,
            id: 3,
        },
    ]



    return (
        <SafeAreaView style={tw("flex-1")}>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={logout}>
                    <Image
                        style={tw("h-10 w-10 rounded-full")}
                        source={{ uri: user.photoURL }} />
                </TouchableOpacity>


                <TouchableOpacity>
                    <Image style={tw("h-16 w-24")} source={require("../Lifterlogo2.png")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name="chatbubbles-sharp" size={30} color="#FF00BF" />
                </TouchableOpacity>
            </View>
            {/* End of Header */}

            {/* Cards */}
            <View style={tw("flex-1 -mt-6")}>
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={DUMMY_DATA}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={() => {
                        console.log("Swipe NOPE")
                    }}
                    onSwipedRight={() => {
                        console.log("Swipe MATCH")
                    }}
                    backgroundColor={"#4FD0E9"}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    color: "#4DED30",
                                },
                            },
                        },
                    }}
                    renderCard={(card) => (
                        <View key={card.id} style={tw("relative bg-white h-3/4 rounded-xl")}>
                            <Image
                                style={tw("absolute top-0 h-full w-full rounded-xl")}
                                source={{ uri: card.photoURL }} />

                            <View style={[
                                tw("absolute bottom-0 bg-white w-full h-20 flex-row justify-between items-center px-6 py-2 rounded-b-xl"),
                                styles.cardShadow,
                            ]}>
                                <View>
                                    <Text style={tw("text-xl font-bold")}>{card.firstName} {card.lastName}</Text>
                                    <Text>{card.sports} </Text>
                                </View>
                                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>

            <View style={tw("flex flex-row justify-evenly")}>
                <TouchableOpacity 
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tw("items-center justify-center rounded-full w-16 h-16 bg-red-200")}>
                    <Entypo name="cross" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tw("items-center justify-center rounded-full w-16 h-16 bg-green-200")}>
                    <Entypo name="check" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
});
