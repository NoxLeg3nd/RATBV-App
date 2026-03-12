import { router } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from "react";
import { getDB } from "../../utils/db";