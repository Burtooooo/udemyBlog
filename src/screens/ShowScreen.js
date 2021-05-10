import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(BlogContext)
  
  const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() =>
         navigation.navigate('Edit', { id: navigation.getParam('id')})}
      >
        <EvilIcons name="pencil" size={35} style={styles.pencil} />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  pencil: {
    marginRight: 10
  }
});

export default ShowScreen;


// return {
//   headerRight: () => (
//     <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
//       <EvilIcons name="pencil" size={35} />
//     </TouchableOpacity>
//   ),
// };