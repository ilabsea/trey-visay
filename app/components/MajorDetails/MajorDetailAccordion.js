import React from 'react';

import {View} from 'react-native';
import { Text } from '../../components';
import Color from '../../themes/color';
import InfoAccordion from '../shared/InfoAccordion';

const MajorDetailAccordion = ({major}) => {
  const details = [
    {
      title: "ក. ការពិពណ៌នាទូទៅ",
      detail: major.general_info || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
    {
      title: "ខ. លក្ខខណ្ឌការងារ",
      detail: "",
      children: [
        { title: "មុខវិជ្ជាតម្រង់ទិស", detail: major.orien_orientation_subjects },
        { title: "លក្ខខណ្ឌចូលរៀន", detail: major.orien_study_condition },
        { title: "លក្ខខណ្ឌបញ្ចប់ការសិក្សា", detail: major.orien_graduation_condition },
      ]
    },
    {
      title: "គ. កម្មវិធីសិក្សា",
      detail: major.curriculum,
      children: []
    },
    {
      title: "ឃ. ដំណើរការបង្រៀន និងរៀន",
      detail: major.teaching_and_learning_process,
      children: []
    },
    {
      title: "ង. ចំណេះដឹងទទួលបាន",
      detail: major.gain_knowledge,
      children: []
    },
    {
      title: "ច. អាជីពការងារសក្ដិសម",
      detail: major.worthy_career,
      children: []
    },
  ]

  const renderDetail = (detail) => {
    let arr = (detail + "").split(' - ');
    let arr2 = (arr.slice(1, arr.length) || []);

    return (
      <View>
        <Text style={{color: Color.blackColor}}>
          { arr[0] }
        </Text>

        { arr2.map((a, i) => <Text key={`detail-${i}`}>- {a}</Text>) }
      </View>
    )
  }

  const renderAccordionDetail = (item) => {
    if(!item.children.length) {
      return (
        renderDetail(item.detail)
      )
    }

    return (
      <View>
        {item.children.map((obj, i) =>
          <View key={i}>
            <Text style={{color: Color.grayColor}}>{obj.title}</Text>
            { renderDetail(obj.detail) }
          </View>
        )}

      </View>
    )
  }

  return (
    <InfoAccordion
      items={details}
      accordionContent={renderAccordionDetail}
      contentContainerStyle={{paddingTop: 10}}
    />
  )
}

export default MajorDetailAccordion
