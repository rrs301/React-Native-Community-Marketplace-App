import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useNavigation } from '@react-navigation/native'

export default function MyProducts() {

  const db=getFirestore(app)
  const {user}=useUser();
  const [productList,setProductList]=useState([]);
  const navigation=useNavigation();
  useEffect(()=>{
    user&&getUserPost();
  },[user])

  useEffect(()=>{
    navigation.addListener('focus',(e)=>{
    
      getUserPost();
    })
  },[navigation])
  /**
   * Used to get User Post only
   */
  const getUserPost=async()=>{
    setProductList([]);
    const q=query(collection(db,'UserPost'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress));
    const snapshot=await getDocs(q);
    snapshot.forEach(doc=>{
      
      setProductList(productList=>[...productList,doc.data()]);
    }) 
  }


  return (
    <View>
      <LatestItemList latestItemList={productList}
        
      />
    </View>
  )
}