export const pickerLabels = {
  save: 'រក្សាទុក',
    selectSingle: 'សូមធ្វើការជ្រើសរើស',
    selectMultiple: 'ជ្រើសរើសកាលបរិច្ឆេទ',
    selectRange: 'ជ្រើសរើសរយៈពេល',
    notAccordingToDateFormat: (inputFormat) =>
      `ទម្រង់កាលបរិច្ឆេទត្រូវតែជា ${inputFormat}`,
    mustBeHigherThan: (date) => `ត្រូវតែនៅបន្ទាប់ពីកាលបរិច្ឆេទ ${date}`,
    mustBeLowerThan: (date) => `ត្រូវតែនៅមុនកាលបរិច្ឆេទ ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `ត្រូវតែនៅចន្លោះកាលបរិច្ឆេទ ${startDate} - ${endDate}`,
    dateIsDisabled: 'កាលបរិច្ឆេទនេះត្រូវបានបិទ',
    previous: 'ត្រឡប់ក្រោយ',
    next: 'បន្ទាប់',
    typeInDate: 'បញ្ចូលកាលបរិច្ឆេទ',
    pickDateFromCalendar: 'ជ្រើសរើសកាលបរិច្ឆេទពីប្រតិទិន',
    close: 'បិទ',
}