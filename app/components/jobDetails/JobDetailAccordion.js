import React from 'react';

import InfoAccordion from '../shared/InfoAccordion';
import InfoAccordionContent from '../shared/InfoAccordionContent';

const JobDetailAccordion = ({job}) => {
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
        {title: "ជំនាញផ្នែកតិចណូឡូជី", detail: job.jd_technology_skill}
      ]
    },
    {
      title: "គ. ការសិក្សាអប់រំ និងបណ្ដុះបណ្ដាល",
      detail: "",
      children: [
        {title: "កម្រិតវប្បធម៌ទាមទារ", detail: job.edu_education_level},
        {title: "មុខវិជ្ជាគាំទ្រនៅមធ្យមសិក្សា", detail: job.edu_high_school_supported_subject},
        {title: "ជំនាញ/ឯកទេសនៅឧត្ដមសិក្សា", detail: job.edu_higher_education_skill}
      ]
    },
    {
      title: "ឃ. គុណវុឌ្ឍគាំទ្រសំខាន់ៗ",
      detail: "",
      children: [
        {title: "ចំណេះដឹងគាំទ្រ", detail: job.qua_supported_knowledge},
        {title: "ជំនាញគាំទ្រ", detail: job.qua_supported_skill},
        {title: "សមត្ថភាពគាំទ្រ", detail: job.qua_supported_capacity},
        {title: "ចរិតលក្ខណៈនៃអាជីព", detail: job.qua_characteristic_of_job}
      ]
    },
    {
      title: "ង. ព័ត៌មានបន្ថែម",
      detail: "",
      children: [
        {title: "ទីផ្សារការងារ", detail: job.info_job_market},
        {title: "អាជីពប្រហាក់ប្រហែល", detail: job.info_similar_job}
      ]
    }
  ]

  return <InfoAccordion items={details}
            accordionContent={(item) => <InfoAccordionContent info={item} />}
         />
}

export default JobDetailAccordion