import { View, ActivityIndicator } from "react-native";
import colors from '../../config/Colors'

const MyActivityIndicator = () => {
	return (
      	<View style={{ flex: 1, justifyContent: "center"}}>
      		//size can be "small" or "large"
			<ActivityIndicator size="large" color={colors.primary} />
      	</View>
    );
}