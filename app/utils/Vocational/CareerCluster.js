
import characteristicList from '../../data/json/characteristic_jobs';
import careersClusters from '../../data/json/careers/career_clusters';
import mapping from '../../data/json/careers/mapping';

export default class CareerCluster {
  static careersClusters;

  // {
  //   "code": "car_0003",
  //   "name_kh": "ផ្នែកសិល្បៈ បច្ចេកវិទ្យា A/V និងសារទូរគមនាគមន៍",
  //   "name_en": "Arts, A/V Technology & Communications",
  //   "careers": [{....}]
  // }

  static setCareersClusters(){
    this.careersClusters = careersClusters.map((cluster) => {
      let clusterCareers = mapping.filter(obj => { return obj.career_cluster_code == cluster.code });
      let allCareers = characteristicList.map(obj => obj.careers);
      allCareers = [].concat.apply([], allCareers);
      cluster.careers = clusterCareers.map(obj => allCareers.find(career => career.code == obj.career_code));

      return cluster;
    })
  }

  static getCareersClusters(){
    return this.careersClusters;
  }
}
