import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
  return (
    <View className="items-center">
    <Image source={require('./../../assets/images/login2.png')}
        className="w-[220px] h-[460px]
         object-cover mt-16 rounded-xl "
         style={{borderWidth:4,borderColor:'#000',paddingTop:5}}
    />
    <View className="p-8 mt-[-20px] bg-blue-500 flex h-full rounded-t-3xl shadow-md">
        <Text className="text-[30px] font-bold text-white">Community Marketplace</Text>
        <Text className="text-[18px] text-white text-center mt-6">Buy Sell Marketplace where you can sell old item and make real money</Text>
        <TouchableOpacity onPress={onPress} className="p-4 bg-white rounded-full mt-20">
            <Text className="text-blue text-center text-[18px]">Get Started</Text>
        </TouchableOpacity>
    </View>
</View>
  )
}