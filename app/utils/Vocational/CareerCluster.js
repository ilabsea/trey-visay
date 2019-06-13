
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
      codes = mapping.filter(obj => { return obj.career_cluster_code == cluster.code });
      cluster.careers = [];
      characteristicList.map(obj => {
        for (let i = 0 ; i < codes.length; i++) {
          careerCode = codes[i].career_code;
          for(let j=0;j<obj.careers.length; j++){
            if(obj.careers[j].code == careerCode){
              cluster.careers.push(obj.careers[j]);
              break;
            }
          }
        }
      });
      return cluster;
    })
  }

  static getCareersClusters(){
    return this.careersClusters;
  }
}
