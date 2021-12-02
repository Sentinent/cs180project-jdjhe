class InsertList {
  constructor() {
    this.featurerepeatsList = [];
    this.featuretime = [];
    this.feature1List = [];
    this.featurecbList = [];
    this.featuremonthList = [];
    this.featureVPCList = [];
  }

  push(o) {
    this.featurerepeatsList.push(o);
    this.featuretime.push(o);
    this.feature1List.push(o);
    this.featurecbList.push(o);
    this.featuremonthList.push(o);
    this.featureVPCList.push(o);
  }
}

class DeleteList {
  constructor() {
    this.featurerepeatsList = [];
    this.featuretime = [];
    this.feature1List = [];
    this.featurecbList = [];
    this.featuremonthList = [];
    this.featureVPCList = [];
  }

  push(o) {
    this.featurerepeatsList.push(o);
    this.featuretime.push(o);
    this.feature1List.push(o);
    this.featurecbList.push(o);
    this.featuremonthList.push(o);
    this.featureVPCList.push(o);
  }
}

class UpdateList {
  constructor() {
    this.featurerepeatsListOld = [];
    this.featurerepeatsListNeo = [];
    this.featuretimeOld = [];
    this.featuretimeNeo = [];
    this.feature1ListOld = [];
    this.feature1ListNeo = [];
    this.featurecbListOld = [];
    this.featurecbListNeo = [];
    this.featuremonthListOld = [];
    this.featuremonthListNeo = [];
    this.featureVPCListOld = [];
    this.featureVPCListNeo = [];
  }

  pushOld(o) {
    this.featurerepeatsListOld.push(o);
    this.featuretimeOld.push(o);
    this.feature1ListOld.push(o);
    this.featurecbListOld.push(o);
    this.featuremonthListOld.push(o);
    this.featureVPCListOld.push(o);
  }

  pushNew(o) {
    this.featurerepeatsListNeo.push(o);
    this.featuretimeNeo.push(o);
    this.feature1ListNeo.push(o);
    this.featurecbListNeo.push(o);
    this.featuremonthListNeo.push(o);
    this.featureVPCListNeo.push(o);
  }
}

const insertLists = new InsertList();
const deleteLists = new DeleteList();
const updateLists = new UpdateList();

module.exports = { insertLists, deleteLists, updateLists };
