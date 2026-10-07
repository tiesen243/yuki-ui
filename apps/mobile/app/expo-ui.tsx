import { BottomSheet, Button, Column, Host, Text } from '@expo/ui'
import { useState } from 'react'

export default function ExpoUIScreen() {
  const [isPresented, setIsPresented] = useState(false)

  return (
    <>
      <Host matchContents>
        <Button label='Open' onPress={() => setIsPresented(true)} />
      </Host>
      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
      >
        <Column>
          <Column style={{ backgroundColor: '#0a84ff', padding: 16 }}>
            <Text textStyle={{ color: '#FFFFFF' }}>
              This banner reaches the sheet&apos;s edge.
            </Text>
          </Column>
          <Button label='Close' onPress={() => setIsPresented(false)} />
        </Column>
      </BottomSheet>
    </>
  )
}
