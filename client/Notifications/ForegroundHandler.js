import PushNotification from "react-native-push-notification";

import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
const ForegroundHandler = () => {
    //لاظهار اشعار والتطبيق شغال
    useEffect(() => {
        const unsubscribe =  messaging().onMessage( remoteMessage => {
            console.log("Handle in the foreground: ", remoteMessage)
            const {notification, messageId}=remoteMessage
            PushNotification.localNotification({
                channelId:'id',
                id:messageId,
                body:notification.body,//'android body'
                title:notification.title,//'android notification'
                soundName:'default',
                vibrate:true,
                playSound:true
            })
        })
        return unsubscribe
    }, [])
    return null
}

export default ForegroundHandler