export const pageAttrs = {
  'holland': { pageable_type: 'Page', code: 'holland', name: 'វាយតម្លៃមុខរបរ', parent_code: null },
  'multi_intelligent': { pageable_type: 'Page', code: 'multi_intelligent', name: 'តេស្តភាពឆ្លាតវៃ', parent_code: null },
  'school': { pageable_type: 'Page', code: 'school', name: 'គ្រឹះស្ថានសិក្សា', parent_code: null },
  'job': { pageable_type: 'Page', code: 'job', name: 'ប្រភេទការងារ', parent_code: null },
  'video': { pageable_type: 'Page', code: 'video', name: 'វីដេអូមុខរបរ', parent_code: null },
  'career_website': { pageable_type: 'Page', code: 'career_website', name: 'មជ្ឈមណ្ឌលការងារ', parent_code: null },
  'career_website_detail': { pageable_type: 'Page', code: 'career_website_detail' },      // name, and parent_code of career_website_detail are based on the visited item
  'major': { pageable_type: 'Page', code: 'major', name: 'មុខជំនាញសិក្សា', parent_code: null },
}

export const detailScreenAttrs = {
  'school': { pageable_type: 'School', code: 'school_detail', parent_code: 'school', name: 'school detail' },
  'job': { pageable_type: 'Job', code: 'job_detail', parent_code: 'job', name: 'job detail' },
  'video': { pageable_type: 'Video', code: 'video_detail', parent_code: 'video', name: 'video detail' }
}