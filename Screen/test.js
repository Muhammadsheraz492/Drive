import React from 'react';
import {View, Button, Platform} from 'react-native';
import notifee from '@notifee/react-native';
function Screen() {
  async function onDisplayNotification() {
    try {
      // Request permissions (required for iOS)
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      const notification = {
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
          actions: [
            {
              pressAction: {
                id: 'action1',
              },
              title: 'Action 1',
            },
            {
              pressAction: {
                id: 'action2',
              },
              title: 'Action 2',
            },
          ],
        },
      };

      await notifee.displayNotification(notification);
      // }
    } catch (error) {
      // Handle the error here
      console.error('Error displaying notification:', error);
    }
  }

  return (
    <View>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
}

export default Screen;
