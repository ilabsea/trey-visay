class Db {
  query(model: string, filter?: string) {
    let results = this.realm.objects(model);
    if(filter) {
        return results.filtered(filter);
    }
    return results;
  }
}
