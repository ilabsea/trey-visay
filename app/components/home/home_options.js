import keyword from '../../data/analytics/keyword';

const HomeOptions = [
  {
    title: 'វាយតម្លៃមុខរបរ',
    url: 'CareerCounsellorStack',
    source_image: require('../../assets/images/home/career_test.png'),
    color: ['rgb(53, 174, 235)', 'rgb(24, 118, 211)'],
    button_text: 'ចាប់ផ្តេីម',
    firebase_event_name: keyword.CAREER_ASSESSMENT_VIEW,
    description: 'ធ្វើតេស្តមុខរបរ ឬអាជីពដោយផ្អែកលើ បុគ្គលិកលក្ខណៈដើម្បីជ្រើសរើសមុខរបរស័ក្តិសមនឹងអ្នក'
  },
  {
    title: 'ស្វែងយល់អំពីបុគ្គលិកលក្ខណៈ',
    url: 'PersonalityAssessmentStack',
    source_image: require('../../assets/images/home/personality_test.png'),
    color: ['rgb(236, 135, 192)', 'rgb(191, 76, 144)'],
    button_text: 'ចាប់ផ្តេីម',
    firebase_event_name: keyword.PERSONALITY_ASSESSMENT_VIEW,
    description: 'ការធ្វើតេស្តស្វែងយល់អំពីបុគ្គលិក លក្ខណៈ'
  },
  {
    title: 'គ្រឹះស្ថានសិក្សា',
    url: 'SchoolStack',
    source_image: require('../../assets/images/home/school.png'),
    color: ['rgb(160, 212, 104)', 'rgb(13, 161, 75)'],
    button_text: 'ពិស្តារ',
    firebase_event_name: keyword.INSTITUTION_VIEW,
    description: 'អំពីពត៌មានគ្រឹះស្ថានសិក្សា អាស័យដ្ឋានទំនាក់ទំនង និងមុខវិជ្ជាសិក្សាក្រោយ បញ្ចប់ថ្នាក់ទី១២'
  },
  {
    title: 'ប្រភេទការងារ',
    url: 'VocationalStack',
    source_image: require('../../assets/images/home/vocational_job.png'),
    color: ['rgb(247, 107, 28)', 'rgb(250, 217, 97)'],
    button_text: 'ពិស្តារ',
    firebase_event_name: keyword.VOCATIONAL_VIEW,
    description: 'សំរាប់អ្នកគ្មានលទ្ធភាពបន្តការសិក្សា បរិញ្ញាប័ត្រ អ្នកអាចរៀនជំនាញវិជ្ជាជីវៈ រយៈពេលខ្លី'
  },
  {
    title: 'វីដេអូមុខរបរ',
    url: 'VideoScreen',
    source_image: require('../../assets/images/home/video.png'),
    color: ['rgb(255, 102, 98)', 'rgb(255, 130, 97)', 'rgb(254, 159, 95)', 'rgb(254, 162, 95)', 'rgb(254, 191, 94)'],
    button_text: 'ពិស្តារ',
    firebase_event_name: keyword.VIDEO_VIEW,
    description: 'យល់ដឹងអំពីមុខរបរនិងអាជីពតាមរយៈ វីដេអូ'
  },
  {
    title: 'មជ្ឈមណ្ឌលការងារ',
    url: 'CareerCenterStack',
    source_image: require('../../assets/images/home/career_center.png'),
    color: ['#bdc3c7', '#2c3e50'],
    button_text: 'ពិស្តារ',
    firebase_event_name: keyword.CAREER_CENTER,
    description: 'យល់ដឹងអំពីការងារ កម្លាំងពលកម្ម និងព័ត៌មានទីផ្សារការងារ'
  },
]

export default HomeOptions;
