import React, { useContext, useEffect } from 'react';
import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as BlogContext} from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);
  
  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    
    //only invokes return function when the index screen is removed
    return () => {
      listener.remove();
    };
  }, [])

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id.toString()}
        renderItem={({ item }) => {
          return ( 
            <TouchableOpacity 
              onPress={() => navigation.navigate('Show', { id: item.id })}
            >
               <View style={styles.row}>
               <Text style={styles.title}>{item.title} - {item.id}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)} >
                  <Feather name="trash" style={styles.icon} />
                </TouchableOpacity>
             </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} style={styles.plus} />
      </TouchableOpacity>
    ),
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10

  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  },
  plus: {
    marginRight: 10
  }
});

export default IndexScreen;