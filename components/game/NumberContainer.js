import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

// window => to get that available device size
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontWeight: 'bold',
    // fontFamily: 'open-sans-bold',
  },
});
