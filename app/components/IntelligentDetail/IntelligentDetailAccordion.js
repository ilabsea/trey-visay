import React from 'react';

import InfoAccordion from '../shared/InfoAccordion';
import InfoAccordionContent from '../shared/InfoAccordionContent';

const IntelligentDetailAccordion = ({intelligence}) => {
  const details = [
    {
      title: "ក. ការពណ៌នាទូទៅ",
      detail: intelligence.description || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
    {
      title: "ខ. វិធីសាស្រ្តរៀនដែលសមស្រប",
      detail: intelligence.appropriate_learning_method || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
    {
      title: "គ. អាជីពមុខរបររដែលស័ក្តិសម",
      detail: intelligence.suitable_job || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
  ]

  return <InfoAccordion items={details}
            accordionContent={(item) => <InfoAccordionContent info={item} />}
         />
}

export default IntelligentDetailAccordion