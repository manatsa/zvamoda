import NetInfo from "@react-native-community/netinfo";
const AppNetworkInfo = async () => {
  let netFlag = 0;
  const networkInfo = await NetInfo.fetch().then((state) => {
    return state;
  });
  return networkInfo;
};

export default AppNetworkInfo;
