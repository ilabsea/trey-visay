import React from 'react';
import { View, ScrollView } from 'react-native';

import Text from '../../components/Text';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import {screenHorizontalPadding} from '../../constants/component_constant';
import translationHelper from '../../utils/DateTime/translation_helper';

const MultiIntelligentAboutScreen = () => {
  renderMultiIntelligentTypes = () => {
    const items = [
      { title: "បញ្ញាផ្នែកភាសា៖", detail: "អ្នកសិក្សាដែលពូកែពាក្យពេចន៍ និងមានភាពរីកចម្រើនខាងជំនាញស្តាប់"},
      { title: "បញ្ញាផ្នែកតក្ក និងគណិតសាស្រ្ត៖", detail: "អ្នកសិក្សាដែលពូកែខាងតក្ក និងលេខ មានហេតុផលបែបអនុមាន និងគិតបែបអរូបី ហើយអាចយល់ពីគំរូ និងទំនាក់ទំនង"},
      { title: "បញ្ញាផ្នែកតន្រ្តី៖", detail: "ចូលចិត្តតូរ្យតន្រ្តី និងឆាប់ដឹងពីសំឡេងដែលនៅជុំវិញខ្លួន"},
      { title: "បញ្ញាផ្នែកចលនាកាយសម្បទា៖", detail: "អ្នកពូកែខាងកាយសម្បទាអាចប្រើប្រាស់រាងកាយ វិញ្ញាណទាំងប្រាំ និងអវៈយវៈរបស់គេបានយ៉ាងមានប្រសិទ្ធិភាព"},
      { title: "ផ្នែកទស្សនីយភាពក្នុងលំហ៖", detail: "អ្នកសិក្សាដែលពូកែមើលរូបភាព គិតលំហរចេញជារូបភាព"},
      { title: "ផ្នែកទំនាក់ទំនងក្រៅខ្លួន៖", detail: "អ្នកពូកែទំនាក់ទំនងក្រៅខ្លួនចូលចិត្តធ្វើការ សិក្សារៀនសូត្រ និងជួយអ្នកដទៃនៅជុំវិញខ្លួន"},
      { title: "ផ្នែកទំនាក់ទំនងក្នុងខ្លួន៖", detail: "គឺជាអ្នកដែលមានភាពឆ្លាតវៃផ្នែកខាងក្នុង និងអារម្មណ៍។"},
    ]
    return items.map((item, index) => {
      // return <Text key={index} style={{marginVertical: 6}}>
      return <Text key={index} style={{marginVertical: 8}}>
                {translationHelper.translateNumber(index + 1, 'km')}. <BoldLabelComponent label={item.title} /> {item.detail}
             </Text>
    });
  }

  renderContent = () => {
    return (
      <View style={{padding: screenHorizontalPadding, paddingTop: 8, backgroundColor: 'white', flex: 1}}>
        <Text style={{marginBottom: 10}}>
          <BoldLabelComponent label="តេស្តពហុបញ្ញា (Multiple Intelligence Test) "/>
          ត្រូវបានបង្កើតឡើងនិងអភិវឌ្ឍដោយសាស្រ្តាចារ្យផ្នែកចិត្តវិទ្យា លោក ហូវ៉ាត ហ្កាតន័រ (Howard Gardner) នៅឆ្នាំ ១៩៨៣ ក្នុងគោលបំណងចង់បង្ហាញថា បញ្ញារបស់មនុស្សមិនមែនមានតែមួយទេ គឺមានច្រើន។ គាត់បានសិក្សាឃើញថា មនុស្សម្នាក់ៗអាចនឹងខ្សោយបញ្ញាលើផ្នែកអ្វីមួយ តែអាចឆ្លាតពូកែលើផ្នែកអ្វីម្យ៉ាងផ្សេងទៀត។ លោក ហ្ហាតន័របានលើកឡើងថា មនុស្សម្នាក់ដែលខ្សោយបញ្ញាលើផ្នែកណាមួយ មិនមែនមានន័យថា គាត់មិនឆ្លាតនោះទេ តែគាត់អាចនឹងឆ្លាតពូកែលើផ្នែកណាមួយផ្សេងទៀត។
        </Text>

        <Text style={{marginTop: 12, marginBottom: 6}}>ផ្អែកលើទ្រឹស្តីរបស់លោក ហូវ៉ាត ហ្កាតន័រ តេស្តពហុបញ្ញានេះ នឹងបង្ហាញប្រភេទបញ្ញារបស់ដោយចែកចេញជា <BoldLabelComponent label="៧ ប្រភេទ" />ដូចជា៖</Text>
        {renderMultiIntelligentTypes()}
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomNavigationHeader title='អំពីតេស្តពហុបញ្ញា' headerStyle={{zIndex: 1}} />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 16}}>
        {renderContent()}
      </ScrollView>
    </View>
  )
}

export default MultiIntelligentAboutScreen;