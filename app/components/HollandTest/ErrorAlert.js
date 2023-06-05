import React, {useEffect, useState} from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useFormikContext } from "formik";

const ErrorAlert = (props) => {
  const {height, width} = Dimensions.get('window');
  const { errors, isSubmitting } = useFormikContext();
  const [ visible, setVisible] = useState(errors);

  useEffect(() => {
    setVisible(Object.keys(errors).length > 0);
    setTimeout(() => { setVisible(false) }, 2000);
  }, [isSubmitting])

  return (
        <View style={{position: 'absolute', top: (height - 120), alignSelf: 'center'}}>
          { visible &&
            <View style={{backgroundColor: '#000', padding: 8, borderRadius: 4}}>
              <Text style={{color: '#fff'}}>សូមបំពេញសំណួរទាំងអស់!</Text>
            </View>
          }
        </View>
  )
}

export default ErrorAlert
