import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFcmToken = async () => {
    //FCM Registration Token (Device Token) الجهاز الي فتت على التطبيق من خلاله
    //بنادي عليه اول ما افوت على التطبيق
    //     https://testfcm.com/
    //Server Key => from firebase (Project settings-> Cloud Messaging-> Server Key)
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken, 'old fcm token')
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken, "the new generated token");
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        } catch (error) {
            console.log(error, "error raised")
        }
    }
}

export const NotificationsListener = async () => {
    //بنادي عليه اول ما افوت على التطبيق
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
        //دخلت عالتطبيق من الاشعارات الي اجت من فوق
        console.log('Notification caused app to open from background state:', remoteMessage.notification,);
        // return remoteMessage;
    });

    // messaging().onMessage(async remoteMessage=>{
    //     console.log("Recieved in the foreground: ",remoteMessage )
    // })

    // Check whether an initial notification is available
    messaging().getInitialNotification().then(remoteMessage => {
        //لما يدخل على التطبيق من خلال الاشعار وهو ما كان فاتح التطبيق قبل
        if (remoteMessage) {
            console.log('Notification caused app to open from quit state:', remoteMessage.notification,);
            //  return remoteMessage
        }
    });
}

