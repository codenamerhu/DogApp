import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ListRenderItem } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import CustomInput from '../components/CustomInput';
import { SearchBar, Button } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Share, { ShareSingleOptions, Social } from 'react-native-share'; // Import Social enum
import { DogData } from '../types/dogData';

interface DogListPresenterProps {
  filteredDogData: Array<any>;
  search: string;
  setSearch: (text: string) => void;
  loading: boolean;
  error: string | null;
}

const DogListPresenter: React.FC<DogListPresenterProps> = ({
  filteredDogData,
  search,
  setSearch,
  loading,
  error,
}) => {

    // Function to share the dog image via WhatsApp
  const shareDog = async (dogUrl: string) => {
    const shareOptions: ShareSingleOptions = {
      message: 'Check out this dog!',
      url: dogUrl,
      social: Social.Whatsapp,
    };

    try {
      await Share.shareSingle(shareOptions);
    } catch (error) {
      console.log('Error sharing dog:', error);
    }
  };

// Render the list item
const renderItem = ({ item, i }: { item: DogData; i: number }) => {
    return (
      <View
        style={[
          styles.card,
          { height: item.height },
          i % 2 === 0 ? { marginRight: 5 } : { marginLeft: 5 },
        ]}
      >
        <FastImage
          style={styles.image}
          source={{
            uri: item.imageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        >
          {/* Overlay Container for breed name and share button */}
          <View style={styles.overlay}>
            <Text style={styles.breedName}>{item.breed}</Text>
            <Button
              title="Share"
              onPress={() => shareDog(item.imageUrl)}
              buttonStyle={styles.shareButton}
              titleStyle={styles.shareButtonText}
            />
          </View>
        </FastImage>
      </View>
    );
  };

  
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container} >
      {/* Search Bar for filtering breeds */}
      <SearchBar
        placeholder="Search by breed..."
        onChangeText={setSearch} // Update search text state
        value={search} 
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
      {/* MasonryList for Pinterest-like layout */}
      <MasonryList
        data={filteredDogData} 
        renderItem={renderItem} 
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.gridView}
        numColumns={2} // Number of columns in the grid
        onEndReachedThreshold={0.5}
        pa
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    searchBarContainer: {
      backgroundColor: '#fff',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
    },
    searchBarInputContainer: {
      backgroundColor: '#f1f1f1',
    },
    gridView: {
        paddingHorizontal: 10,
      },
      card: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3, // Shadow for Android
      },
      image: {
        width: '100%',
        height: '100%', 
        borderRadius: 12, 
      },
      overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        paddingVertical: 10,
        alignItems: 'center',
      },
      breedName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      shareButton: {
        backgroundColor: '#4CAF50',
        marginTop: 5,
        width: '80%',
        borderRadius: 8,
      },
      shareButtonText: {
        fontSize: 14,
      },
  });

export default DogListPresenter;
