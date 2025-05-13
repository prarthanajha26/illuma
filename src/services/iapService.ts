import {Platform} from 'react-native';
import * as RNIap from 'react-native-iap';
import {isIOS} from '../utils/dimension';

const productIds = Platform.select({
  ios: ['com.illumaBasics', 'com.IllumaPremium'],
});
export const initIAPConnection = async (): Promise<boolean> => {
  try {
    const result = await RNIap.initConnection();
    if (isIOS) {
      await RNIap.clearTransactionIOS();
    } else {
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    }

    return result;
  } catch (error) {
    console.log('Error initializing IAP connection:', error);
    return false;
  }
};

export const getAvailableProducts = async () => {
  try {
    const products = await RNIap.getAvailablePurchases();
    console.log('Available Products:', products);
    return products;
  } catch (error) {
    console.log('Error fetching available products:', error);
    return [];
  }
};
export const fetchProducts = async () => {
  // console.log('productIds', productIds);
  try {
    const products = await RNIap.getProducts({
      skus: productIds,
    });
    return products;
  } catch (error) {
    console.log('Error fetching products:', error);
    return [];
  }
};

export const purchaseProduct = async (productId: string) => {
  try {
    const purchaseDetails = isIOS
      ? {
          sku: productId,
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
        }
      : {skus: [productId]};
    const purchase = await RNIap.requestPurchase(purchaseDetails);
    console.log('Purchase Successful:', purchase);
    return purchase;
  } catch (error) {
    console.log('Error purchasing product:', error);
    throw new Error(error);
  }
};

export const fetchSubscriptions = async () => {
  try {
    const subscriptions = await RNIap.getSubscriptions({
      skus: productIds,
    });
    console.log('Fetched Subscriptions:', subscriptions);
    return subscriptions;
  } catch (error) {
    console.log('Error fetching subscriptions:', error);
    return [];
  }
};

export const setupPurchaseListeners = (
  onPurchaseUpdated: (purchase: RNIap.ProductPurchase) => void,
  onPurchaseError: (error: RNIap.PurchaseError) => void,
) => {
  const purchaseUpdateSubscription =
    RNIap.purchaseUpdatedListener(onPurchaseUpdated);
  const purchaseErrorSubscription =
    RNIap.purchaseErrorListener(onPurchaseError);

  return () => {
    purchaseUpdateSubscription.remove();
    purchaseErrorSubscription.remove();
  };
};

export const endIAPConnection = () => {
  RNIap.endConnection();
};
