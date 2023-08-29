import React from 'react';

import InfoAccordion from '../shared/InfoAccordion';
import InfoAccordionContent from '../shared/InfoAccordionContent';
import SchoolUtil from '../../utils/school_util';

const MajorDetailAccordion = ({major, showRecommendation}) => {
  const details = [
    {
      title: "ក. ព័ត៌មានទូទៅ",
      detail: major.general_info || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
    {
      title: "ខ. មុខវិជ្ជាតម្រង់ទិស និងលក្ខខណ្ឌចាំបាច់",
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
    {
      title: "ឆ. គ្រឹះស្ថានសិក្សា",
      detail: SchoolUtil.getSchoolNamesByIds(major.school_ids),
      children: []
    },
    showRecommendation ? {
      title: "ជ. អនុសាសន៍",
      detail: major.recommendation,
      children: []
    } : null
  ]

  return <InfoAccordion items={details}
            accordionContent={(item) => <InfoAccordionContent info={item} />}
         />
}

export default MajorDetailAccordion
