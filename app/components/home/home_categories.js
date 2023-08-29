import keyword from '../../data/analytics/keyword';

const HomeCategories = [
  {
    title: 'វាយតម្លៃមុខរបរនិងអាជីព',
    url: 'HollandNavigator',
    source_image: require('../../assets/images/home/career_test.png'),
    color: ['rgb(53, 174, 235)', 'rgb(24, 118, 211)'],
    button_text: 'ចាប់ផ្តេីម',
    firebase_event_name: keyword.CAREER_ASSESSMENT_VIEW,
    description: 'ធ្វើតេស្តផ្អែកលើ បុគ្គលិកលក្ខណៈដើម្បីជ្រើសរើសមុខរបរសមស្រប',
    display: "row_card",
    visit_code: "holland"
  },
  {
    title: 'តេស្តភាពឆ្លាតវៃ',
    // url: 'PersonalityAssessmentStack',
    url: 'MultiIntelligentNavigator',
    source_image: require('../../assets/images/home/personality_test.png'),
    color: ['rgb(236, 135, 192)', 'rgb(191, 76, 144)'],
    button_text: 'ចាប់ផ្តេីម',
    firebase_event_name: keyword.PERSONALITY_ASSESSMENT_VIEW,
    description: 'ចូលទៅកាន់បណ្តុំព័ត៌មានអាហារូបករណ៍',
    display: "row_card",
    visit_code: "multi_intelligent"
  },
  {
    title: 'គ្រឹះស្ថានសិក្សា',
    url: 'SchoolNavigator',
    source_image: require('../../assets/images/home/school.png'),
    color: ['rgb(160, 212, 104)', 'rgb(13, 161, 75)'],
    button_text: 'ពិស្តារ',
    firebase_event_name: keyword.INSTITUTION_VIEW,
    description: 'ព័ត៌មានអាស័យដ្ឋានទំនាក់ទំនង និងមុខវិជ្ជាសិក្សាក្រោយបញ្ចប់ថ្នាក់ទី១២',
    display: "tilted_card",
    visit_code: "school"
  },
  {
    title: 'ប្រភេទការងារ',
    url: 'VocationalNavigator',
    source_image: require('../../assets/images/home/vocational_job.png'),
    color: ['rgb(247, 107, 28)', 'rgb(250, 217, 97)'],
    button_text: 'ពិស្តារ',
    firebase_event_name: keyword.VOCATIONAL_VIEW,
    description: 'សំរាប់អ្នកគ្មានលទ្ធភាពបន្តការសិក្សា បរិញ្ញាប័ត្រ អ្នកអាចរៀនជំនាញវិជ្ជាជីវៈ រយៈពេលខ្លី',
    display: "tilted_card",
    visit_code: "job"
  },
  {
    title: 'វីដេអូមុខរបរ',
    url: 'VideoScreen',
    source_image: require('../../assets/images/home/video.png'),
    color: ['rgb(255, 102, 98)', 'rgb(255, 130, 97)', 'rgb(254, 159, 95)', 'rgb(254, 162, 95)', 'rgb(254, 191, 94)'],
    button_text: 'ពិស្តារ',
    firebase_event_name: keyword.VIDEO_VIEW,
    description: 'យល់ដឹងអំពីមុខរបរនិងអាជីពតាមរយៈ វីដេអូ',
    display: "tilted_card",
    visit_code: "video"
  },
  {
    title: 'មជ្ឈមណ្ឌលការងារ',
    url: 'CareerWebsiteNavigator',
    source_image: require('../../assets/images/home/career_center.png'),
    color: ['#bdc3c7', '#2c3e50'],
    button_text: 'ពិស្តារ',
    firebase_event_name: keyword.CAREER_CENTER,
    description: 'យល់ដឹងអំពីការងារ កម្លាំងពលកម្ម និងព័ត៌មានទីផ្សារការងារ',
    display: "tilted_card",
    visit_code: "career_website"
  },
]

export default HomeCategories;
