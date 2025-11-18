// Module Imports
import { Model, ModelOptions, Pojo, QueryContext } from "objection";
import _ from "lodash";
import moment from "moment";

export default class BaseModel extends Model {
    created_at!: string;
    updated_at!: string;

    static externalProps: string[] = [];

    async $beforeInsert(queryContext: QueryContext) {
        super.$beforeInsert(queryContext);
        this.created_at = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        this.updated_at = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    }

    async $beforeUpdate(opts: ModelOptions, queryContext: QueryContext) {
        super.$beforeUpdate(opts, queryContext);
        this.updated_at = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    }

    removeDbOnlyKeys(this: any) {
        const omitKeys = this.constructor?.omitFromDb || [];
        for (const key of omitKeys) {
            delete (this as any)[key];
        }
    }

    $formatJson(rawJson: Pojo) {
        const json = super.$formatJson(rawJson);
        const props = (this.constructor as any).externalProps;
        let externalJson = null;
        if (props[0] === "*") {
            externalJson = json;
        } else {
            externalJson = _.pick(json, props);
        }
        return externalJson;
    }
}
