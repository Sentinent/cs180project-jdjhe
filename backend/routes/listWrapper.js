
class InsertList {
    constructor() {
        this.featurerepeatsList = [];
        this.featuretime = [];
    }

    push (o) {
        this.featurerepeatsList.push(o);
        this.featuretime.push(o);
    }
};

class DeleteList {
    constructor() {
        this.featurerepeatsList = [];
        this.featuretime = [];
    }

    push (o) {
        this.featurerepeatsList.push(o);
        this.featuretime.push(o);
    }
}

class UpdateList {
    constructor() {
        this.featurerepeatsListOld = [];
        this.featurerepeatsListNeo = [];
        this.featuretimeOld = [];
        this.featuretimeNeo = [];
    }

    pushOld (o) {
        this.featurerepeatsListOld.push(o)
        this.featuretimeOld.push(o);
    }

    pushNew (o) {
        this.featurerepeatsListNeo.push(o);
        this.featuretimeNeo.push(o);
    }
}

let insertLists = new InsertList();
let deleteLists = new DeleteList();
let updateLists = new UpdateList();

module.exports = { insertLists, deleteLists, updateLists };