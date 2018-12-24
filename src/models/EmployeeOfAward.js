import { asyncFn } from './utils';
import CrudModel from './CrudModel';

class EmployeeOfAward extends CrudModel {
    get = ({ _id }) => asyncFn({
      url: `${this.url}/${_id}/award`, method: 'GET', model: this.model.get,
    })
    create = ({ formData: body }) => asyncFn({
      body, url: `${this.url}/award`, method: 'POST', model: this.model.create,
    })
    update = ({ _id, formData: body }) => asyncFn({
      body, url: `${this.url}/${_id}/award`, method: 'PUT', model: this.model.update,
    })
    delete = ({ _id }) => asyncFn({
      url: `${this.url}/${_id}/award`, method: 'DELETE', model: this.model.delete,
    })
    all = ({ body } = {}) => asyncFn({
      body, url: `${this.url}/award`, method: 'GET', model: this.model.all,
    })
}

export default EmployeeOfAward;
