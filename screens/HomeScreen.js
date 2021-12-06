import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect } from 'react';
import { View, Text, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import useAuth from "../hooks/useAuth"
import tw from "tailwind-rn"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";




const HomeScreen = () => {

    const navigation = useNavigation();
    const { user, logout } = useAuth();

    const DUMMY_DATA = [
        {
            firstName: "Michael",
            lastName: "Satumba",
            sports: "Basketball",
            photoURL: {uri: user.photoURL},
            age: 23,
            id: 1,
        },
        {
            firstName: "Michael",
            lastName: "Satumba",
            sports: "Basketball",
            photoURL: {uri: user.photoURL},
            age: 23,
            id: 2,
        },
        {
            firstName: "Michael",
            lastName: "Satumba",
            sports: "Basketball",
            photoURL: {uri: user.photoURL},
            age: 23,
            id: 3,
        },
    ]

   

    return (
        <SafeAreaView style={tw("flex-1")}>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={logout} style={tw("")}>
                    <Image 
                        style={tw("h-10 w-10 rounded-full")} 
                        source={{uri: user.photoURL }}/>
                </TouchableOpacity>
            

            <TouchableOpacity>
                <Image style={tw("h-16 w-24")} source={require("../Lifterlogo2.png")} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                <Ionicons name="chatbubbles-sharp" size={30} color="#FF00BF"/>
             </TouchableOpacity>
            </View>
            {/* End of Header */}

            {/* Cards */}
            <View style={tw("flex-1 -mt-6")}>
                <Swiper
                    containerStyle={{ backgroundColor: "transparent" }} 
                    cards={DUMMY_DATA}
                    renderCard={(card) => (
                        <View key={card.id} style={tw("bg-red-500 h-3/4 rounded-xl")}>
                            <Text>
                                {card.firstName}
                            </Text>
                        </View>
                    )} 

                />
        
            </View>
            

           
        </SafeAreaView>
    )
}

export default HomeScreen
