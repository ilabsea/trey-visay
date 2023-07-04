import React from 'react';

import InfoAccordion from '../shared/InfoAccordion';
import InfoAccordionContent from '../shared/InfoAccordionContent';

const IntelligentDetailAccordion = ({intelligence}) => {
  const details = [
    {
      title: "ក. ការពិពណ៌នាទូទៅ",
      detail: intelligence.general_description || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
    {
      title: "ខ. ទម្រង់នៃសិក្សាដែលពេញចិត្ត",
      detail: intelligence.preferred_study || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
    {
      title: "គ. កិច្ចការ និងសកម្មភាពដែលទាក់ទង",
      detail: intelligence.related_activity || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
    {
      title: "ឃ. អាជីពការងារស័ក្តិសម",
      detail: intelligence.related_job || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
  ]

  return <InfoAccordion items={details}
            accordionContent={(item) => <InfoAccordionContent info={item} />}
         />
}

export default IntelligentDetailAccordion