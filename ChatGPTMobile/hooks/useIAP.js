import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Alert } from "react-native";

export const hasUpgraded = async () => {
  const hasUpgraded = await AsyncStorage.getItem("@hasUpgraded");
  return hasUpgraded;
};

export const restoreUpgrade = async () => {
  if (Constants.appOwnership === "expo") return false;
  const InAppPurchases = await import("expo-in-app-purchases");
  try {
    await InAppPurchases.connectAsync();
    const { results } = await InAppPurchases.getPurchaseHistoryAsync();
    for (const result of results || []) {
      if (result.productId === "upgrade" && result.acknowledged) {
        await AsyncStorage.setItem("@hasUpgraded", JSON.stringify(true));
        await InAppPurchases.disconnectAsync();
        return true;
      }
    }
    await InAppPurchases.disconnectAsync();
    return false;
  } catch (e) {
    InAppPurchases.disconnectAsync();
  }

  return false;
};

export const buy = async ({ item, onSuccess }) => {
  if (Constants.appOwnership === "expo") return false;

  const InAppPurchases = await import("expo-in-app-purchases"),
    { IAPResponseCode } = await import("expo-in-app-purchases");
  try {
    await InAppPurchases.getProductsAsync([item]);
    return await new Promise((resolve, reject) => {
      InAppPurchases.setPurchaseListener(async (result) => {
        switch (result.responseCode) {
          case IAPResponseCode.OK:
          case IAPResponseCode.DEFERRED:
            await onSuccess();
            await InAppPurchases.finishTransactionAsync(result.results[0]);
            await InAppPurchases.disconnectAsync();
            return resolve(true);
          case IAPResponseCode.USER_CANCELED:
            await InAppPurchases.disconnectAsync();
            return resolve(false);
          case IAPResponseCode.ERROR:
            await InAppPurchases.disconnectAsync();
            return reject(new Error("IAP ErrorL " + result.errorCode));
        }
      });
    });
  } catch (e) {
    InAppPurchases.disconnectAsync();
    Alert.alert("Couldn't buy subscription", e.message);
  }
};
