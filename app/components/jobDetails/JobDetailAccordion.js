import React from 'react';

import InfoAccordion from '../shared/InfoAccordion';
import InfoAccordionContent from '../shared/InfoAccordionContent';
import JobCluster from '../../models/JobCluster';

const JobDetailAccordion = ({job, showRecommendation}) => {
  const details = [
    {
      title: "ក. ការពិពណ៌នាទូទៅ",
      detail: job.general_description || "មិនទាន់មានទិន្នន័យ",
      children: []
    },
    {
      title: "ខ. លក្ខខណ្ឌការងារ",
      detail: "",
      children: [
        {title: "ភារកិច្ចចម្បងៗ", detail: job.jd_main_task},
        {title: "បរិយាកាសការងារ", detail: job.jd_environment},
        {title: "ចរិតលក្ខណៈនៃអាជីព", detail: job.jd_work_style}
      ]
    },
    {
      title: "គ. ការសិក្សាអប់រំ និងបណ្ដុះបណ្ដាល",
      detail: "",
      children: [
        {title: "កម្រិតវប្បធម៌ទាមទារ", detail: job.edu_education_level},
        {title: "ជំនាញគាំទ្រនៅមធ្យមសិក្សា", detail: job.edu_subjects_at_high_school},
        {title: "ជំនាញឬឯកទេសនៅឧត្តមសិក្សា", detail: job.edu_majors_at_university}
      ]
    },
    {
      title: "ឃ. គុណវុឌ្ឍគាំទ្រសំខាន់ៗ",
      detail: "",
      children: [
        {title: "ចំណេះដឹងគាំទ្រ", detail: job.personal_competency_knowledge},
        {title: "ជំនាញគាំទ្រ", detail: job.personal_competency_skill},
        {title: "សមត្ថភាពគាំទ្រ", detail: job.personal_competency_ability},
      ]
    },
    showRecommendation ? {
      title: "ង. អនុសាសន៍",
      detail: job.recommendation,
      children: [],
      isHTML: true
    } : null
  ]

  return <InfoAccordion items={details}
            accordionContent={(item) => <InfoAccordionContent info={item} />}
         />
}

export default JobDetailAccordion