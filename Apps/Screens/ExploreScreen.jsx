import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList'

export default function ExploreScreen() {

  const db=getFirestore(app)
  const [productList,setproductList]=useState([]);
  useEffect(()=>{
    getAllProducts();
  },[])
  /**
   * Used to get All Products
   */
  const getAllProducts=async()=>{
    setproductList([]);
    const q=query(collection(db,'UserPost'),orderBy('createdAt','desc'));

    const snapshot=await getDocs(q);
    snapshot.forEach((doc)=>{ 
      setproductList(productList=>[...productList,doc.data()]);
    })
  }
  return (
    <ScrollView className="p-5 py-8 bg-white">
      <Text className="text-[30px] font-bold">Explore More</Text>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  )
}