export class Collections {
  static filter(records, field, value) {
    let holder = [];
    if (!records) return holder;
    for (let rec of records) {
      if (ref[field] == value) holder.push(rec);
    }
    return holder;
  }
}

export class CollectionMath {
  static sum(records, fields, resultTemplate = {}) {
    for (let field of fields) {
      resultTemplate[field] = 0;
    }
    if (records) {
      for (let rec of records) {
        for (let field of fields) {
          if (rec[field]) resultTemplate[field] += rec[field];
          else resultTemplate[field] += 0;
        }
      }
    }
    return resultTemplate;
  }
}

export class RecordMap {
  records = {}

  has(name) {
    if (this.records[name]) return true;
    return false;
  }

  get(name, defaultVal = null) {
    if (this.records[name]) return this.records[name];
    else return defaultVal;
  }

  put(name, val) {
    this.records[name] = val;
  }

  getAll() {
    let holder = [];
    for (let name in this.records) {
      holder.push(this.records[name]);
    }
    return holder;
  }

  addAll(keyField, records) {
    if (!records) return this;
    for (let record of records) {
      let rec = record;
      let name = rec[keyField];
      if (!name) {
        throw new Error(`Record key, key field ${keyField} is not available!`);
      }
      if (this.records[name]) {
        throw new Error(`More than one record with the same key ${name}!`);
      };
      this.records[key] = record;
    }
  }
}

export class ListRecordHolder {
  value;
  key;
  label;
  records = [];

  constructor(value) {
    if (value) {
      this.key = `${value}`;
      this.label = this.key;
      this.value = value;
    } else {
      this.key = "unknown";
      this.label = "unknown";
    }
  }

  add(rec) {
    this.records.push(rec);
  }
}

export class ListRecordMap {
  records = [];
  listMap = {};

  addAllRecords(groupByField, records) {
    if (!records) return this;
    for (let i = 0; i < records.length; i++) {
      let rec = records[i];
      let value = rec[groupByField];
      let key = "unkown";
      if (value) key = `${value}`;
      let holder = this.listMap[key];
      if (!holder) {
        holder = new ListRecordHolder(value);
        this.listMap[key] = holder;
      }
      holder.add(rec);
    }
    return this;
  }

  getAllRecords() { return this.records; }

  getList(name) {
    let list = this.listMap[name];
    if (!list) throw new Error(`The list $${name} is not avaible`);;
    return list.records;
  }

  getNullableList(name) {
    let list = this.listMap[name];
    if (!list) return null;
    return list.records;
  }

  createOrGetList(name) {
    let list = this.listMap[name];
    if (!list) {
      list = this.createList(name);
    }
    return list.records;
  }

  createList(name) {
    let holder = this.listMap[name];
    if (!holder) {
      holder = new ListRecordHolder(name);
      this.listMap[name] = holder;
    }
    return holder;
  }

  getListRecordHolder(name, create = false) {
    let list = this.listMap[name];
    if (!list && create) {
      list = this.createList(name);
    }
    return list;
  }

  getListNames() {
    let names = [];
    for (let name in this.listMap) {
      names.push(name);
    }
    return names;
  }

  put(name, rec) {
    let holder = this.listMap[name];
    if (!holder) {
      holder = new ListRecordHolder(name);
      this.listMap[name] = holder;
    }
    holder.add(rec);
  }
}
